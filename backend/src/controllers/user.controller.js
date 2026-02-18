import User from "../models/User.model.js";

// CREATE USER 

export const createUser = async (req, res) => {
    try {
        const { name, email, phone } = req.body;

        if (!name || !email || !phone) {
            return res.status(400).json({
                success: false,
                message: "Required fields are missing",
            });
        }

        const user = await User.create({
            name,
            email,
            phone,
        });

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
