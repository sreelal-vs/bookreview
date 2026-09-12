const Comment = require("../models/commentModel");

exports.getComments = async (req, res) => {
    try {
        const { reviewId } = req.query;

        if (!reviewId) {
            return res.status(404).json({
                successs: false,
                message: "review id not found"
            })
        }

        const comments = await Comment.find({ review: reviewId, isPublic: true }).populate(["user", "repliedTo"]);
        if (!reviewId) {
            return res.status(200).json({
                successs: true,
                message: "there is no comments for this review"
            })
        }
        return res.status(200).json({
            successs: true,
            message: "successfuly fetched the comments",
            comments
        })
    } catch (error) {
        return res.status(500).json({
            successs: false,
            message: error.message
        })
    }
}

exports.addComment = async (req, res) => {
    try {
        const { reviewId, content, repliedTo, repliedFor } = req.body;


        const { userId } = req.userData;
        if (!reviewId) {
            return res.status(404).json({
                successs: false,
                message: "review id not found"
            })
        }
        let comment
        if (repliedFor) {
            comment = await Comment.create({
                review: reviewId,
                user: userId,
                content,
                repliedTo,
                repliedFor
            })
        }
        else {
            comment = await Comment.create({
                review: reviewId,
                user: userId,
                content,
                repliedTo
            })
        }
        const populatedComment = await comment
            .populate(["user", "repliedTo"])

        if (!reviewId) {
            return res.status(200).json({
                successs: true,
                message: "there is no comments for this review"
            })
        }
        return res.status(200).json({
            successs: true,
            message: "successfuly fetched the comments",
            comment: populatedComment
        })
    } catch (error) {
        return res.status(500).json({
            successs: false,
            message: error.message
        })
    }
}
exports.EditComment  = async (req, res) => {
    try {
        const { commentId, content } = req.body;
        console.log();
        
        if (!content) {
            return res.status(404).json({
                successs: false,
                message: "there is no content available"
            })
        }
        if (!commentId) {
            return res.status(404).json({
                successs: false,
                message: "comment id error"
            })
        }
        const comment = await Comment.findByIdAndUpdate(commentId, {
            content:content,
            isEdited: true
        }, { returnDocument: "after" });

        return res.status(200).json({
            successs: true,
            message: "successfuly edited the comment",
            content:comment.content,
            commentId
        })
    } catch (error) {
        return res.status(500).json({
            successs: false,
            message: error.message
        })
    }
}
exports.deleteComment = async (req, res) => {
    try {
        const { commentId } = req.query;

        
        if (!commentId) {
            return res.status(200).json({
                successs: true,
                message: "there is no comment like this"
            })
        }
        const comment = await Comment.findByIdAndDelete(commentId);

        return res.status(200).json({
            successs: true,
            message: "successfuly deleted the comment",
            commentId
        })
    } catch (error) {
        return res.status(500).json({
            successs: false,
            message: error.message
        })
    }
}