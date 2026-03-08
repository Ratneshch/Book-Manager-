import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/features/authSlice"
import bookReducer from "@/redux/features/bookSlice"

export const store = configureStore({
    reducer:{
        auth: authReducer,
        books: bookReducer
    }
})