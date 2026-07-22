const express = require("express");
const { userRegister } = require("../controllers/userController");
const upload = require("../middlewares/fileuploader")


const router = express.Router();

router.route('/user-register').post(upload.single("profilePic"),userRegister);



module.exports = router;