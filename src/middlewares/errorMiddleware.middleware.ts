import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../helpers/index.js';
import { AppError } from '../errors/appError.error.js';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof AppError && err.isOperational) {
        return ApiResponse.error(res, err.statusCode, err.message, err.code);
    }

    console.error('UNEXPECTED ERROR:', {
        message: err.message,
        stack: err.stack,
        path: req.originalUrl,
        method: req.method,
    });

    return ApiResponse.error(res, 500, 'Internal server error', 'INTERNAL_SERVER_ERROR');
}
