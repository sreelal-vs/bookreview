const express = require("express");
const { authenticate ,authorization} = require("../middlewares/auth");
const { getComments, addComment, deleteComment, EditComment, getCommentPreview, getReportUserComments } = require("../controllers/commentController");

const router = express.Router();


router.route("/add").put(authenticate,addComment)
router.route("/getAll").get(authenticate,getComments)
router.route("/update").patch(authenticate,EditComment)
router.route("/delete").delete(authenticate,deleteComment)
router.route("/get/preview").get(authenticate,getCommentPreview);
router.route("/report-user/comments").get(authenticate,authorization("admin"),getReportUserComments);





module.exports = router;