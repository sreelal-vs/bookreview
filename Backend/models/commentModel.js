const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    review:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"review",
        required:true
    },
    content:{
        type:String,
        required:true
    },
    isPublic:{
        type:Boolean,
        default:true
    },
    isEdited:{
        type:Boolean,
        default:false
    },
    repliedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    repliedFor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"comment",
        default:null
    }
},{
    timestamps:true
}
)

const Comment = mongoose.model("comment",commentSchema);
module.exports = Comment;