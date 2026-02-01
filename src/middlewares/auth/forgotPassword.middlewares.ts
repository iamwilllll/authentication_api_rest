import { body } from 'express-validator';

export const forgotPasswordMiddlewares = [
    body('email').trim().notEmpty().withMessage('Email is required.').isEmail().withMessage('Email is invalid.'),
];
