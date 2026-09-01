import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import instance from "../api/axios";

const initialState = {
    loading:false,
    error:null,
    readingList:[],
    readListBooks:[]

}

export const getListBookThunk = createAsyncThunk(
    "get/list/books",
    async (_,{rejectWithValue})=>{
        try {
            const {data} = await instance.get("readingstatus/getReadingList",{
                withCredentials:true
            })
            return data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "read list fetching failed");
        }
    }
)
export const updateStatusThunk = createAsyncThunk(
    "update/Status",
    async (updationData,{rejectWithValue})=>{
        try {
            
            
            const {data} = await instance.patch("readingstatus/updateStatus",updationData,{
                withCredentials:true
            })
            return data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "updation failed");
        }
    }
)
export const getReadListBooksThunk = createAsyncThunk(
    "readlist/Books",
    async ({readingStatus,sortOrder,sortValue},{rejectWithValue})=>{
        try {
            
          
            
            const {data} = await instance.get("readingstatus/readlist-books",{
                withCredentials:true,
                params:{
                    readingstatus:readingStatus,
                    sortOrder:sortOrder,
                    sortValue:sortValue
                }
            })
            return data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "read list fetching failed");
        }
    }
)
export const deleteListBookThunk = createAsyncThunk(
    "readlist/Book/delete",
    async (id,{rejectWithValue})=>{
        try {
            
          
            
            const {data} = await instance.get(`readingstatus/readlist-book/delete/${id}`,{
                withCredentials:true
            })
            return data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Book deletion  failed");
        }
    }
)


const readingListSlice = createSlice({
    name:"bookcollection",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
       builder.addCase(getListBookThunk.pending,(state)=>{
        state.loading = true;
       }).addCase(getListBookThunk.fulfilled,(state,action)=>{
        state.loading = false;
        state.readingList = action.payload.readingList
       }).addCase(getListBookThunk.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.payload
       }).addCase(updateStatusThunk.pending,(state)=>{
        state.loading = true;
       }).addCase(updateStatusThunk.fulfilled,(state,action)=>{
        state.loading = false;
        state.readingList = action.payload.readingList;
        state.readListBooks = action.payload.readingList;
        
        
       }).addCase(updateStatusThunk.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.payload
       }).addCase(getReadListBooksThunk.pending,(state)=>{
        state.loading = true;
       }).addCase(getReadListBooksThunk.fulfilled,(state,action)=>{
        state.loading = false;
        state.readListBooks = action.payload.result;
       }).addCase(getReadListBooksThunk.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.payload
       }).addCase(deleteListBookThunk.pending,(state)=>{
        state.loading = true;
       }).addCase(deleteListBookThunk.fulfilled,(state,action)=>{
        state.loading = false;
        state.readListBooks = action.payload.books;
       }).addCase(deleteListBookThunk.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.payload
       })
    }
    }
)



export default readingListSlice.reducer;