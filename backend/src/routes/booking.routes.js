import express from "express";
import { createBooking, getAvailableSlots } from "../controllers/booking.controller.js";

const router = express.Router();

router.post("/", createBooking);
router.get("/available-slots", getAvailableSlots);

export default router;
