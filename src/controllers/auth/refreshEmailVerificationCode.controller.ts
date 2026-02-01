import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../errors/appError.error.js';
import { UserModel } from '../../models/user.model.js';
import { createOtpCode } from '../../utils/createOtpCode.js';
import { env } from '../../config/env.js';
import { ApiResponse } from '../../helpers/response.js';
import { UserWithOutPassT } from '../../types/index.js';
import { getUserWithOutPass } from '../../utils/getUserWithOutPass.js';
import path from 'node:path';
import fs from 'node:fs';
import { sendEmailService } from '../../services/sendEmail.service.js';

export async function refreshEmailVerificationCodeController(req: Request, res: Response, next: NextFunction) {
    try {
        const email = req.body.email;
        const credentialError = new AppError('Credential error.', 400, 'CREDENTIAL_ERROR');
        const findUser = await UserModel.findOne({ email });
        if (!findUser) throw credentialError;

        if (findUser.verified) throw new AppError('User is already verified.', 409, 'USER_ALREADY_VERIFIED');

        const otpCode = createOtpCode();
        findUser.otpCode = otpCode;
        findUser.otpCodeExpiration = new Date(Date.now() + env.TIMES.TEN_MINUTES);

        const templatePath = path.join(process.cwd(), 'src', 'email_templates', 'VerifyAccount.html');
        const resetPasswordEmailTemplate = fs.readFileSync(templatePath, 'utf-8');
        const html = resetPasswordEmailTemplate.replace('*verificationCode*', otpCode);

        await sendEmailService({ to: email, subject: 'Email verification code', html });

        const savedUser = await findUser.save();
        const userWithOutPass = getUserWithOutPass(savedUser.toObject());
        ApiResponse.success<UserWithOutPassT>(res, 201, 'OTP Code was refresh successful', userWithOutPass);
    } catch (err) {
        next(err);
    }
}
