import mongoose, { Schema } from "mongoose";
import { IStaff } from "../types/schemaTypes.js";

const staffSchema = new Schema<IStaff>(
  {
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "Professional",
    },

    services: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
      },
    ],

    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IStaff>("Staff", staffSchema);
