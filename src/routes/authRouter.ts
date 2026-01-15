import { Router } from 'express';
import { registerController } from '../controllers/index.js';

const authRouter: Router = Router();

authRouter.post('/register', registerController);

export default authRouter;
