const jwt = require("jsonwebtoken")

exports.authenticate = async (req,res,next)=>{
    try {
     
       const token = req.cookies.token;
        if(!token){
            res.status(200).json({
                success:false,
                message:"token not found"
            })
        }
        
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.userData = decoded;
        
        next();

        
    } catch (error) {
        res.status(500).json({
            success:true,
            message:error.message
        })
    }
}