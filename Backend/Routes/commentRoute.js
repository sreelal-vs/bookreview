const express = require("express");
const { authenticate } = require("../middlewares/auth");
const { getComments, addComment, deleteComment, EditComment } = require("../controllers/commentController");

const router = express.Router();


router.route("/add").put(authenticate,addComment)
router.route("/getAll").get(authenticate,getComments)
router.route("/update").patch(authenticate,EditComment)
router.route("/delete").delete(authenticate,deleteComment)





module.exports = router;