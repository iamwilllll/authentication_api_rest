import { body } from 'express-validator';
import { handleInputErrors } from '../handleInputErrors.middleware.js';

export const changePasswordMiddlewares = [
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
