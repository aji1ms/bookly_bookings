import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { IUser } from "./userSlice";

export interface IBooking {
    bookingNumber: string;
    serviceType: string;
    business: string;
    service: string;
    staff: string | null;
    user: string | IUser;
    date: string | Date;
    time: string;
    totalAmount: number;
    status: "confirmed" | "cancelled";
    notes?: string;
}

interface AvailableTimeData {
    availableSlots: string[];
    [key: string]: any;
}

interface BookingState {
    booking: IBooking | null;
    availableTime: AvailableTimeData | null;
    loading: boolean;
    error: string | null;
}

const initialState: BookingState = {
    booking: null,
    availableTime: null,
    loading: false,
    error: null
}

// Create Booking

export const createBookingThunk = createAsyncThunk(
    "bookings/createBooking",
    async ({ serviceType, business, service, staff, user, date, time, totalAmount }: Omit<IBooking, 'bookingNumber' | 'status'>, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/bookings`, {
                serviceType,
                business,
                service,
                staff,
                user,
                date,
                time,
                totalAmount
            });

            return response.data.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<{ message: string }>;
                return rejectWithValue(axiosError.response?.data?.message || "Failed to create booking");
            }
            return rejectWithValue("Failed to create booking");
        }
    }
)

// Get All Available Slots

export const getAvailableTimeThunk = createAsyncThunk(
    "bookings/availableTime",
    async ({ date, staffId, businessId }: { date: string, staffId?: string | null, businessId: string }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/bookings/available-slots`, {
                params: {
                    date,
                    staffId,
                    businessId
                }
            });
            return response.data.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<{ message: string }>;
                return rejectWithValue(axiosError.response?.data?.message || "Failed to fetch available time");
            }
            return rejectWithValue("Failed to fetch available time");
        }
    }
)

const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // CreateBooking

        builder.addCase(createBookingThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createBookingThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.booking = action.payload;
        })
        builder.addCase(createBookingThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        // Get Available Time

        builder.addCase(getAvailableTimeThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getAvailableTimeThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.availableTime = action.payload;
        })
        builder.addCase(getAvailableTimeThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
    }
})

export default bookingSlice.reducer;