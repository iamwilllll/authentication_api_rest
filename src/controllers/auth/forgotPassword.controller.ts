import { NextFunction, Request, Response } from 'express';
import { UserModel } from '../../models/index.js';
import { ApiResponse } from '../../helpers/index.js';
import { createOtpCode, getUserWithOutPass } from '../../utils/index.js';
import { type UserWithOutPassT } from '../../types/index.js';
import { sendEmailService } from '../../services/sendEmail.service.js';
import fs from 'node:fs';
import { AppError } from '../../errors/appError.error.js';
import path from 'node:path';

export async function forgotPasswordController(req: Request, res: Response, next: NextFunction) {
    try {
        const { email } = req.body;

        const user = await UserModel.findOne({ email });
        if (!user) throw new AppError("User doesn't exist", 404, 'USER_NOT_FOUND');

        const otpCode = createOtpCode();
        user.resetPasswordOTPCode = otpCode;
        user.resetPasswordOTPCodeExpirationTime = new Date(Date.now() + 10 * 60 * 1000);

        const templatePath = path.join(process.cwd(), 'src', 'email_templates', 'ResetYourPassword.html');
        const resetPasswordEmailTemplate = fs.readFileSync(templatePath, 'utf-8');
        const html = resetPasswordEmailTemplate.replace('*resetCode*', otpCode);

        const savedUser = await user.save();
        const userWithOutPass = getUserWithOutPass(savedUser.toObject());

        await sendEmailService({ to: email, subject: 'Rest password code', html });
        ApiResponse.success<{ user: UserWithOutPassT; otpCode: string }>(res, 201, 'Code was send successful', {
            user: userWithOutPass,
            otpCode,
        });
    } catch (err) {
        next(err);
    }
}
