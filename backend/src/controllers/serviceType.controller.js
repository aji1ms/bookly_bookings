import ServiceType from "../models/ServiceType.model.js";
import mongoose from "mongoose";

// Create new service type

export const createServiceType = async (req, res) => {
    try {
        const { name, slug, isActive } = req.body;

        if (!name || !slug) {
            return res.status(400).json({
                success: false,
                message: "Name and slug are required",
            }); 
        }

        const existing = await ServiceType.findOne({ slug });

        if (existing) {
            return res.status(409).json({
                success: false,
                message: "Service type with this slug already exists",
            });
        }

        const serviceType = await ServiceType.create({
            name,
            slug,
            isActive,
        });

        return res.status(201).json({
            success: true,
            message: "Service type created successfully",
            data: serviceType,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

//  Get all service types

export const getAllServiceTypes = async (req, res) => {
    try {
        const serviceTypes = await ServiceType.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Service types fetched successfully",
            data: serviceTypes,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

//   Get single service type by ID

export const getServiceTypeById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid service type ID",
            });
        }

        const serviceType = await ServiceType.findById(id);

        if (!serviceType) {
            return res.status(404).json({
                success: false,
                message: "Service type not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Service type fetched successfully",
            data: serviceType,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

//  Update service type

export const updateServiceType = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, slug, isActive } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid service type ID",
            });
        }

        const serviceType = await ServiceType.findById(id);

        if (!serviceType) {
            return res.status(404).json({
                success: false,
                message: "Service type not found",
            });
        }

        if (slug && slug !== serviceType.slug) {
            const slugExists = await ServiceType.findOne({ slug });
            if (slugExists) {
                return res.status(409).json({
                    success: false,
                    message: "Slug already in use",
                });
            }
        }

        serviceType.name = name ?? serviceType.name;
        serviceType.slug = slug ?? serviceType.slug;
        serviceType.isActive = isActive ?? serviceType.isActive;

        await serviceType.save();

        return res.status(200).json({
            success: true,
            message: "Service type updated successfully",
            data: serviceType,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

//   Delete service type

export const deleteServiceType = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid service type ID",
            });
        }

        const serviceType = await ServiceType.findById(id);

        if (!serviceType) {
            return res.status(404).json({
                success: false,
                message: "Service type not found",
            });
        }

        await serviceType.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Service type deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
