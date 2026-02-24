import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.ts';
import path from 'path';
import { fileURLToPath } from 'url';

import serviceTypeRoutes from './routes/serviceType.routes.ts';
import businessRoutes from './routes/business.routes.ts';
import serviceRoutes from './routes/service.routes.ts';
import staffRoutes from './routes/staff.routes.ts'; 
import userRoutes from './routes/user.routes.ts';
import bookingRoutes from './routes/booking.routes.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const server = express();

const corsOptions = {
    origin: [
        'https://bookly-at4d7f4lh-ajims-ismails-projects.vercel.app',
        'https://bookly-henna.vercel.app',
        'http://localhost:5173'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}

server.use(cors(corsOptions));
server.use(express.json());

connectDB();

const PORT = process.env.PORT || 3000;

server.use('/api/service-types', serviceTypeRoutes);
server.use("/api/businesses", businessRoutes);
server.use("/api/services", serviceRoutes);
server.use("/api/staffs", staffRoutes);
server.use("/api/users", userRoutes);
server.use("/api/bookings", bookingRoutes);

server.listen(PORT, () => {
    console.log(`Server is running on port`);
});