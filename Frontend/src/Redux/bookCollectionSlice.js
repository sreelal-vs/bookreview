import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

const initialState = {
    loading:false,
    error:null,
    currectCollection:null,
    books:[],
    collections:[]
}




const bookCollectionSlice = createSlice({
    name:"bookcollection",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
    //    builder.addCase(,(state)=>{
        
    //    })
    }
})



export default bookCollectionSlice.reducer;