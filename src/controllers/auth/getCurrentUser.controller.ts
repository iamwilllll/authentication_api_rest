import { Request, Response } from 'express';
import { ApiResponse } from '../../helpers/response.js';

export async function getCurrentUserController(req: Request, res: Response) {
    return ApiResponse.success(res, 200, 'User was get successfully.', req.user);
}
