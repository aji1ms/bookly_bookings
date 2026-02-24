import express, { Router } from "express";
import {
    createStaff,
    getAllStaff,
    getStaffById,
    getStaffByService,
    updateStaff,
    deleteStaff,
} from "../controllers/staff.controller.ts";

const router: Router = express.Router();

router.post("/", createStaff);
router.get("/", getAllStaff);
router.get("/:id", getStaffById);
router.get("/by-service/:serviceId", getStaffByService);
router.put("/:id", updateStaff);
router.delete("/:id", deleteStaff);

export default router;
