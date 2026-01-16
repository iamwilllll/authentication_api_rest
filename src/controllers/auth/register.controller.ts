import { NextFunction, Request, Response } from 'express';
import { UserModel } from '../../models/index.js';
import { ApiResponse } from '../../helpers/index.js';
import { UserT } from '../../types/index.js';

export async function registerController(req: Request, res: Response, next: NextFunction) {
    try {
        const { name, email, password } = req.body;
        const newUser = new UserModel({ name, email, password });
        const savedUser = await newUser.save();

        ApiResponse.success<UserT>(res, 201, 'User was created sucessfull', savedUser);
    } catch (err) {
        next(err);
    }
}
