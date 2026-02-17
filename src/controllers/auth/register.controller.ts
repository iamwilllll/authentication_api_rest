import { NextFunction, Request, Response } from 'express';
import { UserModel } from '../../models/index.js';
import { ApiResponse } from '../../helpers/index.js';
import { createOtpCode, hashPassword } from '../../utils/index.js';
import { env } from '../../config/env.js';
import { sendEmailService } from '../../services/sendEmail.service.js';
import fs from 'node:fs';
import path from 'node:path';

export async function registerController(req: Request, res: Response, next: NextFunction) {
    try {
        const { name, email, password, repeatPassword } = req.body;
        if (password !== repeatPassword) return ApiResponse.error(res, 400, 'Passwords not match', 'CREDENTIAL_ERROR');
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) return ApiResponse.error(res, 400, 'User with this email already exists.', 'CREDENTIAL_ERROR');

        const otpCode = createOtpCode();
        const newUser = new UserModel({
            name,
            email,
            password: await hashPassword(password),
            otpCode,
            otpCodeExpiration: new Date(Date.now() + env.TIMES.TEN_MINUTES),
        });

        const templatePath = path.join(process.cwd(), 'src', 'email_templates', 'VerifyAccount.html');
        const resetPasswordEmailTemplate = fs.readFileSync(templatePath, 'utf-8');
        const html = resetPasswordEmailTemplate.replace('*verificationCode*', otpCode);

        await Promise.all([newUser.save(), sendEmailService({ to: email, subject: 'Email verification code', html })]);

        //! DEV ONLY:
        //! The OTP is exposed in the response to simulate email delivery
        //! during development. In production, OTPs must be sent via a secure
        //! email provider and never returned in API responses.
        return ApiResponse.success(res, 201, 'User was created successful.', { otpCode });
    } catch (err) {
        next(err);
    }
}
