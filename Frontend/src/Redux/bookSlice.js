import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../api/axios";

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
                        offset: (page - 1) * 20,
                        limit: 20,
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
                await instance.post("book/addBooks", books, {
                    params: {
                        q: Query
                    }
                });
                const {data} = await instance.get("book/results", {
                    params: {
                        q: Query,
                        offset: (page - 1) * 20,
                        limit: 20
                    }
                })
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

            

            if (state.reset) {
                state.books = action.payload.books;                
            } else {
                state.books = [...state.books, ...action.payload.books];
            }





            state.message = action.payload?.message || "success"
        }).addCase(discoveryAsyncThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export const { addQuery, refresh, clearPrevBooks } = bookSlice.actions;
export default bookSlice.reducer;