import { body } from 'express-validator';
import { handleInputErrors } from '../handleInputErrors.middleware.js';

export const forgotPasswordMiddlewares = [
    body('email').trim().notEmpty().withMessage('E-mail is required.').toLowerCase().isEmail().withMessage('E-mail is not valid.'),
    handleInputErrors,
];
