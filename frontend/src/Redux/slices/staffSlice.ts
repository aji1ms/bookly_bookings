import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export interface IStaff {
    _id: string;
    business: string;
    name: string;
    role: string;
    services: string[];
    isAvailable: boolean;
}

interface IStaffState {
    staffs: IStaff[];
    loading: boolean;
    error: string | null;
}

const initialState: IStaffState = {
    staffs: [],
    loading: false,
    error: null
}

// Get Staff By Service ID

export const getStaffByServiceIdThunk = createAsyncThunk(
    "staff/getStaffByServiceId",
    async (serviceId: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/staffs/by-service/${serviceId}`
            );
            return response?.data?.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<{ message: string }>;
                return rejectWithValue(axiosError.response?.data?.message || "Failed to fetch staff");
            }
            return rejectWithValue("Failed to fetch staff");
        }
    }
)

const staffSlice = createSlice({
    name: 'staff',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Get Staff By Service By ID

        builder.addCase(getStaffByServiceIdThunk.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        builder.addCase(getStaffByServiceIdThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.staffs = action.payload;
        })
            .addCase(getStaffByServiceIdThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }
})

export default staffSlice.reducer;