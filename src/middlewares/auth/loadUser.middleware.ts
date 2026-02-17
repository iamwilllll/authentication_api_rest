import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../errors/appError.error.js';
import { UserModel } from '../../models/user.model.js';

export async function loadUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId } = req;
        if (!userId) throw new AppError('Unauthenticated', 401, 'AUTH_ERROR');

        const user = await UserModel.findById(userId);

        if (!user) throw new AppError('User not found', 404, 'USER_NOT_FOUND');
        req.user = user;

        return next();
    } catch (err) {
        return next(err);
    }
}
