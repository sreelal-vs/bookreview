const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    role:{
        type:String,
        enum:["user","admin"],
        required:true,       
    },
    isBanned:{
        type:Boolean,
        default:false
    }

})


const User = mongoose.model('user',userSchema);
module.exports = User;


