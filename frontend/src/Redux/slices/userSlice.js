import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: null,
    loading: false,
    error: null
};

// Create User

export const createUserSlice = createAsyncThunk(
    "user/createUser",
    async ({ name, email, phone }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users`,
                { name, email, phone });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data || "failed to create user");
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
            state.error = action.payload;
        })
    }
})

export default userSlice.reducer