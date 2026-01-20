import { NextFunction, Request, Response } from 'express';
import { ApiResponse } from '../../helpers/response.js';
import { UserModel } from '../../models/user.model.js';
import { AppError } from '../../errors/appError.error.js';
import { comparePassword, createJWT, getUserWithOutPass } from '../../utils/index.js';
import { SessionModel } from '../../models/session.model.js';

export async function loginController(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password, rememberMe } = req.body;
        const credentialError = new AppError('Credential error.', 400, 'CREDENTIAL_ERROR');

        const findUser = await UserModel.findOne({ email });
        if (!findUser) throw credentialError;

        const passMatch = await comparePassword(password, findUser.password);
        if (!passMatch) throw credentialError;

        const THREE_HOURS = 1000 * 60;
        const THREE_DAYS = 1000 * 60 * 60 * 24 * 3;
        let duration = THREE_HOURS;
        if (rememberMe) duration = THREE_DAYS;

        const newSession = new SessionModel({
            userId: findUser._id,
            isValid: true,
            rememberMe,
            expiresAt: new Date(Date.now() + duration),
        });

        const currentSession = await newSession.save();
        console.log(currentSession._id)
        const JWT = createJWT(currentSession._id.toString(), duration);

        res.cookie('sessionId', JWT, {
            httpOnly: true,
            secure: true,
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
