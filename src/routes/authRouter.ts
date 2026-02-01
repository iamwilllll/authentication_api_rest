import { Router } from 'express';
import { errorMiddleware } from '../middlewares/errorMiddleware.middleware.js';

import {
    registerController,
    loginController,
    refreshEmailVerificationCodeController,
    emailConfirmController,
    getCurrentUserController,
    forgotPasswordController,
    resetPasswordController,
    changePasswordController,
} from '../controllers/index.js';

import {
    registerMiddlewares,
    loginMiddlewares,
    refreshEmailVerificationCodeMiddlewares,
    emailConfirmMiddlewares,
    authenticate,
    loadUser,
    forgotPasswordMiddlewares,
    changePasswordMiddlewares,
} from '../middlewares/index.js';
import { logoutController } from '../controllers/auth/logout.controller.js';

const authRouter: Router = Router();

authRouter.post('/register', registerMiddlewares, registerController, errorMiddleware);
authRouter.put(
    '/email/refresh',
    refreshEmailVerificationCodeMiddlewares,
    refreshEmailVerificationCodeController,
    errorMiddleware
);
authRouter.put('/email/confirm', emailConfirmMiddlewares, emailConfirmController, errorMiddleware);
authRouter.post('/login', loginMiddlewares, loginController, errorMiddleware);
authRouter.post('/logout', authenticate, logoutController, errorMiddleware);
authRouter.get('/me', authenticate, loadUser, getCurrentUserController, errorMiddleware);
authRouter.post('/password/forgot', forgotPasswordMiddlewares, forgotPasswordController, errorMiddleware);
authRouter.post('/password/reset', emailConfirmMiddlewares, resetPasswordController, errorMiddleware);
authRouter.put('/password/change', changePasswordMiddlewares, changePasswordController, errorMiddleware);

export default authRouter;
