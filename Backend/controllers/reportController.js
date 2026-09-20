
const Comment = require("../models/commentModel");
const Reports = require("../models/reportModel");
const Review = require("../models/reviewModel");
const User = require("../models/userModel");

exports.addReport = async (req, res) => {
    try {
        const { violations, targetId, reportedFor } = req.body;
        const { userId } = req.userData;
        if (!targetId || !reportedFor) {
            return res.status(400).json({
                success: false,
                message: "Input data is not found"
            })
        }
        const reportData = {
            violations,
            targetId,
            reportedFor, reportedBy: userId
        }
        const existingReport = await Reports.findOne({ targetId, reportedFor, reportedBy: userId });
        if (existingReport) {


            return res.status(409).json({
                success: false,
                message: "there is already a report like this",
                error: "User already reported this "
            })
        }

        await Reports.create(reportData)
        return res.status(200).json({
            success: true,
            message: "successfully added the report"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.getReviewReports = async (req, res) => {
    try {
        const reviewReports = await Reports.find({ reportedFor: "review" }).populate({
            path: "targetId",
            populate: [
                { path: "book", select: "coverpicid title" },
                { path: "user", select: "profilePic name email" }
            ]
        });
        if (!reviewReports) {
            return res.status(409).json({
                success: false,
                message: "there is no review reports"
            })
        }

        return res.status(200).json({
            success: true,
            message: "successfully fetched the review reports",
            reviewReports
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.getUserReports = async (req, res) => {
    try {
        const userReports = await Reports.find({ reportedFor: "user" }).populate({
            path: "targetId",
            select: "email role name profilePic isBanned"

        })
        if (!userReports) {
            return res.status(409).json({
                success: false,
                message: "there is no review reports"
            })
        }

        return res.status(200).json({
            success: true,
            message: "successfully fetched the user reports",
            userReports
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.getCommentReports = async (req, res) => {
    try {
        const commentReports = await Reports.find({ reportedFor: "comment" }).populate({
            path: "targetId",
            populate: [
                { path: "user", select: "name profilePic email" },
                { path: "repliedTo", select: "name" }
            ]
        });
        if (!commentReports) {
            return res.status(409).json({
                success: false,
                message: "there is no review reports"
            })
        }

        return res.status(200).json({
            success: true,
            message: "successfully fetched the comment reports",
            commentReports
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.flagComment = async (req, res) => {
    try {


        const { reportId, reportStatus, flag } = req.body;

        if (!reportId) {
            return res.status(409).json({
                success: false,
                message: "there is no  report id"
            })
        }

        const report = await Reports.findByIdAndUpdate(reportId,
            { status: reportStatus },
            { returnDocument: "after" }
        ).populate("targetId");

        const commentId = report.targetId._id;
        await Comment.findByIdAndUpdate(commentId, { isflagged: flag });

        return res.status(200).json({
            success: true,
            message: "successfully updated the user report",
            reportId,
            reportStatus,
            flag
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
exports.flagReview = async (req, res) => {
    try {


        const { reportId, reportStatus, flag } = req.body;

        if (!reportId) {
            return res.status(409).json({
                success: false,
                message: "there is no  report id"
            })
        }

        const report = await Reports.findByIdAndUpdate(reportId,
            { status: reportStatus },
            { returnDocument: "after" }
        ).populate("targetId");

        const reviewId = report.targetId._id;
        await Review.findByIdAndUpdate(reviewId, { isflagged: flag });

        return res.status(200).json({
            success: true,
            message: "successfully updated the user report",
            reportId,
            reportStatus,
            flag
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.handleUserban = async (req, res) => {
    try {


        const { reportId, reportStatus, ban } = req.body;

        if (!reportId) {
            return res.status(409).json({
                success: false,
                message: "there is no  report id"
            })
        }

        const report = await Reports.findByIdAndUpdate(reportId,
            { status: reportStatus },
            { returnDocument: "after" }
        ).populate("targetId");

        const userId = report.targetId._id;
        await User.findByIdAndUpdate(userId, {isBanned:ban});

        return res.status(200).json({
            success: true,
            message: "successfully updated the user report",
            reportId,
            reportStatus,
            ban
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}