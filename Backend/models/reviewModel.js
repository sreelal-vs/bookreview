const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true
        },
        book:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"book",
            required:true
        },
        rating:{
            type:Number,
            min:0,
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