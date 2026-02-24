import { Document, Types } from "mongoose";

// Service Type Interface

export interface IServiceType extends Document {
    name: string;
    slug: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// Business Interface

export interface IBusiness extends Document {
    serviceType: Types.ObjectId | IServiceType;
    name: string;
    description: string;
    image?: string;
    location: string;
    rating: number;
    startingPrice: number;
    serviceCount: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// Service Interface

export interface IService extends Document {
    business: Types.ObjectId | IBusiness;
    name: string;
    description?: string;
    duration: number;
    price: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// Staff Interface

export interface IStaff extends Document {
    business: Types.ObjectId | IBusiness;
    name: string;
    role: string;
    services: Types.ObjectId[] | IService[];
    isAvailable: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// User Interface

export interface IUser extends Document {
    name: string;
    email: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
}

// Booking Interface

export interface IBooking extends Document {
    bookingNumber: string;
    serviceType: Types.ObjectId | IServiceType;
    business: Types.ObjectId | IBusiness;
    service: Types.ObjectId | IService;
    staff: Types.ObjectId | IStaff | null;
    user: Types.ObjectId | IUser;
    date: Date;
    time: string;
    totalAmount: number;
    status: "confirmed" | "cancelled";
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}