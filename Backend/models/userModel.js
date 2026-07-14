const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"full name is required"],

    },
    email:{
        type:String,
        unique:[true,"This email already exists"],
        required:[true,"please enter email"]
    },
    password:{
        type:String,
        required:[true,"please enter  password"],
        select:false
    },
    role:{
        type:String,
        enum:["user","admin"],
        
    },
    isBanned:{
        type:Boolean,
        default:false
    }

})


const User = mongoose.model('user',userSchema);

userSchema.pre("save",async function (next) {
    if(!this.isModified("password"))return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
})
module.exports = User;


