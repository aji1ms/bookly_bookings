import express from "express";
import {
    createServiceType,
    getAllServiceTypes,
    getServiceTypeById,
    updateServiceType,
    deleteServiceType,
} from "../controllers/serviceType.controller.js";

const router = express.Router();

router.post("/", createServiceType);
router.get("/", getAllServiceTypes);
router.get("/:id", getServiceTypeById);
router.put("/:id", updateServiceType);
router.delete("/:id", deleteServiceType);

export default router;