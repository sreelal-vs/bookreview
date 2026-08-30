import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import authReducer from "./authSlice"
import bookReducer from "./bookSlice"
import collectionReducer from "./bookCollectionSlice"
import readingStatus from "./readingListSlice"



export const store = configureStore({
    reducer:{
        user:userReducer,
        auth:authReducer,
        book:bookReducer,
        collection:collectionReducer,
        Library:readingStatus,
    }
})

