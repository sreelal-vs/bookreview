const mongoose = require("mongoose");

const readingListSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    book:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"book",
        required:true
    },
    status:{
        type:String,
        enum:["reading","want","finished"],
        required:true
    }
})

const ReadingList = mongoose.model("readingstatus",readingListSchema);
module.exports = ReadingList;