import mongoose from "mongoose";
import Service from "../models/Service.model.js";
import Business from "../models/Business.model.js";

// CREATE SERVICE

export const createService = async (req, res) => {
    try {
        const { business, name, description, duration, price, isActive } = req.body;

        if (!business || !name || !duration || !price) {
            return res.status(400).json({
                success: false,
                message: "Required fields are missing",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(business)) {
            return res.status(400).json({
                success: false,
                message: "Invalid business ID",
            });
        }

        const businessExists = await Business.findById(business);
        if (!businessExists) {
            return res.status(404).json({
                success: false,
                message: "Business not found",
            });
        }

        const service = await Service.create({
            business,
            name,
            description,
            duration,
            price,
            isActive,
        });

        return res.status(201).json({
            success: true,
            message: "Service created successfully",
            data: service,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// GET ALL SERVICES 

export const getAllServices = async (req, res) => {
    try {
        const { business } = req.query;

        const filter = {};
        if (business) {
            if (!mongoose.Types.ObjectId.isValid(business)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid business ID",
                });
            }
            filter.business = business;
        }

        const services = await Service.find(filter)
            .populate("business", "name location")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Services fetched successfully",
            data: services,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// GET SERVICE BY ID

export const getServiceById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid service ID",
            });
        }

        const service = await Service.findById(id).populate(
            "business",
            "name location"
        );

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Service fetched successfully",
            data: service,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// UPDATE SERVICE

export const updateService = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid service ID",
            });
        }

        const service = await Service.findById(id);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found",
            });
        }

        service.name = req.body.name ?? service.name;
        service.description = req.body.description ?? service.description;
        service.duration = req.body.duration ?? service.duration;
        service.price = req.body.price ?? service.price;
        service.isActive = req.body.isActive ?? service.isActive;

        await service.save();

        return res.status(200).json({
            success: true,
            message: "Service updated successfully",
            data: service,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// DELETE SERVICE

export const deleteService = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid service ID",
            });
        }

        const service = await Service.findById(id);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found",
            });
        }

        await service.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Service deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
