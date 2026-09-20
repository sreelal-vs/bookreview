const express = require("express");
const { userRegister, userLogin, getCurrentUser, userLogOut, editUser, getAllUsers, updateUserRole, passwordChange } = require("../controllers/userController");
const {authenticate} = require("../middlewares/auth")
const upload = require("../middlewares/fileuploader")


const router = express.Router();

router.route('/register').post(upload.single("profilePic"),userRegister);
router.route('/all').get(getAllUsers);

router.route('/login').post(userLogin);
router.route('/logout').post(userLogOut);
router.route('/me').get(getCurrentUser);
router.route('/role').patch(authenticate,updateUserRole);
router.route('/password/change').patch(authenticate,passwordChange);

router.route('/edit').patch(authenticate,upload.single("profilePic"),editUser);


module.exports = router;