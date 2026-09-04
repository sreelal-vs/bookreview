import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import instance from "../api/axios"

const initialState = {
    loading: false,
    error: null,
    fav: {},
    currentCollection: null,
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
export const getBookCollectionsThunk = createAsyncThunk(
    "get/Collections",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await instance.get("collection/get/collections", {
                withCredentials: true
            })

            return data;
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Failed to retrieve collections")
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

export const deleteCollectionThunk = createAsyncThunk(
    "delete/Collection",
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await instance.delete("collection/delete", {
                data:{id},
                withCredentials: true
            })

            return data;
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Failed to create collection")
        }
    }
)
export const getCurrentCollectionThunk = createAsyncThunk(
    "getCurrent/Collection",
    async (id, { rejectWithValue }) => {
        try {
            
            
            const { data } = await instance.get("collection/get/current/collection", {
                params:{id},
                withCredentials: true
            })

            return data;
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Failed to get the collection")
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
           

            return rejectWithValue(error?.response?.data || "Failed to upsert the book into fav")
        }
    }
)
export const addItemCollectionThunk = createAsyncThunk(
    "add/book/Collection",
    async ({ collectionId, bookId }, { rejectWithValue }) => {
        try {
            const bookData = {
                collectionId,
                bookId
            }
            const { data } = await instance.patch("collection/add/item/collection", bookData, {
                withCredentials: true
            })

            return data;
        } catch (error) {
            console.log(error);

            return rejectWithValue(error?.response?.data || "Failed to upsert the book into fav")
        }
    }
)

export const deleteItemCollectionThunk = createAsyncThunk(
    "delete/book/Collection",
    async ({ collectionId, bookId }, { rejectWithValue }) => {
        try {
            const bookData = {
                collectionId,
                bookId
            }
            const { data } = await instance.patch("collection/delete/item/collection", bookData, {
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
        }).addCase(createCollectionThunk.fulfilled, (state,action) => {
            state.loading = false;
            state.collections.push(action.payload.newCollection);
        }).addCase(createCollectionThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase(getBookCollectionsThunk.pending, (state) => {
            state.loading = true
        }).addCase(getBookCollectionsThunk.fulfilled, (state,action) => {
            state.collections = action.payload.collections;
            state.loading = false;
        }).addCase(getBookCollectionsThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase(deleteCollectionThunk.pending, (state) => {
            state.loading = true
        }).addCase(deleteCollectionThunk.fulfilled, (state,action) => {
            const index = state.collections.findIndex((collection)=>collection._id == action.payload.deletedCollectionId);
            state.collections.splice(index,1)
            state.loading = false;
        }).addCase(deleteCollectionThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase(addItemCollectionThunk.pending, (state) => {
            state.loading = true;

        }).addCase(addItemCollectionThunk.fulfilled, (state) => {
            state.loading = false;
            

        }).addCase(addItemCollectionThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase(deleteItemCollectionThunk.pending, (state) => {
            state.loading = true;

        }).addCase(deleteItemCollectionThunk.fulfilled, (state) => {
            state.loading = false;
            

        }).addCase(deleteItemCollectionThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase(getCurrentCollectionThunk.pending, (state) => {
            state.loading = true;

        }).addCase(getCurrentCollectionThunk.fulfilled, (state,action) => {
            state.loading = false;
            state.currentCollection = action.payload.currentCollection;

        }).addCase(getCurrentCollectionThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})



export default bookCollectionSlice.reducer;