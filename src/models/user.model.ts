import mongoose, { Document, Schema } from 'mongoose';
import { UserT } from '../types/index.js';

type UserDocT = UserT & Document;

const UserSchema = new Schema<UserDocT>(
    {
        avatarUrl: { type: String, required: false, trim: true },
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true, lowercase: true, unique: true },
        password: { type: String, required: true, trim: true },
        role: { type: String, required: true, trim: true, default: 'user' },
        otpCode: { type: String, required: false, trim: true },
        otpCodeExpiration: { type: Date, required: false },
        verified: { type: Boolean, required: true, default: false },
        resetPasswordOTPCode: { type: String, required: false, trim: true },
        resetPasswordOTPCodeExpirationTime: { type: Date, required: false },
    },
    { timestamps: true, versionKey: false }
);

export const UserModel = mongoose.model('User', UserSchema);
