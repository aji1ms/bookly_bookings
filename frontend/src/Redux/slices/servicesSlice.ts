import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export interface IService {
    _id: string;
    business: string;
    name: string;
    description?: string;
    duration: number;
    price: number;
    isActive: boolean;
}

interface IServiceState {
    services: IService[];
    loading: boolean;
    error: string | null;
}

const initialState: IServiceState = {
    services: [],
    loading: false,
    error: null
}

// Get Service By Business ID

export const getserviceByBusinessId = createAsyncThunk(
    "services/getserviceByBusinessId",
    async (businessId: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/services?business=${businessId}`);
            return response.data.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<{ message: string }>;
                return rejectWithValue(axiosError.response?.data?.message || "Failed to fetch services");
            }
            return rejectWithValue("Failed to fetch services");
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
            state.error = action.payload as string;
        })
    }
})

export default serviceSlice.reducer;