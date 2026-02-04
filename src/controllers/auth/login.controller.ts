import { NextFunction, Request, Response } from 'express';
import { ApiResponse } from '../../helpers/response.js';
import { UserModel } from '../../models/user.model.js';
import { AppError } from '../../errors/appError.error.js';
import { comparePassword, getUserWithOutPass } from '../../utils/index.js';
import { SessionModel } from '../../models/session.model.js';
import { env } from '../../config/env.js';
import jwt from 'jsonwebtoken';

export async function loginController(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password, rememberMe } = req.body;
        const credentialError = new AppError('Credential error.', 400, 'CREDENTIAL_ERROR');

        const findUser = await UserModel.findOne({ email });
        if (!findUser) throw credentialError;

        const passMatch = await comparePassword(password, findUser.password);
        if (!passMatch) throw credentialError;

        if (!findUser.verified) throw new AppError('Authentication error.', 401, 'AUTH_ERROR');
        await SessionModel.updateMany({ userId: findUser._id, isValid: true }, { isValid: false });

        const duration = rememberMe ? env.TIMES.THREE_DAYS : env.TIMES.THREE_HOURS;
        const jwtDuration = rememberMe ? '3d' : '1h';

        const newSession = new SessionModel({
            userId: findUser._id,
            isValid: true,
            rememberMe,
            expiresAt: new Date(Date.now() + duration),
        });

        const currentSession = await newSession.save();

        const JWT = jwt.sign({ sessionId: currentSession._id.toString() }, env.JWT.KEY, { expiresIn: jwtDuration });

        res.cookie('sessionId', JWT, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: duration,
        });

        ApiResponse.success(res, 200, 'Login was successful', {
            user: getUserWithOutPass(findUser.toObject()),
            session: currentSession,
        });
    } catch (err) {
        next(err);
    }
}
