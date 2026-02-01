import { body } from 'express-validator';
import { handleInputErrors } from '../handleInputErrors.middleware.js';

export const forgotPasswordMiddlewares = [
    body('email').trim().notEmpty().withMessage('Email is required.').isEmail().withMessage('Email is invalid.'),
    handleInputErrors
];
