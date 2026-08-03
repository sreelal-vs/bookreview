const express = require("express");
const { userRegister, userLogin, getCurrentUser, userLogOut } = require("../controllers/userController");
const upload = require("../middlewares/fileuploader")


const router = express.Router();

router.route('/register').post(upload.single("profilePic"),userRegister);
router.route('/login').post(userLogin);
router.route('/logout').post(userLogOut);
router.route('/me').get(getCurrentUser);

module.exports = router;