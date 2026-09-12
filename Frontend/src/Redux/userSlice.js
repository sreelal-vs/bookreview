import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../api/axios";

const initialState = {
    user:[],
    loading:true,
    error:null
}

export const userRegisterThunk = createAsyncThunk(
   "user/Register",
    async (formData,{ rejectWithValue })=>{
        try {
            const {data} = await instance.post('user/register',formData);
            return data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Registration Failed")
        }
    }

    
)
export const userEditThunk = createAsyncThunk(
   "user/Register",
    async (formData,{ rejectWithValue })=>{
        try {
            console.log(formData.get("fullname"));
            
            const {data} = await instance.patch('user/edit',formData,{
                withCredentials:true
            });
            return data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "failed to update user data")
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