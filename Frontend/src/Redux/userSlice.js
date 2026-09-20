import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../api/axios";

const initialState = {
    users:[],
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
export const getAllUsersThunk = createAsyncThunk(
   "user/get/all",
    async (_,{ rejectWithValue })=>{
        try {
            const {data} = await instance.get('user/all',{
                withCredentials:true
            });
            return data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "fetching users Failed")
        }
    }

    
)
export const updateRole = createAsyncThunk(
   "user/role/update",
    async ({role,userId},{ rejectWithValue })=>{
        try {
            const {data} = await instance.patch('user/role',{role,userId},{
                withCredentials:true
            });
            return data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "updating user status Failed")
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

export const passwordChangeThunk = createAsyncThunk(
   "user/password/update",
    async ({prevPassword,password},{ rejectWithValue })=>{
        try {
            const {data} = await instance.patch('user/password/change',{prevPassword,password},{
                withCredentials:true
            });
            return data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "updating user password Failed")
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
        }).addCase(getAllUsersThunk.pending,(state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(getAllUsersThunk.fulfilled,(state,action)=>{
            state.loading = false;
            state.error=null;
            state.users = action.payload.users;
        }).addCase(getAllUsersThunk.rejected,(state,actions)=>{
            state.loading = true;
            state.error = actions.payload;
        }).addCase(updateRole.pending,(state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(updateRole.fulfilled,(state,action)=>{
            state.loading = false;
            state.error=null;
            const {role,userId} = action.payload;
            const user = state.users.find(user=>user._id === userId);
            if(user){
                user.role = role
            }
        }).addCase(updateRole.rejected,(state,actions)=>{
            state.loading = true;
            state.error = actions.payload;
        }).addCase(passwordChangeThunk.pending,(state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(passwordChangeThunk.fulfilled,(state)=>{
            state.loading = false;
            state.error=null
        }).addCase(passwordChangeThunk.rejected,(state,actions)=>{
            state.loading = true;
            state.error = actions.payload;
        })
    
    }

})


export default userSlice.reducer;