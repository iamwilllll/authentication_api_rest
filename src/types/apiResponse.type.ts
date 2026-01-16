export interface ApiResponseT<T = unknown> {
    success: boolean;
    message: string;
    data?: T;
    error?: {
        code: string;
        details?: unknown;
    };
}
