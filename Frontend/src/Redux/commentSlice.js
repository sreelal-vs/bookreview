import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../api/axios";



const initialState = {
    comments: [],
    loading: false,
    error: null,
}

export const createReplyThunk = createAsyncThunk(
    "create/comment",
    async ({ reviewId, content, repliedTo, repliedFor }, { rejectWithValue }) => {
        try {
            const commentData = {
                reviewId, content, repliedTo, repliedFor
            }
            const { data } = await instance.put("comment/add", commentData, {
                withCredentials: true
            })
            return data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Failed to  add comment")

        }
    }
)
export const editReplyThunk = createAsyncThunk(
    "edit/comment",
    async ({ commentId, content }, { rejectWithValue }) => {
        try {
            const commentData = {
                commentId, content
            }
            console.log(commentData);
            
            const { data } = await instance.patch("comment/update", commentData, {
                withCredentials: true
            })
            return data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Failed to  add comment")

        }
    }
)
export const deletetCommentThunk = createAsyncThunk(
    "delete/comment",
    async (commentId, { rejectWithValue }) => {
        try {
            const { data } = await instance.delete("comment/delete", {
                params: { commentId },
                withCredentials: true
            })
            return data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Failed to  delete the comment")

        }
    }
)
export const getCommentsThunk = createAsyncThunk(
    "get/comment",
    async (reviewId, { rejectWithValue }) => {
        try {
            const { data } = await instance.get("comment/getAll", {
                params: { reviewId },
                withCredentials: true,
            })
            return data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Failed to  add comment")

        }
    }
)

const commentSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCommentsThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(getCommentsThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            const { comments } = action.payload;
            if (comments) {
                state.comments = comments
            }
        }).addCase(getCommentsThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase(createReplyThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(createReplyThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            const { comment } = action.payload;
            if (comment) {
                state.comments.push(comment)
            }
        }).addCase(createReplyThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase(deletetCommentThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(deletetCommentThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            const { commentId } = action.payload;
            
            const index = state.comments.findIndex(comment => comment._id === commentId)
            if (index != -1) {
                state.comments.splice(index, 1)
            }
        }).addCase(deletetCommentThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase(editReplyThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(editReplyThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            const { content,commentId } = action.payload;
            
            const comment = state.comments.find(comment => comment._id === commentId)
            if (comment) {
                comment.content = content;
                comment.isEdited = true
            }
        }).addCase(editReplyThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
}

)

export default commentSlice.reducer;