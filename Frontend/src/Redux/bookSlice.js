import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../api/axios";

const initialState = {
    books: [],
    loading: false,
    error: null
}

export const searchAsyncThunk = createAsyncThunk(
    "search/results",
    async (query, { rejectWithValue }) => {
        try {
            const res1 = await instance.get("book/results", {
                params: { q: query },
                withCredentials: true
            });
            if (res1.data.books.length < 5) {
                const res2 = await instance.get("https://openlibrary.org/search.json", {
                    params: {
                        q: query,
                        limit: 100,
                        fields: "key,title,series_name,author_name,cover_i,subjects,first_publish_year"
                    }
                })
                 const books = res2.data.docs.map((b)=>({
                    openLibraryid:b.key,
                    title:b.title,
                    author:b.author_name[0]||"unknown", 
                    seriesName:b.series_name||null,
                    coverpicid:b.cover_i || null,
                    subjects:b.subjects || null,
                    publishedYear:b.first_publish_year
                 }))

                 await instance.post("book/addBook",books);
                 return books
            }
            return res1.data.books
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "search failed")
        }
    }
)


const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(searchAsyncThunk.pending,(state)=>{
            state.loading = true;
            state.error = null
        }).addCase(searchAsyncThunk.fulfilled,(state,action)=>{
            state.loading = true;
            state.error = null,
            state.books = action.payload
        }).addCase(searchAsyncThunk.rejected,(state,action)=>{
            state.loading = true;
            state.error = action.payload
        })
    }
})


export default bookSlice.reducer;