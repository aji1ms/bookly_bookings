import mongoose, { Schema } from "mongoose";
import { IServiceType } from "../types/schemaTypes.js";

const serviceTypeSchema = new Schema<IServiceType>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model<IServiceType>("ServiceType", serviceTypeSchema);
