import { body } from 'express-validator';

//* preset middlewares
export const registerMiddlewares = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').trim().notEmpty().withMessage('Email is required').toLowerCase().isEmail().withMessage('Invalid email'),
    body('password').trim().notEmpty().withMessage('Password is required'),
    body('repeatPassword')
        .trim()
        .notEmpty()
        .withMessage('Repeat password is required')
        .custom((repeatPassword, { req }) => (repeatPassword !== req.body.password ? false : true))
        .withMessage('Passwords not match'),
];
