import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../../models/user.model.js';
import { createOtpCode } from '../../utils/createOtpCode.js';
import { env } from '../../config/env.js';
import { ApiResponse } from '../../helpers/response.js';
import path from 'node:path';
import fs from 'node:fs';
import { sendEmailService } from '../../services/sendEmail.service.js';

export async function refreshEmailVerificationCodeController(req: Request, res: Response, next: NextFunction) {
    try {
        const { email } = req.body;
        const existingUser = await UserModel.findOne({ email });

        if (!existingUser || existingUser.verified) {
            return ApiResponse.success(res, 200, 'If the account exists, a new verification code has been sent.');
        }

        const otpCode = createOtpCode();
        existingUser.otpCode = otpCode;
        existingUser.otpCodeExpiration = new Date(Date.now() + env.TIMES.TEN_MINUTES);

        const templatePath = path.join(process.cwd(), 'src', 'email_templates', 'VerifyAccount.html');
        const resetPasswordEmailTemplate = fs.readFileSync(templatePath, 'utf-8');
        const html = resetPasswordEmailTemplate.replace('*verificationCode*', otpCode);

        await Promise.all([existingUser.save(), sendEmailService({ to: email, subject: 'Email verification code', html })]);

        //! DEV ONLY:
        //! The OTP is exposed in the response to simulate email delivery
        //! during development. In production, OTPs must be sent via a secure
        //! email provider and never returned in API responses.
        return ApiResponse.success(res, 200, 'If the account exists, a new verification code has been sent.', { otpCode });
    } catch (err) {
        next(err);
    }
}
