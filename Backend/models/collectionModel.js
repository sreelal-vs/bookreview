const mongoose = require("mongoose");


const collectionScheme = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    collectionName:{
        type:String,
        required:true
    },
    books:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Book"       
    }]
})

const Collections = mongoose.model("Collection",collectionScheme);
module.exports = Collections;