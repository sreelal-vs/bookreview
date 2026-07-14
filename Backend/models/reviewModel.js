const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        book:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Book",
            required:true
        },
        rating:{
            type:Number,
            min:1,
            max:5,
            required:true
        },
        content:{
            type:String,
            required:true,
            trim:true,
        },
        likes:{
            type:[mongoose.Schema.Types.ObjectId],
            default:[]

        },
        ishidden:{
            type:Boolean,
            default:false
        },
       
},{
    timestamps:true
});

const Review = mongoose.model("review",reviewSchema)

module.exports = Review;