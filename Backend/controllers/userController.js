const User = require("../models/userModel");

exports.userRegister = async (req,res)=>{
   try {
    const {name,email,password} = req.body;
    const profilePic = req.file?.path;
    
    
    if(!name||!email||!password){
        
        return res.status(400).json({
        success:false,
        message:"User didn't enter all data",      
    })
    }

    

    const userData = {
        name,
        email,
        password,
        profilePic
    }

    const user = await User.create(userData);

    res.status(200).json({
        success:true,
        message:"User registered successfully",
        user
    })
   } catch (error) {
      res.status(500).json({
        success:false,
        error:error.message
      })
   }
   
}
