import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    bookingNumber: {
      type: String,
      unique: true,
      required: true,
    },

    serviceType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceType",
      required: true,
    },

    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },

    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },

    staff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      default: null,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: Date, 
      required: true,
    },

    time: {
      type: String, 
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["confirmed", "cancelled"],
      default: "confirmed",
    },

    notes: {
      type: String,
      maxlength: 500,
    },
  },
  { timestamps: true }
);

bookingSchema.index(
  { business: 1, date: 1, time: 1, staff: 1 },
  { unique: true }
);

export default mongoose.model("Booking", bookingSchema);
