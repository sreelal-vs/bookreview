import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../api/axios";

const initialState = {
    books: [],
    loading: false,
    error: null,
    Query: "",
    message:"",
    totalPages: 0
}

export const searchAsyncThunk = createAsyncThunk(
    "search/results",
    async ({Query,page}, { rejectWithValue }) => {
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
            if (res1.data.books.length < 5 ) {
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
                const res3 = await instance.post("book/addBooks", books, {
                    params: {
                        q: Query
                    }
                });
                return res3.data
            }
            return res1.data
        } catch (error) {
            console.log(error);

            return rejectWithValue(error?.response?.data || "search failed")
        }
    }
)


const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        addQuery: (state, action) => {
            state.Query = action.payload;
            state.loading = true;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(searchAsyncThunk.pending, (state) => {
            state.error = null
        }).addCase(searchAsyncThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null,
            state.books = action.payload.books;
            state.totalPages = Math.ceil(action.payload.numFound / 20)
            state.message = action.payload?.message ||"success"
        }).addCase(searchAsyncThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export const { addQuery } = bookSlice.actions;
export default bookSlice.reducer;