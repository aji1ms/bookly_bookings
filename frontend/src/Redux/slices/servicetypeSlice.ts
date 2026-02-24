import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export interface IServiceType {
    _id: string;
    name: string;
    slug: string;
    isActive: boolean;
}

interface IServiceTypeState {
    serviceTypes: IServiceType[];
    loading: boolean;
    error: string | null;
}

const initialState: IServiceTypeState = {
    serviceTypes: [],
    loading: false,
    error: null,
};

// Get All Service Types

export const getAllServiceTypesThunk = createAsyncThunk(
    "serviceType/getAllServiceTypes",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/service-types`);
            return response?.data?.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<{ message: string }>;
                return rejectWithValue(axiosError.response?.data?.message || "Failed to fetch service types");
            }
            return rejectWithValue("Failed to fetch service types");
        }
    }
);

const serviceTypeSlice = createSlice({
    name: "serviceType",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Get All Service Types

        builder.addCase(getAllServiceTypesThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getAllServiceTypesThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.serviceTypes = action.payload;
        });
        builder.addCase(getAllServiceTypesThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export default serviceTypeSlice.reducer;
