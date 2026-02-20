import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    staffs: [],
    loading: false,
    error: null
}

export const getStaffByServiceIdThunk = createAsyncThunk(
    "staff/getStaffByServiceId",
    async (serviceId, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/staffs/by-service/${serviceId}`
            );
            return response?.data?.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Failed to fetch staff");
        }
    }
)

const staffSlice = createSlice({
    name: 'staff',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
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
                state.error = action.payload;
            })
    }
})

export default staffSlice.reducer;