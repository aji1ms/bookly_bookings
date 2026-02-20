import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    businessData: [],
    loading: false,
    error: null,
    activeSlug: null,
    selectedbusiness: null,
}

export const getAllBusinessesThunk = createAsyncThunk(
    "business/getAllBusinesses",
    async (slug = null, { rejectWithValue }) => {
        try {
            const url = slug
                ? `${import.meta.env.VITE_API_URL}/api/businesses?slug=${slug}`
                : `${import.meta.env.VITE_API_URL}/api/businesses`;

            const response = await axios.get(url);
            return { data: response?.data?.data, slug };
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Failed to fetch businesses");
        }
    }
);

export const getBusinessByIdThunk = createAsyncThunk(
    "business/getBusinessById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/businesses/${id}`);
            return response?.data?.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Failed to fetch business");
        }
    }
)

const businessSlice = createSlice({
    name: "business",
    initialState,
    reducers: {
        clearFilter: (state) => {
            state.activeSlug = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllBusinessesThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getAllBusinessesThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.businessData = action.payload.data;
            state.activeSlug = action.payload.slug;
        });
        builder.addCase(getAllBusinessesThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(getBusinessByIdThunk.fulfilled, (state, action) => {
            state.selectedbusiness = action.payload;
        })
    }
})

export const { clearFilter } = businessSlice.actions;
export default businessSlice.reducer;