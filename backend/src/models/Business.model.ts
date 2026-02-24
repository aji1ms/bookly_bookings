import mongoose, { Schema } from "mongoose";
import { IBusiness } from "../types/schemaTypes.js"

const businessSchema = new Schema<IBusiness>(
    {
        serviceType: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ServiceType",
            required: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
        },

        image: {
            type: String,
        },

        location: {
            type: String,
            required: true,
        },

        rating: {
            type: Number,
            default: 0,
        },

        startingPrice: {
            type: Number,
            required: true,
        },

        serviceCount: {
            type: Number,
            default: 0,
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model < IBusiness > ("Business", businessSchema);
