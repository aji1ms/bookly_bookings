import express, { Router } from "express";
import { createBooking, getAvailableSlots } from "../controllers/booking.controller.ts";

const router: Router = express.Router();

router.post("/", createBooking);
router.get("/available-slots", getAvailableSlots);

export default router;
