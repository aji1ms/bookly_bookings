import express from "express";
import {
    createBusiness,
    getAllBusinesses,
    getBusinessById,
    updateBusiness,
    deleteBusiness,
} from "../controllers/business.controller.js";

const router = express.Router();

router.post("/", createBusiness);
router.get("/", getAllBusinesses);
router.get("/:id", getBusinessById);
router.put("/:id", updateBusiness);
router.delete("/:id", deleteBusiness);

export default router;
