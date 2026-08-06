import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import authReducer from "./authSlice"
import bookReducer from "./bookSlice"

export const store = configureStore({
    reducer:{
        user:userReducer,
        auth:authReducer,
        book:bookReducer
    }
})

