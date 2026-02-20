import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    booking: null,
    availableTime: [],
    loading: false,
    error: null
}

// Create Booking

export const createBookingThunk = createAsyncThunk(
    "bookings/createBooking",
    async ({ serviceType, business, service, staff, user, date, time, totalAmount }, { rejectWithValue }) => {
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
            return rejectWithValue(error?.response?.data?.message || "Failed to create booking");
        }
    }
)

// Get All Available Slots

export const getAvailableTimeThunk = createAsyncThunk(
    "bookings/availableTime",
    async ({ date, staffId, businessId }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/bookings/available-slots`, {
                params: {
                    date,
                    staffId,
                    businessId
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Failed to fetch available time");
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
            state.error = action.payload;
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
            state.error = action.payload;
        })
    }
})

export default bookingSlice.reducer;