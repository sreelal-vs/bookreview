import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../api/axios";

const initialState = {
    user:[],
    loading:false,
    error:null
}

export const userRegisterThunk = createAsyncThunk(
   "user/Register",
    async (formData,{ rejectWithValue })=>{
        try {
            const {data} = await instance.post('user/register',formData);
            return data
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Registration Failed")
        }
    }

    
)

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(userRegisterThunk.pending,(state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(userRegisterThunk.fulfilled,(state)=>{
            state.loading = false;
            state.error=null;
        }).addCase(userRegisterThunk.rejected,(state,actions)=>{
            state.loading = true;
            state.error = actions.payload;
        })
    }

})


export default userSlice.reducer;