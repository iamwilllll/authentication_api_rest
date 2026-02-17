import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../errors/appError.error.js';
import { UserModel } from '../../models/user.model.js';
import { ApiResponse } from '../../helpers/response.js';
import { hashPassword } from '../../utils/hashPassword.js';

export async function resetPasswordController(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, otpCode, newPassword, repeatNewPassword } = req.body;

        const user = await UserModel.findOne({ email, resetPasswordOTPCode: otpCode });
        if (!user) return ApiResponse.error(res, 400, 'Invalid OTP code', 'CODE_INVALID');

        const ExpirationDate = new Date(user.resetPasswordOTPCodeExpirationTime || 0);
        if (ExpirationDate < new Date()) throw new AppError('OTP code has expired.', 400, 'CODE_ERROR');
        if (newPassword !== repeatNewPassword) throw new AppError('Passwords do not match.', 400, 'PASSWORD_MISMATCH');

        await UserModel.findByIdAndUpdate(user._id, {
            password: await hashPassword(newPassword),
            $unset: {
                resetPasswordOTPCode: '',
                resetPasswordOTPCodeExpirationTime: '',
            },
        });

        ApiResponse.success(res, 200, 'Password changed successfully.');
    } catch (err) {
        next(err);
    }
}
