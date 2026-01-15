import mongoose, { Document, Schema } from 'mongoose';
import { ProductT } from '../types/index.js';

type ProductDocT = ProductT & Document;

const UserSchema = new Schema<ProductDocT>({
    imgUrl: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    tags: { type: [String], required: true, trim: true, lowercase: true },
    stack: { type: Number, required: true },
});

export const UserModel = mongoose.model('Products', UserSchema);
