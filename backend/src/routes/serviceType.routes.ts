import express, { Router } from "express";
import {
    createServiceType,
    getAllServiceTypes,
    getServiceTypeById,
    updateServiceType,
    deleteServiceType,
} from "../controllers/serviceType.controller.ts";

const router: Router = express.Router();

router.post("/", createServiceType);
router.get("/", getAllServiceTypes);
router.get("/:id", getServiceTypeById);
router.put("/:id", updateServiceType);
router.delete("/:id", deleteServiceType);

export default router;