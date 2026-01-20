import { NextFunction, Request, Response } from 'express';
import { UserModel } from '../../models/index.js';
import { ApiResponse } from '../../helpers/index.js';
import { createOtpCode, getUserWithOutPass, hashPassword } from '../../utils/index.js';
import { type UserWithOutPassT } from '../../types/index.js';
import { env } from '../../config/env.js';

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

        const savedUser = await newUser.save();
        const userWithOutPass = getUserWithOutPass(savedUser.toObject());

        // ? send otp code from email
        /* 
            import { sendEmailService } from '../../services/sendEmail.service.js';
            sendEmailService()
        */

        ApiResponse.success<UserWithOutPassT>(res, 201, 'User was created successful', userWithOutPass);
    } catch (err) {
        next(err);
    }
}
