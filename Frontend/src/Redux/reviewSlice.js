import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../api/axios";



const initialState = {
    reviews: [],
    loading: false,
    error: null,
    message: ""

}

export const getReviewsThunk = createAsyncThunk(
    "get/Reviews",
    async (id, { rejectWithValue }) => {
        try {

            const { data } = await instance.get("review/get/reviews", {
                params: { id },
                withCredentials: true
            })

            return data;
        } catch (error) {

            return rejectWithValue(error?.response?.data || "Failed to  get the reviews")
        }
    }
)
export const createReviewThunk = createAsyncThunk(
    "Create/Review",
    async (reviewData, { rejectWithValue }) => {
        try {




            const { data } = await instance.post("review/create", reviewData, {
                withCredentials: true
            })

            return data;
        } catch (error) {

            return rejectWithValue(error?.response?.data || "Failed to  add the reviews")
        }
    }
)
export const updateReviewThunk = createAsyncThunk(
    "update/Review",
    async (reviewData, { rejectWithValue }) => {
        try {




            const { data } = await instance.patch("review/update", reviewData, {
                withCredentials: true
            })

            return data;
        } catch (error) {

            return rejectWithValue(error?.response?.data || "Failed to  update the review")
        }
    }
)
export const deleteReviewThunk = createAsyncThunk(
    "delete/Review",
    async (id, { rejectWithValue }) => {
        try {




            const { data } = await instance.delete("review/delete", {
                params:{id:id},
                withCredentials: true
            })

            return data;
        } catch (error) {

            return rejectWithValue(error?.response?.data || "Failed to  delete the review")
        }
    }
)
const reviewSlice = createSlice({
    name: "review",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getReviewsThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(getReviewsThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            if (state.reviews) {
                state.reviews = []
            }

            if (action.payload?.reviews) {
                state.reviews = action.payload.reviews;
            } else {
                state.message = action.payload.message

            }

        }).addCase(getReviewsThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase(createReviewThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(createReviewThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.reviews.push(action.payload.newreview)

        }).addCase(createReviewThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase(updateReviewThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(updateReviewThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            const { newreviewContent, reviewId, newRating } = action.payload;
            console.log(newRating);

            const review = state.reviews.find(b => b._id === reviewId)
            if (review) {
                review.content = newreviewContent;
                review.rating = newRating;
            }

        }).addCase(updateReviewThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase(deleteReviewThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(deleteReviewThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            const { reviewId } = action.payload;
            const index = state.reviews.findIndex((review) => review._id === reviewId);
            state.reviews.splice(index, 1)


        }).addCase(deleteReviewThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }

})

export default reviewSlice.reducer;