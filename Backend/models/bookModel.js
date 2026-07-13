const mongoose = require("mongoose");


const bookSchema = mongoose.Schema({
    openLibraryid:{
        type:String,
        unique:true,
        required:true
    },
    title:{
        type:String,
        index:true,
        required:true
    },
    author:{
        type:String,
        index:true,
        required:true
    },
    coverpic:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    avgrating:{
        type:Number,
        max:5,
        required:true
    }
})

const Book = mongoose.model("book",bookSchema);
module.exports = Book;