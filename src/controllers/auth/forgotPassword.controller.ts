import { NextFunction, Request, Response } from 'express';
import { UserModel } from '../../models/index.js';
import { ApiResponse } from '../../helpers/index.js';
import { createOtpCode } from '../../utils/index.js';
import { sendEmailService } from '../../services/sendEmail.service.js';
import fs from 'node:fs';
import path from 'node:path';

export async function forgotPasswordController(req: Request, res: Response, next: NextFunction) {
    try {
        const { email } = req.body;

        const existingUser = await UserModel.findOne({ email });
        if (!existingUser) return ApiResponse.success(res, 200, 'If the account exists, a code code has been sent.');

        const otpCode = createOtpCode();
        existingUser.resetPasswordOTPCode = otpCode;
        existingUser.resetPasswordOTPCodeExpirationTime = new Date(Date.now() + 10 * 60 * 1000);

        const templatePath = path.join(process.cwd(), 'src', 'email_templates', 'ResetYourPassword.html');
        const resetPasswordEmailTemplate = fs.readFileSync(templatePath, 'utf-8');
        const html = resetPasswordEmailTemplate.replace('*resetCode*', otpCode);

        await Promise.all([existingUser.save(), sendEmailService({ to: email, subject: 'Rest password code', html })]);
        
        //! DEV ONLY:
        //! The OTP is exposed in the response to simulate email delivery
        //! during development. In production, OTPs must be sent via a secure
        //! email provider and never returned in API responses.
        ApiResponse.success(res, 200, 'If the account exists, a code code has been sent.', { otpCode });
    } catch (err) {
        next(err);
    }
}
