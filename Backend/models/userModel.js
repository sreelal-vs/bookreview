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
    profilePic:{
        type:String,
        required:false
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
        
    },
    isBanned:{
        type:Boolean,
        default:false
    }

})

userSchema.pre("save",async function () {
    if(!this.isModified("password")) return
    this.password = await bcrypt.hash(this.password,10);
    
})
const User = mongoose.model('user',userSchema);


module.exports = User;


