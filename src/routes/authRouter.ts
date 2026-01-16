import { Router } from 'express';
import { registerController } from '../controllers/index.js';
import { handleInputErrors, registerMiddlewares } from '../middlewares/index.js';
import { errorMiddleware } from '../middlewares/errorMiddleware.middleware.js';

const authRouter: Router = Router();

authRouter.post('/register', registerMiddlewares, handleInputErrors, registerController  , errorMiddleware);

export default authRouter;
