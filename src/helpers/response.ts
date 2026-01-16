import { Response } from 'express';
import { ApiResponseT } from '../types/apiResponse.type.js';

export class ApiResponse {
    static success<T>(res: Response, statusCode: number, message: string, data?: T) {
        const response: ApiResponseT<T> = {
            success: true,
            message,
            data: data,
        };

        return res.status(statusCode).json(response);
    }

    static error(res: Response, statusCode: number, message: string, code: string, details?: unknown) {
        const response: ApiResponseT = {
            success: false,
            message,
            error: {
                code,
                details,
            },
        };

        return res.status(statusCode).json(response);
    }
}
