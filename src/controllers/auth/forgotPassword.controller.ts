import { NextFunction, Request, Response } from 'express';
import { UserModel } from '../../models/index.js';
import { ApiResponse } from '../../helpers/index.js';
import { createOtpCode, getUserWithOutPass } from '../../utils/index.js';
import { type UserWithOutPassT } from '../../types/index.js';
import { sendEmailService } from '../../services/sendEmail.service.js';
import fs from 'node:fs';
import { AppError } from '../../errors/appError.error.js';

export async function forgotPasswordController(req: Request, res: Response, next: NextFunction) {
    try {
        const { email } = req.body;

        const user = await UserModel.findOne({ email });
        if (!user) throw new AppError("User doesn't exist", 404, 'USER_NOT_FOUND');

        const otpCode = createOtpCode();
        user.resetPasswordOTPCode = otpCode;
        user.resetPasswordOTPCodeExpirationTime = new Date(Date.now() + 10 * 60 * 1000);

        const resetPasswordEmailTemplate = fs.readFileSync('./../../email_templates/ResetYourPassword.html', 'utf-8');
        const html = resetPasswordEmailTemplate.replace('*resetCode*', otpCode);
        await sendEmailService({ to: email, subject: 'Email verification code', text: otpCode, html });

        const savedUser = await user.save();
        const UserWithOutPass = getUserWithOutPass(savedUser);
        ApiResponse.success<UserWithOutPassT>(res, 201, 'User was created successful', UserWithOutPass);
    } catch (err) {
        next(err);
    }
}
