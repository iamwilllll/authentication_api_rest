export class AppError extends Error {
    statusCode: number;
    code: string;
    isOperational: boolean;
    details?: unknown;

    constructor(message: string, statusCode: number, code: string, details?: unknown) {
        super(message);

        this.statusCode = statusCode;
        this.code = code;
        this.isOperational = true;
        this.details = details;

        Error.captureStackTrace(this, this.constructor);
    }
}
