import mongoose from "mongoose";
import Staff from "../models/Staff.model.js";
import Business from "../models/Business.model.js";
import Service from "../models/Service.model.js";

// CREATE STAFF

export const createStaff = async (req, res) => {
    try {
        const { business, name, role, services, isAvailable } = req.body;

        if (!business || !name) {
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

        if (services && services.length > 0) {
            for (const serviceId of services) {
                if (!mongoose.Types.ObjectId.isValid(serviceId)) {
                    return res.status(400).json({
                        success: false,
                        message: "Invalid service ID in services list",
                    });
                }
            }

            const validServices = await Service.find({
                _id: { $in: services },
                business: business,
            });

            if (validServices.length !== services.length) {
                return res.status(400).json({
                    success: false,
                    message: "One or more services do not belong to this business",
                });
            }
        }

        const staff = await Staff.create({
            business,
            name,
            role,
            services,
            isAvailable,
        });

        return res.status(201).json({
            success: true,
            message: "Staff created successfully",
            data: staff,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// GET ALL STAFF

export const getAllStaff = async (req, res) => {
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

        const staffList = await Staff.find(filter)
            .populate("business", "name location")
            .populate("services", "name duration price")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Staff fetched successfully",
            data: staffList,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// GET STAFF BY ID

export const getStaffById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid staff ID",
            });
        }

        const staff = await Staff.findById(id)
            .populate("business", "name location")
            .populate("services", "name duration price");

        if (!staff) {
            return res.status(404).json({
                success: false,
                message: "Staff not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Staff fetched successfully",
            data: staff,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// Get Staff by service id

export const getStaffByService = async (req, res) => {
    try {
        const { serviceId } = req.params;
        const { business } = req.query;

        if (!mongoose.Types.ObjectId.isValid(serviceId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid service ID",
            });
        }

        const filter = {
            services: serviceId,
            isAvailable: true,
        };

        if (business) {
            if (!mongoose.Types.ObjectId.isValid(business)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid business ID",
                });
            }
            filter.business = business;
        }

        const staffList = await Staff.find(filter)
            .populate("business", "name location")
            .populate("services", "name duration price");

        return res.status(200).json({
            success: true,
            message: "Staff fetched by service successfully",
            data: staffList,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


// UPDATE STAFF

export const updateStaff = async (req, res) => {
    try {
        const { id } = req.params;
        const { services } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid staff ID",
            });
        }

        const staff = await Staff.findById(id);
        if (!staff) {
            return res.status(404).json({
                success: false,
                message: "Staff not found",
            });
        }

        if (services && services.length > 0) {
            for (const serviceId of services) {
                if (!mongoose.Types.ObjectId.isValid(serviceId)) {
                    return res.status(400).json({
                        success: false,
                        message: "Invalid service ID in services list",
                    });
                }

                const serviceExists = await Service.findById(serviceId);
                if (!serviceExists) {
                    return res.status(404).json({
                        success: false,
                        message: "Service not found in services list",
                    });
                }
            }
            staff.services = services;
        }

        staff.name = req.body.name ?? staff.name;
        staff.role = req.body.role ?? staff.role;
        staff.isAvailable = req.body.isAvailable ?? staff.isAvailable;

        await staff.save();

        return res.status(200).json({
            success: true,
            message: "Staff updated successfully",
            data: staff,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// DELETE STAFF

export const deleteStaff = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid staff ID",
            });
        }

        const staff = await Staff.findById(id);
        if (!staff) {
            return res.status(404).json({
                success: false,
                message: "Staff not found",
            });
        }

        await staff.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Staff deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
