const User = require("../models/userModel");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const Collections = require("../models/collectionModel");
const path = require("path");
const fs = require("fs")
exports.userRegister = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        const profilePic = req.file?.filename;
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
        await Collections.create({
            user: user._id,
            collectionName: "Favourites",
            books: []
        })
        res.status(200).json({
            success: true,
            message: "User registered successfully",
            user
        })
    } catch (error) {
        const mongoErr = error.cause || error;
        if (mongoErr.code === 11000) {
            const field = Object.keys(mongoErr.keyPattern)[0];
            return res.status(500).json({
                field,
                success: false,
                error: `${field} already exists`
            })
        }



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
            profilePic: user.profilePic ?? null,
            role:user.role
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
exports.userLogOut = async (req, res) => {
    try {
        res.status(200).clearCookie("token", {
            httpOnly: true,
            path: '/'
        }).json({
            success: true,
            message: "User Logout successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
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
exports.editUser = async (req, res) => {
    try {
        const { fullname ,prevPic} = req.body;
        const {userId} = req.userData;
        const profilePic = req.file?.filename;
        const filePath = path.join(__dirname,"..","Uploads",prevPic);
        await fs.unlink(filePath,((err)=>{
            if(err){
                console.error(err);
            }
        }))

        const updatedUser = await User.findByIdAndUpdate(userId,{
            name:fullname,
            profilePic,
        },{returnDocument:"after"});

        res.status(200).json({
            success: true,
            error: "user updated successfully",
            user:updatedUser
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }


}
exports.deletePrevPFP = async ( req,res)=>{
    try {
        console.log(req.body)
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}