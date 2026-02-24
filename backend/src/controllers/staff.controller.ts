import mongoose from "mongoose";
import { Request, Response } from "express";

import Staff from "../models/Staff.model.ts";
import Business from "../models/Business.model.ts";
import Service from "../models/Service.model.ts";

interface CreateStaffBody {
    business: string;
    name: string;
    role?: string;
    services?: string[];
    isAvailable?: boolean;
}

interface UpdateStaffBody {
    name?: string;
    role?: string;
    services?: string[];
    isAvailable?: boolean;
}

interface StaffParams {
    id: string;
}

interface ServiceParams {
    serviceId: string;
}

interface StaffQuery {
    business?: string;
}

// CREATE STAFF

export const createStaff = async (
    req: Request<{}, {}, CreateStaffBody>,
    res: Response
): Promise<void> => {
    try {
        const { business, name, role, services, isAvailable } = req.body;

        if (!business || !name) {
            res.status(400).json({
                success: false,
                message: "Required fields are missing",
            });
            return;
        }

        if (!mongoose.Types.ObjectId.isValid(business)) {
            res.status(400).json({
                success: false,
                message: "Invalid business ID",
            });
            return;
        }

        const businessExists = await Business.findById(business);
        if (!businessExists) {
            res.status(404).json({
                success: false,
                message: "Business not found",
            });
            return;
        }

        if (services && services.length > 0) {
            for (const serviceId of services) {
                if (!mongoose.Types.ObjectId.isValid(serviceId)) {
                    res.status(400).json({
                        success: false,
                        message: "Invalid service ID in services list",
                    });
                    return;
                }
            }

            const validServices = await Service.find({
                _id: { $in: services },
                business: business,
            });

            if (validServices.length !== services.length) {
                res.status(400).json({
                    success: false,
                    message: "One or more services do not belong to this business",
                });
                return;
            }
        }

        const staff = await Staff.create({
            business,
            name,
            role,
            services,
            isAvailable,
        });

        res.status(201).json({
            success: true,
            message: "Staff created successfully",
            data: staff,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// GET ALL STAFF

export const getAllStaff = async (
    req: Request<{}, {}, {}, StaffQuery>,
    res: Response
): Promise<void> => {
    try {
        const { business } = req.query;

        const filter: { business?: string } = {};

        if (business) {
            if (!mongoose.Types.ObjectId.isValid(business)) {
                res.status(400).json({
                    success: false,
                    message: "Invalid business ID",
                });
                return;
            }
            filter.business = business;
        }

        const staffList = await Staff.find(filter)
            .populate("business", "name location")
            .populate("services", "name duration price")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: "Staff fetched successfully",
            data: staffList,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// GET STAFF BY ID

export const getStaffById = async (
    req: Request<StaffParams>,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                success: false,
                message: "Invalid staff ID",
            });
            return;
        }

        const staff = await Staff.findById(id)
            .populate("business", "name location")
            .populate("services", "name duration price");

        if (!staff) {
            res.status(404).json({
                success: false,
                message: "Staff not found",
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "Staff fetched successfully",
            data: staff,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// Get Staff by service id

export const getStaffByService = async (
    req: Request<ServiceParams, {}, {}, StaffQuery>,
    res: Response
): Promise<void> => {
    try {
        const { serviceId } = req.params;
        const { business } = req.query;

        if (!mongoose.Types.ObjectId.isValid(serviceId)) {
            res.status(400).json({
                success: false,
                message: "Invalid service ID",
            });
            return;
        }

        const filter: { services: string; isAvailable: boolean; business?: string } = {
            services: serviceId,
            isAvailable: true,
        };

        if (business) {
            if (!mongoose.Types.ObjectId.isValid(business)) {
                res.status(400).json({
                    success: false,
                    message: "Invalid business ID",
                });
                return;
            }
            filter.business = business;
        }

        const staffList = await Staff.find(filter)
            .populate("business", "name location")
            .populate("services", "name duration price");

        res.status(200).json({
            success: true,
            message: "Staff fetched by service successfully",
            data: staffList,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


// UPDATE STAFF

export const updateStaff = async (
    req: Request<StaffParams, {}, UpdateStaffBody>,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const { services } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                success: false,
                message: "Invalid staff ID",
            });
            return;
        }

        const staff = await Staff.findById(id);
        if (!staff) {
            res.status(404).json({
                success: false,
                message: "Staff not found",
            });
            return;
        }

        if (services && services.length > 0) {
            for (const serviceId of services) {
                if (!mongoose.Types.ObjectId.isValid(serviceId)) {
                    res.status(400).json({
                        success: false,
                        message: "Invalid service ID in services list",
                    });
                    return;
                }

                const serviceExists = await Service.findById(serviceId);
                if (!serviceExists) {
                    res.status(404).json({
                        success: false,
                        message: "Service not found in services list",
                    });
                    return;
                }
            }
            staff.services = services.map(
                (id) => new mongoose.Types.ObjectId(id)
            ) as mongoose.Types.ObjectId[];
        }

        staff.name = req.body.name ?? staff.name;
        staff.role = req.body.role ?? staff.role;
        staff.isAvailable = req.body.isAvailable ?? staff.isAvailable;

        await staff.save();

        res.status(200).json({
            success: true,
            message: "Staff updated successfully",
            data: staff,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// DELETE STAFF

export const deleteStaff = async (
    req: Request<StaffParams>,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                success: false,
                message: "Invalid staff ID",
            });
            return;
        }

        const staff = await Staff.findById(id);
        if (!staff) {
            res.status(404).json({
                success: false,
                message: "Staff not found",
            });
            return;
        }

        await staff.deleteOne();

        res.status(200).json({
            success: true,
            message: "Staff deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
