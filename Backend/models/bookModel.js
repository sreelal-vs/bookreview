const mongoose = require("mongoose");


const bookSchema = new mongoose.Schema({
    openLibraryid:{
        type:String,
        unique:true,
        required:[true, "id not found"]
    },
    title:{
        type:String,
        index:true,
        required:[true,"title not found"]
    },
    author:{
        type:String,
        index:true,
        required:[true,"author name not found"]
    },
    coverpic:{
        type:String,
        required:[true,"cover picture not found"]
    },
    description:{
        type:String,
        required:[true,"not content for description is found"]
    },
    avgrating:{
        type:Number,
        max:5,
        required:[true,"average rating not found"]
    }
})

const Book = mongoose.model("book",bookSchema);
module.exports = Book;