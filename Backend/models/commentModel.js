const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    review:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Review",
        required:true
    },
    comment:{
        
    },
    isPublic:{
        type:Boolean,
        default:true
    }
})

const Comment = mongoose.model("comment",commentSchema);
module.exports = Comment;