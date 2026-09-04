import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../api/axios";
import { createReviewThunk, deleteReviewThunk, updateReviewThunk } from "./reviewSlice";

const initialState = {
    books: [],
    loading: false,
    error: null,
    Query: "",
    message: "",
    totalPages: 0,
    reset: false
}
export const discoveryAsyncThunk = createAsyncThunk(
    "discovery/results",
    async ({ sortOrder, sortValue, pageNum }, { rejectWithValue }) => {
        try {


            const { data } = await instance.get("book/discovery/result", {
                params: {
                    sortOrder,
                    sortValue,
                    offset: (pageNum - 1) * 20,
                    limit: 20,
                    pageNum
                }
            })



            return data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "books search in discovery failed")

        }
    }
)

export const searchAsyncThunk = createAsyncThunk(
    "search/results",
    async ({ Query, page }, { rejectWithValue }) => {
        try {

            if (!Query) {
                return rejectWithValue("query not found error from thunk")
            }


            const res1 = await instance.get("book/results", {
                params: {
                    q: Query,
                    offset: (page - 1) * 20,
                    limit: 20
                }
            });
            if (res1.data.books.length < 5) {
                const res2 = await instance.get("https://openlibrary.org/search.json", {
                    params: {
                        q: Query,
                        limit: 100,
                        fields: "key,title,series_name,author_name,cover_i,subjects,first_publish_year"
                    }
                })


                const books = res2.data.docs.map((b) => ({
                    openLibraryid: b.key,
                    title: b.title,
                    author: b?.author_name?.[0] || "unknown",
                    seriesName: b?.series_name?.[0] || null,
                    coverpicid: b?.cover_i || null,
                    subjects: b?.subjects || null,
                    publishedYear: b.first_publish_year
                }))
                console.log(books);
                
                await instance.post("book/addBooks", books, {
                    params: {
                        q: Query
                    }
                });
                const { data } = await instance.get("book/results", {
                    params: {
                        q: Query,
                        offset: (page - 1) * 20,
                        limit: 20
                    }
                })
                console.log(data.books);

                return data
                
            }
            return res1.data
        } catch (error) {

            return rejectWithValue(error?.response?.data || "search failed")
        }
    }
)


const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        addQuery: (state, action) => {
            state.Query = action.payload.value;


            if (action.payload.loading) {
                state.loading = true;
            } else {
                state.loading = false
            }
        },
        refresh: (state, action) => {
            state.reset = action.payload
        },
        clearPrevBooks: (state) => {
            state.books = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(searchAsyncThunk.pending, (state) => {
            state.loading = true;
            state.error = null
        }).addCase(searchAsyncThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null,
            state.books = action.payload.books;
            state.totalPages = Math.ceil(action.payload.numFound / 20)
            state.message = action.payload?.message || "success"
        }).addCase(searchAsyncThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase(discoveryAsyncThunk.pending, (state) => {
            state.loading = true;
            state.error = null
        }).addCase(discoveryAsyncThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            if (state.books) {
                state.books = [];
            }


            if (state.reset) {
                state.books = action.payload.books;
            } else {
                state.books = [...state.books, ...action.payload.books];
            }





            state.message = action.payload?.message || "success"
        }).addCase(discoveryAsyncThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase(createReviewThunk.pending, (state) => {
          
            state.error = null
        }).addCase(createReviewThunk.fulfilled, (state, action) => {
            state.loading = false;
            const { bookId, avgRating } = action.payload;
            const book = state.books.find(b => b._id === bookId);
            if (book) {
                book.avgrating = avgRating;
            }
            
            
        }).addCase(createReviewThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase(updateReviewThunk.pending, (state) => {
          
            state.error = null
        }).addCase(updateReviewThunk.fulfilled, (state, action) => {
            state.loading = false;
            const { bookId, avgRating } = action.payload;
            const book = state.books.find(b => b._id === bookId);
            if (book) {
                book.avgrating = avgRating;
            }
            
            
        }).addCase(updateReviewThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(deleteReviewThunk.pending, (state) => {
          
            state.error = null
        }).addCase(deleteReviewThunk.fulfilled, (state, action) => {
            state.loading = false;
            const { bookId, avgRating } = action.payload;
            console.log(bookId);
            
            const book = state.books.find(b => b._id === bookId);
            if (book) {
                book.avgrating = avgRating;
            }
            
            
        }).addCase(deleteReviewThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export const { addQuery, refresh, clearPrevBooks } = bookSlice.actions;
export default bookSlice.reducer;