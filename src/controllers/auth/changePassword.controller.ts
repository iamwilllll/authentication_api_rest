import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../../errors/appError.error.js';
import { UserModel } from '../../models/user.model.js';
import { ApiResponse } from '../../helpers/response.js';
import { env } from '../../config/env.js';
import { hashPassword } from '../../utils/hashPassword.js';

type ResetTokenPayload = {
    sub: string;
    type: string;
};

export async function changePasswordController(req: Request, res: Response, next: NextFunction) {
    try {
        const { newPassword } = req.body;
        const resetToken = req.cookies?.resetToken;
        if (!resetToken) throw new AppError('Reset token not found.', 401, 'CODE_EXPIRED');
        let payload: ResetTokenPayload;

        try {
            payload = jwt.verify(resetToken, env.JWT.KEY) as ResetTokenPayload;
        } catch {
            throw new AppError('Invalid or expired reset token.', 401, 'CODE_EXPIRED');
        }

        const user = await UserModel.findById(payload.sub).select('+password');
        if (!user) throw new AppError('User not found.', 404, 'USER_NOT_FOUND');

        user.password = await hashPassword(newPassword);

        await user.save();

        res.clearCookie('resetToken', { httpOnly: true, secure: true, sameSite: 'strict' });
        ApiResponse.success(res, 200, 'Password changed successfully.');
    } catch (err) {
        next(err);
    }
}
