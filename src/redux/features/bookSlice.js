import { axiosInstance } from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addBook = createAsyncThunk("api/add", async (formData, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.post("/api/books", formData);
        return res.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Add book failed!")
    }
})
export const getBooks = createAsyncThunk("api/get", async (_, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.get("/api/books");
        return res.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Add book failed!")
    }
})
export const updateBook = createAsyncThunk("api/update", async ({ id, formData }, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.put(`/api/books/${id}`, formData);
        return res.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Add book failed!")
    }
})
export const deleteBook = createAsyncThunk("api/delete", async (id, { rejectWithValue }) => {
    try {
        await axiosInstance.delete(`/api/books/${id}`);
        return id
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Add book failed!")
    }
})

const bookSlice = createSlice({
    name: "api/books",
    initialState: {
        books: [],
        loading: false,
        error: null
    },
    reducers: {
        cleanError: (state) => {
            return state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addBook.pending, (state) => {
                state.error = null;
                state.loading = true
            })
            .addCase(addBook.fulfilled, (state, action) => {
                state.loading = false;
                state.books.unshift(action.payload.data);
            })
            .addCase(addBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // get book
            .addCase(getBooks.pending, (state) => {
                state.error = null;
                state.loading = true
            })
            .addCase(getBooks.fulfilled, (state, action) => {
    console.log("full payload:", action.payload);
    console.log("payload.data:", action.payload.data);
    console.log("is array:", Array.isArray(action.payload.data));
    state.loading = false;
    state.books = Array.isArray(action.payload.data) ? action.payload.data : [];
})
            .addCase(getBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // udpate book
            .addCase(updateBook.pending, (state) => {
                state.error = null;
                state.loading = true
            })
            .addCase(updateBook.fulfilled, (state, action) => {
                const updatedBook = action.payload.data;

                for (let i = 0; i < state.books.length; i++) {
                    if (state.books[i]._id === updatedBook._id) {
                        state.books[i] = updatedBook;
                        break;
                    }
                }
            })
            .addCase(updateBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // deleteBook
            .addCase(deleteBook.pending, (state) => {
                state.error = null;
                state.loading = true
            })
            .addCase(deleteBook.fulfilled, (state, action) => {
                state.loading = false;
                state.books = state.books.filter((b)=> b._id !== action.payload);
            })
            .addCase(deleteBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default bookSlice.reducer;