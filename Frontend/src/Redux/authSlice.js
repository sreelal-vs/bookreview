import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../api/axios";



const initialState = {
    user:"",
    isAuthenticated:null,
    isAuthChecked:false,
    loading: false,
    error: null
}

export const userLoginThunk = createAsyncThunk(
    "user/Login",
    async (userData, { rejectWithValue }) => {
        try {
            
           
            const { data } = await instance.post("user/login",userData,{
                withCredentials:true
            });
            
            return data;
        }catch (error) {
            
            
            return rejectWithValue(error?.response?.data||"Login failed");
        }
    }
)
export const userLogoutThunk = createAsyncThunk(
    "user/Logout",
    async (_,{rejectWithValue})=>{
        try {
            const {data} = await instance.post("user/logout");
            return data
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Logout failed")
        }
    }
)
export const getCurrentUserThunk = createAsyncThunk(
    "currentUser/me",
    async (_,{rejectWithValue})=>{
        try {          
            const {data} = await instance.get("user/me",{
                withCredentials:true
            })
            return data
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || error?.response?.data?.error ||"there is no user" );
        }
    }
)

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(userLoginThunk.pending,(state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(userLoginThunk.fulfilled,(state,action)=>{
            state.loading = false;
            state.error = null;
            state.isAuthenticated=true;
            state.isAuthChecked =true
            state.user=action.payload.user;
        }).addCase(userLoginThunk.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;        
        }).addCase(getCurrentUserThunk.pending,(state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(getCurrentUserThunk.fulfilled,(state,action)=>{
            state.loading = false;
            state.error = null;
            state.isAuthenticated=true;
            state.isAuthChecked = true;
            state.user=action.payload.user;
        }).addCase(getCurrentUserThunk.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;        
        }).addCase(userLogoutThunk.pending,(state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(userLogoutThunk.fulfilled,(state)=>{
            state.loading = false;
            state.error = null;
            state.isAuthenticated=false;
            state.isAuthChecked = true;
            state.user="";
        }).addCase(userLogoutThunk.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;        
        })
    }

})

export default authSlice.reducer;