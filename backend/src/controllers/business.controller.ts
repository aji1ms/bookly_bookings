import mongoose from "mongoose";
import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";

import Business from "../models/Business.model.ts";
import ServiceType from "../models/ServiceType.model.ts";

import cloudinary from "../config/cloudinary.ts";
import upload from "../middleware/upload.ts";

interface BusinessBody {
    serviceType: string;
    name: string;
    description: string;
    location: string;
    rating?: number;
    startingPrice: number;
    serviceCount?: number;
    isActive?: boolean;
}

interface BusinessQuery {
    slug?: string;
    search?: string;
}

interface BusinessParams extends ParamsDictionary {
    id: string;
}

// Create new business

export const createBusiness = async (req: Request, res: Response): Promise<Response | void> => {

    upload.single("image")(req, res, async (err: unknown) => {
        if (err instanceof Error) {
            return res.status(400).json({
                success: false,
                message: err.message,
            });
        }

        try {
            const {
                serviceType,
                name,
                description,
                location,
                rating,
                startingPrice,
                serviceCount,
                isActive,
            } = req.body;

            if (!serviceType || !name || !description || !location || !startingPrice) {
                return res.status(400).json({
                    success: false,
                    message: "Required fields are missing",
                });
            }

            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: "Image is required",
                });
            }

            if (!mongoose.Types.ObjectId.isValid(serviceType)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid service type ID",
                });
            }

            const serviceTypeExists = await ServiceType.findById(serviceType);
            if (!serviceTypeExists) {
                return res.status(404).json({
                    success: false,
                    message: "Service type not found",
                });
            }

            const uploadResult = await cloudinary.uploader.upload(
                `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
                {
                    folder: "booking_business_images",
                }
            );

            const business = await Business.create({
                serviceType,
                name,
                description,
                location,
                rating,
                startingPrice,
                serviceCount,
                isActive,
                image: uploadResult.secure_url,
            });

            return res.status(201).json({
                success: true,
                message: "Business created successfully",
                data: business,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    });
};

// Get all businesses

export const getAllBusinesses = async (
    req: Request<{}, {}, {}, BusinessQuery>,
    res: Response
): Promise<Response | void> => {
    try {
        const { slug, search } = req.query;
        const filter: Record<string, unknown> = {};

        if (slug) {
            const serviceType = await ServiceType.findOne({ slug });

            if (!serviceType) {
                return res.status(404).json({
                    success: false,
                    message: "Service type not found for the given slug",
                });
            }

            filter.serviceType = serviceType._id;
        }

        if (search) {
            filter.name = { $regex: search, $options: "i" };
        }

        const businesses = await Business.find(filter)
            .populate("serviceType", "name slug")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Businesses fetched successfully",
            data: businesses,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// Get business by ID

export const getBusinessById = async (
    req: Request<BusinessParams>,
    res: Response
): Promise<Response | void> => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid business ID",
            });
        }

        const business = await Business.findById(id).populate(
            "serviceType",
            "name slug"
        );

        if (!business) {
            return res.status(404).json({
                success: false,
                message: "Business not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Business fetched successfully",
            data: business,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// Update business

export const updateBusiness = async (req: Request<BusinessParams>, res: Response): Promise<Response | void> => {

    upload.single("image")(req, res, async (err: unknown) => {
        if (err instanceof Error) {
            return res.status(400).json({ success: false, message: err.message });
        }


        try {
            const { id } = req.params;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid business ID",
                });
            }

            const business = await Business.findById(id);

            if (!business) {
                return res.status(404).json({
                    success: false,
                    message: "Business not found",
                });
            }

            if (req.file) {
                const uploadResult = await cloudinary.uploader.upload(
                    `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
                    {
                        folder: "booking_business_images",
                    }
                );

                business.image = uploadResult.secure_url;
            }

            const body = req.body as Partial<BusinessBody>;

            business.name = body.name ?? business.name;
            business.description = body.description ?? business.description;
            business.location = body.location ?? business.location;
            business.rating = body.rating ?? business.rating;
            business.startingPrice = body.startingPrice ?? business.startingPrice;
            business.serviceCount = body.serviceCount ?? business.serviceCount;
            business.isActive = body.isActive ?? business.isActive;

            await business.save();

            return res.status(200).json({
                success: true,
                message: "Business updated successfully",
                data: business,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    });
};

// Delete business

export const deleteBusiness = async (
    req: Request<BusinessParams>,
    res: Response
): Promise<Response | void> => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid business ID",
            });
        }

        const business = await Business.findById(id);

        if (!business) {
            return res.status(404).json({
                success: false,
                message: "Business not found",
            });
        }

        await business.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Business deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
