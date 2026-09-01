import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import instance from "../api/axios"

const initialState = {
    loading: false,
    error: null,
    fav: {},
    currectCollection: null,
    collections: []
}


export const getFavouriteBooksThunk = createAsyncThunk(
    "get/favourite/books",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await instance.get("collection/get/favourites", {
                withCredentials: true
            })

            return data;
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Failed to retrieve favourite books")
        }
    }
)

export const createCollectionThunk = createAsyncThunk(
    "create/Collection",
    async (name, { rejectWithValue }) => {
        try {
            const { data } = await instance.put("collection/create",{name}, {
                withCredentials: true
            })

            return data;
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Failed to create collection")
        }
    }
)

export const updateFavouriteThunk = createAsyncThunk(
    "favourite/books/upsert",
    async ({ liked, id }, { rejectWithValue }) => {
        try {
            const bookData = {
                liked,
                id
            }
            const { data } = await instance.patch("collection/favourite-update", bookData, {
                withCredentials: true
            })

            return data;
        } catch (error) {
            console.log(error);

            return rejectWithValue(error?.response?.data || "Failed to upsert the book into fav")
        }
    }
)


const bookCollectionSlice = createSlice({
    name: "bookcollection",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(updateFavouriteThunk.pending, (state) => {
            state.loading = true;

        }).addCase(updateFavouriteThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.fav = action.payload.favBooks

        }).addCase(updateFavouriteThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase(getFavouriteBooksThunk.pending, (state) => {
            state.loading = true
        }).addCase(getFavouriteBooksThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.fav = action.payload.favBooks
        }).addCase(getFavouriteBooksThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;

        }).addCase(createCollectionThunk.pending, (state) => {
            state.loading = true
        }).addCase(createCollectionThunk.fulfilled, (state) => {
            state.loading = false;
        }).addCase(createCollectionThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;

        })
    }
})



export default bookCollectionSlice.reducer;