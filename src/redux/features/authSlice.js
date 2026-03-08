import { axiosInstance } from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const userSignUp = createAsyncThunk("auth/sign-up", async (formData, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.post("/api/auth/sign-up", formData);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "sign-up failed")
    }
})

export const userLogin = createAsyncThunk("/auth/login", async (formData, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.post("/api/auth/login", formData);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "login failed")
    }
})

export const userLogout = createAsyncThunk("/auth/logout", async (_, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.post("/api/auth/logout");
        return res.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "logout failed")
    }
})

export const getMe = createAsyncThunk("auth/getMe", async (_, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.get("/api/auth/getMe");
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "fetch user failed");
    }
});

const authSlice = createSlice({
    name: "authSlice",
    initialState: {
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null
    },
    reducers: {
        clearError: (state) => {
            return state.error = null
        },
    },
    extraReducers: (builder) => {
        builder.addCase(userSignUp.pending, (state) => {
            state.loading = true,
                state.error = null
        })
            .addCase(userSignUp.fulfilled, (state, action) => {
                state.loading = false,
                    state.isAuthenticated = true,
                    state.user = action.payload.data
            })
            .addCase(userSignUp.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })
            .addCase(userLogin.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.loading = false,
                    state.isAuthenticated = true,
                    state.user = action.payload.data
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })
            .addCase(userLogout.pending, (state) => {
                state.loading = true;
            })
            .addCase(userLogout.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(userLogout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getMe.fulfilled, (state, action) => {
                state.user = action.payload.data;
                state.isAuthenticated = true;
            })
            .addCase(getMe.rejected, (state) => {
                state.user = null;
                state.isAuthenticated = false;
            })

    }
})

export default authSlice.reducer;
