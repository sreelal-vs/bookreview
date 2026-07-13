const mongoose = require("mongoose");

const readingstatusSchema = mongoose.Schema({
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
    status:{
        type:String,
        enum:["reading","want","finished"],
        required:true
    },
    progress:{
        type:Number,
        max:100,
        default:0
    }
})

const ReadingStatus = mongoose.model("readingstatus",readingstatusSchema);
module.exports = ReadingStatus;