import { NextFunction, Request, Response } from 'express';
import { UserModel } from '../../models/index.js';
import { ApiResponse } from '../../helpers/index.js';
import { createOtpCode, getUserWithOutPass, hashPassword } from '../../utils/index.js';
import { type UserWithOutPassT } from '../../types/index.js';
import { env } from '../../config/env.js';
import { sendEmailService } from '../../services/sendEmail.service.js';
import fs from 'node:fs';
import path from 'node:path';

export async function registerController(req: Request, res: Response, next: NextFunction) {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await hashPassword(password);
        const otpCode = createOtpCode();
        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
            otpCode,
            otpCodeExpiration: new Date(Date.now() + env.TIMES.TEN_MINUTES),
        });

        const templatePath = path.join(process.cwd(), 'src', 'email_templates', 'VerifyAccount.html');
        const resetPasswordEmailTemplate = fs.readFileSync(templatePath, 'utf-8');
        const html = resetPasswordEmailTemplate.replace('*resetCode*', otpCode);

        await sendEmailService({ to: email, subject: 'Email verification code', html });
        const savedUser = await newUser.save();
        const userWithOutPass = getUserWithOutPass(savedUser.toObject());

        ApiResponse.success<UserWithOutPassT>(res, 201, 'User was created successful', userWithOutPass);
    } catch (err) {
        next(err);
    }
}
