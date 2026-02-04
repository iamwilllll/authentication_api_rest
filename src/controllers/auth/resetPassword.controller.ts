import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../errors/appError.error.js';
import { UserModel } from '../../models/user.model.js';
import { ApiResponse } from '../../helpers/response.js';
import { hashPassword } from '../../utils/hashPassword.js';

export async function resetPasswordController(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, code, newPassword, repeatNewPassword } = req.body;
        const user = await UserModel.findOne({ email }).select('+password');
        const ExpirationDate = new Date(user?.resetPasswordOTPCodeExpirationTime || 0);

        if (!user) throw new AppError('Invalid credentials.', 400, 'CREDENTIAL_ERROR');
        if (user.resetPasswordOTPCode !== code) throw new AppError('Invalid or incorrect code.', 400, 'CODE_ERROR');
        if (ExpirationDate < new Date()) throw new AppError('OTP code has expired.', 400, 'CODE_ERROR');
        if (newPassword !== repeatNewPassword) throw new AppError('Passwords do not match.', 400, 'PASSWORD_MISMATCH');

        user.password = await hashPassword(newPassword);
        user.resetPasswordOTPCode = '';

        await user.save();

        ApiResponse.success(res, 200, 'Password changed successfully.');
    } catch (err) {
        next(err);
    }
}
