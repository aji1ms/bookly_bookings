import mongoose from "mongoose";
import Booking from "../models/Booking.model.js";
import Service from "../models/Service.model.js";
import Business from "../models/Business.model.js";
import ServiceType from "../models/ServiceType.model.js";
import Staff from "../models/Staff.model.js";
import User from "../models/User.model.js";
import { generateSlots } from "../helper/generateSlotes.js";
import { generateBookingNumber } from "../helper/bookingNumberGenerator.js"; 


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

// GET AVAILABLE TIME SLOTS 

export const getAvailableSlots = async (req, res) => {
    try {
        const { businessId, staffId, date } = req.query;

        if (!businessId || !date) {
            return res.status(400).json({
                success: false,
                message: "Business ID and date are required",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(businessId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid business ID",
            });
        }

        if (staffId && !mongoose.Types.ObjectId.isValid(staffId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid staff ID",
            });
        }

        const startOfDay = new Date(`${date}T00:00:00.000Z`);
        const endOfDay = new Date(`${date}T23:59:59.999Z`);

        const todayUTC = new Date();
        todayUTC.setUTCHours(0, 0, 0, 0);

        if (startOfDay < todayUTC) {
            return res.status(400).json({
                success: false,
                message: "Cannot select past dates",
            });
        }

        const allSlots = generateSlots(9, 21, 45);

        //  CASE 1: Specific Staff Selected

        if (staffId) {
            const staff = await Staff.findById(staffId);

            if (!staff) {
                return res.status(404).json({
                    success: false,
                    message: "Staff not found",
                });
            }

            if (!staff.isAvailable) {
                return res.status(400).json({
                    success: false,
                    message: "Staff is currently unavailable",
                });
            }

            const bookings = await Booking.find({
                staff: staffId,
                date: { $gte: startOfDay, $lte: endOfDay },
                status: "confirmed",
            }).select("time");

            const bookedTimes = bookings.map((b) => b.time);

            let availableSlots = allSlots.filter(
                (slot) => !bookedTimes.includes(slot)
            );

            if (startOfDay.getTime() === todayUTC.getTime()) {
                const now = new Date();
                const currentTime = `${now
                    .getHours()
                    .toString()
                    .padStart(2, "0")}:${now
                        .getMinutes()
                        .toString()
                        .padStart(2, "0")}`;

                availableSlots = availableSlots.filter(
                    (slot) => slot > currentTime
                );
            }

            return res.status(200).json({
                success: true,
                message: "Available slots fetched successfully",
                data: {
                    date,
                    mode: "specific-staff",
                    staff: staff.name,
                    bookedSlots: bookedTimes,
                    availableSlots,
                },
            });
        }

        // CASE 2: No Staff Selected 

        const staffList = await Staff.find({
            business: businessId,
            isAvailable: true,
        }).select("_id");

        if (!staffList.length) {
            return res.status(200).json({
                success: true,
                message: "No staff available for this business",
                data: {
                    date,
                    mode: "any-staff",
                    availableSlots: [],
                },
            });
        }

        const staffIds = staffList.map((s) => s._id);

        const bookings = await Booking.find({
            staff: { $in: staffIds },
            date: { $gte: startOfDay, $lte: endOfDay },
            status: "confirmed",
        }).select("time staff");

        const bookingCountMap = {};

        bookings.forEach((booking) => {
            bookingCountMap[booking.time] =
                (bookingCountMap[booking.time] || 0) + 1;
        });

        const totalStaff = staffIds.length;

        let availableSlots = allSlots.filter((slot) => {
            const bookedCount = bookingCountMap[slot] || 0;
            return bookedCount < totalStaff;
        });

        if (startOfDay.getTime() === todayUTC.getTime()) {
            const now = new Date();
            const currentTime = `${now
                .getHours()
                .toString()
                .padStart(2, "0")}:${now
                    .getMinutes()
                    .toString()
                    .padStart(2, "0")}`;

            availableSlots = availableSlots.filter(
                (slot) => slot > currentTime
            );
        }

        return res.status(200).json({
            success: true,
            message: "Available slots fetched successfully",
            data: {
                date,
                mode: "any-staff",
                totalStaff,
                availableSlots,
            },
        });
    } catch (error) {
        console.error("Get Available Slots Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};