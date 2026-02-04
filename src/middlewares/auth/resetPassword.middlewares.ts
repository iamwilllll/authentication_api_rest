import { body } from 'express-validator';
import { handleInputErrors } from '../handleInputErrors.middleware.js';

export const resetPasswordMiddlewares = [
    body('email').trim().notEmpty().withMessage('Email is required.').isEmail().withMessage('Email is invalid.'),
    body('code')
        .trim()
        .notEmpty()
        .withMessage('OTP code is required')
        .custom((code) => (code.length <= 6 ? true : false))
        .withMessage('OTP code is invalid'),
    handleInputErrors,
    body('newPassword')
        .isString()
        .withMessage('Password must be a string')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long'),
    body('repeatNewPassword')
        .isString()
        .withMessage('New password must be a string')
        .notEmpty()
        .withMessage('New password is required')
        .isLength({ min: 8 })
        .withMessage('New password must be at least 8 characters long')
        .custom((repeatNewPassword, { req }) => (repeatNewPassword !== req.body.newPassword ? false : true))
        .withMessage('Passwords not match'),
    handleInputErrors,
];
