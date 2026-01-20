import crypto from 'node:crypto';

export function createOtpCode(): string {
    return crypto.randomInt(100000, 1000000).toString();
}
