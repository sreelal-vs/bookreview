const jwt = require("jsonwebtoken")

exports.authenticate = async (req,res,next)=>{
    try {
     
       const token = req.cookies.token;
        if(!token){
            return res.status(404).json({
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

exports.authorization = (...roles) =>{
    return (req,res,next)=>{
        try {
            const {userRole} = req.userData;
        if(roles.includes(userRole)){
            next()
        }
        else{
            return res.status(401).json({
                success:false,
                message:"unauthorized route"
            })
        }
        } catch (error) {
             return res.status(500).json({
                success:false,
                message:error.message
            })
        }
    }
}