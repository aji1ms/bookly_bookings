import express from "express";
import {
    createStaff,
    getAllStaff,
    getStaffById,
    getStaffByService,
    updateStaff,
    deleteStaff,
} from "../controllers/staff.controller.js";

const router = express.Router();

router.post("/", createStaff);
router.get("/", getAllStaff);
router.get("/:id", getStaffById);
router.get("/by-service/:serviceId", getStaffByService);
router.put("/:id", updateStaff);
router.delete("/:id", deleteStaff);

export default router;
