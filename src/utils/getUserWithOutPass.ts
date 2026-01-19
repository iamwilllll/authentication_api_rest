import { UserT, UserWithOutPassT } from '../types/index.js';

export function getUserWithOutPass(user: UserT): UserWithOutPassT {
    const userWithOutPass = { ...user, password: undefined };
    return userWithOutPass;
}
