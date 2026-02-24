import { Request, Response } from "express";
import mongoose from "mongoose";
import ServiceType from "../models/ServiceType.model.ts";

interface ServiceTypeBody {
    name: string;
    slug: string;
    isActive?: boolean;
}

interface ServiceTypeParams {
    id: string;
}

// Create new service type

export const createServiceType = async (
    req: Request<{}, {}, ServiceTypeBody>,
    res: Response
): Promise<void> => {
    try {
        const { name, slug, isActive } = req.body;

        if (!name || !slug) {
            res.status(400).json({
                success: false,
                message: "Name and slug are required",
            });
            return;
        }

        const existing = await ServiceType.findOne({ slug });

        if (existing) {
            res.status(409).json({
                success: false,
                message: "Service type with this slug already exists",
            });
            return;
        }

        const serviceType = await ServiceType.create({
            name,
            slug,
            isActive,
        });

        res.status(201).json({
            success: true,
            message: "Service type created successfully",
            data: serviceType,
        });
    } catch (error: unknown) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// Get all service types

export const getAllServiceTypes = async (req: Request, res: Response): Promise<void> => {
    try {
        const serviceTypes = await ServiceType.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: "Service types fetched successfully",
            data: serviceTypes,
        });
    } catch (error: unknown) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// Get single service type by ID

export const getServiceTypeById = async (
    req: Request<ServiceTypeParams>,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                success: false,
                message: "Invalid service type ID",
            });
            return;
        }

        const serviceType = await ServiceType.findById(id);

        if (!serviceType) {
            res.status(404).json({
                success: false,
                message: "Service type not found",
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "Service type fetched successfully",
            data: serviceType,
        });
    } catch (error: unknown) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// Update service type

export const updateServiceType = async (
    req: Request<ServiceTypeParams, {}, Partial<ServiceTypeBody>>,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const { name, slug, isActive } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                success: false,
                message: "Invalid service type ID",
            });
            return;
        }

        const serviceType = await ServiceType.findById(id);

        if (!serviceType) {
            res.status(404).json({
                success: false,
                message: "Service type not found",
            });
            return;
        }

        if (slug && slug !== serviceType.slug) {
            const slugExists = await ServiceType.findOne({ slug });
            if (slugExists) {
                res.status(409).json({
                    success: false,
                    message: "Slug already in use",
                });
                return;
            }
        }

        serviceType.name = name ?? serviceType.name;
        serviceType.slug = slug ?? serviceType.slug;
        serviceType.isActive = isActive ?? serviceType.isActive;

        await serviceType.save();

        res.status(200).json({
            success: true,
            message: "Service type updated successfully",
            data: serviceType,
        });
    } catch (error: unknown) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// Delete service type

export const deleteServiceType = async (
    req: Request<ServiceTypeParams>,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                success: false,
                message: "Invalid service type ID",
            });
            return;
        }

        const serviceType = await ServiceType.findById(id);

        if (!serviceType) {
            res.status(404).json({
                success: false,
                message: "Service type not found",
            });
            return;
        }

        await serviceType.deleteOne();

        res.status(200).json({
            success: true,
            message: "Service type deleted successfully",
        });
    } catch (error: unknown) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
