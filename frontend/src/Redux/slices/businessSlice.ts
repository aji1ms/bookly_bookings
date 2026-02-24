import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export interface IBusiness {
    _id: string;
    serviceType: string;
    name: string;
    description: string;
    image?: string;
    location: string;
    rating: number;
    startingPrice: number;
    serviceCount: number;
    isActive: boolean;
}

interface IBusinessState {
    businessData: IBusiness[];
    loading: boolean;
    error: string | null;
    activeSlug: string | null;
    selectedbusiness: IBusiness | null;
}

interface GetAllBusinessesParams {
    slug?: string | null;
    search?: string;
}

const initialState: IBusinessState = {
    businessData: [],
    loading: false,
    error: null,
    activeSlug: null,
    selectedbusiness: null,
}

// Get All Businesses

export const getAllBusinessesThunk = createAsyncThunk(
    "business/getAllBusinesses",
    async ({ slug = null, search = "" }: GetAllBusinessesParams = {}, { rejectWithValue }) => {
        try {
            const params = new URLSearchParams();
            if (slug) params.append("slug", slug);
            if (search.trim()) params.append("search", search.trim());

            const query = params.toString();
            const url = `${import.meta.env.VITE_API_URL}/api/businesses${query ? `?${query}` : ""}`;

            const response = await axios.get(url);
            return { data: response?.data?.data, slug };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<{ message: string }>;
                return rejectWithValue(axiosError.response?.data?.message || "Failed to fetch businesses");
            }
            return rejectWithValue("Failed to fetch businesses");
        }
    }
);

// Get Business By ID

export const getBusinessByIdThunk = createAsyncThunk(
    "business/getBusinessById",
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/businesses/${id}`);
            return response?.data?.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<{ message: string }>;
                return rejectWithValue(axiosError.response?.data?.message || "Failed to fetch business");
            }
            return rejectWithValue("Failed to fetch business");
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
        // Get All Businesses

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
            state.error = action.payload as string;
        });

        // Get Business By ID

        builder.addCase(getBusinessByIdThunk.fulfilled, (state, action) => {
            state.selectedbusiness = action.payload;
        })
    }
})

export const { clearFilter } = businessSlice.actions;
export default businessSlice.reducer;