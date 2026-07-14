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
    books:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Book"
    }],
    isPublic:{
        type:Boolean,
        default:false
    }
})

const Comment = mongoose.model("comment",commentSchema);
module.exports = Comment;