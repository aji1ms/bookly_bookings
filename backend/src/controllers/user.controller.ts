import { Request, Response } from "express";

import User from "../models/User.model.ts";

interface CreateUserBody {
    name: string;
    email: string;
    phone: string;
}

// CREATE USER 

export const createUser = async (
    req: Request<{}, {}, CreateUserBody>,
    res: Response
): Promise<void> => {
    try {
        const { name, email, phone } = req.body;

        if (!name || !email || !phone) {
            res.status(400).json({
                success: false,
                message: "Required fields are missing",
            });
            return
        }

        const user = await User.create({
            name,
            email,
            phone,
        });

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
