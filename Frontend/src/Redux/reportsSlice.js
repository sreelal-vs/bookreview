import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../api/axios";



const initialState = {
    userReports: [],
    reviewReports: [],
    commentReports: [],
    reportPreview: null,
    loading: false,
    error: null,
}

export const reviewPreviewThunk = createAsyncThunk(
    "get/Review/Preview",
    async (reviewId, { rejectWithValue }) => {
        try {

            const { data } = await instance.get("review/get/review/preview", {
                params: { reviewId },
                withCredentials: true
            })

            return data;
        } catch (error) {

            return rejectWithValue(error?.response?.data || "Failed to  get the review")
        }
    }
)

export const reviewReportsThunk = createAsyncThunk(
    "get/Review/Reports",
    async (_, { rejectWithValue }) => {
        try {

            const { data } = await instance.get("report/review", {
                withCredentials: true
            })

            return data;
        } catch (error) {

            return rejectWithValue(error?.response?.data || "Failed to  get the review reports")
        }
    }
)
export const userReportsThunk = createAsyncThunk(
    "get/User/Reports",
    async (_, { rejectWithValue }) => {
        try {

            const { data } = await instance.get("report/user", {
                withCredentials: true
            })

            return data;
        } catch (error) {

            return rejectWithValue(error?.response?.data || "Failed to  get the user reports")
        }
    }
)
export const commentReportsThunk = createAsyncThunk(
    "get/comment/Reports",
    async (_, { rejectWithValue }) => {
        try {

            const { data } = await instance.get("report/comment", {
                withCredentials: true
            })

            return data;
        } catch (error) {

            return rejectWithValue(error?.response?.data || "Failed to  get the comment reports")
        }
    }
)

export const commentPreviewThunk = createAsyncThunk(
    "get/Comment/Preview",
    async (commentId, { rejectWithValue }) => {
        try {

            const { data } = await instance.get("comment/get/preview", {
                params: { commentId },
                withCredentials: true
            })

            return data;
        } catch (error) {

            return rejectWithValue(error?.response?.data || "Failed to  get the review")
        }
    }
)

export const addReportThunk = createAsyncThunk(
    "add/Report",
    async ({ violations, targetId, reportedFor }, { rejectWithValue }) => {
        try {
            const reportData = {
                violations,
                targetId,
                reportedFor
            }


            const { data } = await instance.post("report/add", reportData, {
                withCredentials: true
            })
            return data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Adding report failed");
        }
    }
)

export const FlagCommentThunk = createAsyncThunk(
    "Flag/comment",
    async ({reportId,reportStatus,flag}, { rejectWithValue }) => {
        try {

            const { data } = await instance.patch("report/flag/comment", { reportId,reportStatus,flag }, {
                withCredentials: true
            })
            return data;
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Failed to  flag the commment")
        }
    }
)
export const FlagReviewThunk = createAsyncThunk(
    "Flag/review",
    async ({reportId,reportStatus,flag}, { rejectWithValue }) => {
        try {

            const { data } = await instance.patch("report/flag/review", { reportId,reportStatus,flag }, {
                withCredentials: true
            })
            return data;
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Failed to  flag the review")
        }
    }
)
export const handleBanThunk = createAsyncThunk(
    "Ban/handle",
    async ({reportId,reportStatus,ban}, { rejectWithValue }) => {
        try {

            const { data } = await instance.patch("report/ban/user", { reportId,reportStatus,ban }, {
                withCredentials: true
            })
            return data;
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Failed to ban User")
        }
    }
)
const reportSlice = createSlice({
    name: "report",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(reviewPreviewThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(reviewPreviewThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.reportPreview = action.payload.preview;
        }).addCase(reviewPreviewThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase(commentPreviewThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(commentPreviewThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.reportPreview = action.payload.preview;
        }).addCase(commentPreviewThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase(addReportThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(addReportThunk.fulfilled, (state) => {
            state.loading = false;
            state.error = null;

        }).addCase(addReportThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase(commentReportsThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(commentReportsThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.commentReports = action.payload.commentReports
        }).addCase(commentReportsThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase(reviewReportsThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(reviewReportsThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.reviewReports = action.payload.reviewReports
        }).addCase(reviewReportsThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase(userReportsThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(userReportsThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.userReports = action.payload.userReports
        }).addCase(userReportsThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase(FlagCommentThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(FlagCommentThunk.fulfilled, (state,action) => {
            state.loading = false;
            state.error = null;
            const { reportId,reportStatus,flag} = action.payload;
            const report = state.commentReports.find(report => report._id === reportId);
            if (report) {
                report.status = reportStatus
                report.targetId.isflagged = flag;
            }
        }).addCase(FlagCommentThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase(FlagReviewThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(FlagReviewThunk.fulfilled, (state,action) => {
            state.loading = false;
            state.error = null;
            const { reportId,reportStatus,flag} = action.payload;
            const report = state.reviewReports.find(report => report._id === reportId);
            if (report) {
                report.status = reportStatus
                report.targetId.isflagged = flag;
            }
        }).addCase(FlagReviewThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase(handleBanThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(handleBanThunk.fulfilled, (state,action) => {
            state.loading = false;
            state.error = null;
            const { reportId,reportStatus,ban} = action.payload;
            const report = state.userReports.find(report => report._id === reportId);
            if (report) {
                report.status = reportStatus
                report.targetId.isBanned = ban;
            }
        }).addCase(handleBanThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }

})

export default reportSlice.reducer;