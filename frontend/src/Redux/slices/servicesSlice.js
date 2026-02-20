import { createSlice, createAsyncThunk, combineReducers } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    services: [],
    loading: false,
    error: null
}

// Get Service By Business ID

export const getserviceByBusinessId = createAsyncThunk(
    "services/getserviceByBusinessId",
    async (businessId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/services?business=${businessId}`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Failed to fetch services");
        }
    }
)

const serviceSlice = createSlice({
    name: "service",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Get Service By Business ID

        builder.addCase(getserviceByBusinessId.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(getserviceByBusinessId.fulfilled, (state, action) => {
            state.loading = false;
            state.services = action.payload;
        });

        builder.addCase(getserviceByBusinessId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export default serviceSlice.reducer;