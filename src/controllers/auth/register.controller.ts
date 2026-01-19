import { NextFunction, Request, Response } from 'express';
import { UserModel } from '../../models/index.js';
import { ApiResponse, getUserWithOutPass, hashPassword } from '../../helpers/index.js';
import { type UserWithOutPassT } from '../../types/index.js';

export async function registerController(req: Request, res: Response, next: NextFunction) {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await hashPassword(password);
        const newUser = new UserModel({ name, email, password: hashedPassword });
        const savedUser = await newUser.save();
        const userWithOutPass = getUserWithOutPass(savedUser.toObject());

        ApiResponse.success<UserWithOutPassT>(res, 201, 'User was created successful', userWithOutPass);
    } catch (err) {
        next(err);
    }
}
