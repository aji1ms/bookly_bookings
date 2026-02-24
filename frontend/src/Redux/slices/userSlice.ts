import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export interface IUser {
    id: number;
    name: string;
    email: string;
    phone: string;
}

interface UserState {
    user: IUser | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null
};

// Create User

export const createUserSlice = createAsyncThunk(
    "user/createUser",
    async ({ name, email, phone }: { name: string, email: string, phone: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users`,
                { name, email, phone });
            return response.data.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<{ message: string }>;
                return rejectWithValue(axiosError.response?.data?.message ||
                    "Failed to save user details! please try again");
            }
            return rejectWithValue("Failed to save user details! please try again");
        }
    }
)

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Create User

        builder.addCase(createUserSlice.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(createUserSlice.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
        builder.addCase(createUserSlice.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
    }
})

export default userSlice.reducer