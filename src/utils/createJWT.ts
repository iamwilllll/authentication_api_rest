import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export function createJWT(data: string, exp?: number ): string {
    const secret = env.JWT.KEY;
    return jwt.sign({ data }, secret, { expiresIn: exp });
}
