import mongoose, { Document, Schema } from 'mongoose';
import { UserT } from '../types/index.js';

type UserDocT = UserT & Document;

const UserSchema = new Schema<UserDocT>({
    avatarUrl: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    password: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
});

export const UserModel = mongoose.model('Users', UserSchema);
