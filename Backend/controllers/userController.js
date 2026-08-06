const User = require("../models/userModel");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.userRegister = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        const profilePic = req.file?.path;


        if (!fullname || !email || !password) {

            return res.status(400).json({
                success: false,
                message: "User didn't enter all data",
            })
        }



        const userData = {
            name: fullname,
            email,
            password,
            profilePic
        }

        const user = await User.create(userData);

        res.status(200).json({
            success: true,
            message: "User registered successfully",
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }

}
exports.userLogin = async (req, res) => {
    try {


        const { email, password } = req.body
        if (!email) {
            return res.status(400).json({
                success: false,
                field: "email",
                message: "Email is required"
            })
        }
        if (!password) {
            return res.status(400).json({
                success: false,
                field: "password",
                message: "password is required"
            })
        }
        const user = await User.findOne({ email }).select("+password");


        if (!user) {
            return res.status(404).json({
                success: false,
                field: "email",
                message: "email does not exists"
            })
        }

        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
            return res.status(401).json({
                success: false,
                field: "password",
                message: "Password does not match"
            })
        }
        const userData = {
            userId: user._id,
            userRole: user.role,

        }
        const safeUser = {
            id: user._id,
            name: user.name,
            email: user.email,
        }
        const token = jwt.sign(userData, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });

        res.status(200).cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        }).json({
            success: true,
            message: "Login successfully",
            user: safeUser
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}
exports.userLogOut =async (req,res)=>{
    try {
        res.status(200).clearCookie("token").json({
            success:true,
            message:"User Logout successfully"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            error:error.message
        })
    }
}
exports.getCurrentUser = async (req, res) => {
    try {


        const token = req.cookies.token;
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token not found"
            })
        }
        
        

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded.userId);
        res.status(200).json({
            success: true,
            message: "Authorized",
            user
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}
