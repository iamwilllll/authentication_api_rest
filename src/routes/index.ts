import { Router } from 'express';
import authRouter from './authRouter.js';

const appRouter: Router = Router();

appRouter.use('/auth', authRouter);

export default appRouter;
