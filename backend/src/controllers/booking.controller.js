import mongoose from "mongoose";
import Booking from "../models/Booking.model.js";
import Service from "../models/Service.model.js";
import Business from "../models/Business.model.js";
import ServiceType from "../models/ServiceType.model.js";
import Staff from "../models/Staff.model.js";
import User from "../models/User.model.js";
import { generateBookingNumber } from "../helper/BookingNumberGenerator.js";

// CREATE BOOKING

export const createBooking = async (req, res) => {
    try {
        const {
            serviceType,
            business,
            service,
            staff,
            user,
            date,
            time,
            totalAmount,
            notes,
        } = req.body;

        if (!serviceType || !business || !service || !user || !date || !time || !totalAmount) {
            return res.status(400).json({
                success: false,
                message: "Required fields are missing",
            });
        }

        const idsToValidate = [serviceType, business, service, user];
        if (staff) idsToValidate.push(staff);

        for (const id of idsToValidate) {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid ID provided",
                });
            }
        }

        const bookingDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (bookingDate < today) {
            return res.status(400).json({
                success: false,
                message: "Cannot book past dates",
            });
        }

        const [serviceTypeExists, businessExists, serviceExists, userExists] =
            await Promise.all([
                ServiceType.findById(serviceType),
                Business.findById(business),
                Service.findById(service),
                User.findById(user),
            ]);

        if (!serviceTypeExists || !businessExists || !serviceExists || !userExists) {
            return res.status(404).json({
                success: false,
                message: "Referenced data not found",
            });
        }

        if (staff) {
            const staffExists = await Staff.findById(staff);
            if (!staffExists) {
                return res.status(404).json({
                    success: false,
                    message: "Staff not found",
                });
            }
        }

        const existingBooking = await Booking.findOne({
            business,
            date: bookingDate,
            time,
            staff: staff || null,
            status: "confirmed",
        });

        if (existingBooking) {
            return res.status(409).json({
                success: false,
                message: "This time slot is already booked",
            });
        }

        const booking = await Booking.create({
            bookingNumber: generateBookingNumber(),
            serviceType,
            business,
            service,
            staff: staff || null,
            user,
            date: bookingDate,
            time,
            totalAmount,
            notes,
        });

        const populatedBooking = await Booking.findById(booking._id)
            .populate("serviceType", "name slug")
            .populate("business", "name location image")
            .populate("service", "name duration price")
            .populate("staff", "name role")
            .populate("user", "name email phone");

        return res.status(201).json({
            success: true,
            message: "Booking confirmed",
            data: populatedBooking,
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Time slot already booked",
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
