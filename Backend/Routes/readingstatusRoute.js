const express = require("express");
const { authenticate } = require("../middlewares/auth");
const { getReadingList, updateStatus, getreadListBooks, deleteBook } = require("../controllers/readingstatusController");

const router = express.Router();


router.route("/getReadingList").get(authenticate,getReadingList)
router.route("/updateStatus").patch(authenticate,updateStatus)
router.route("/readlist-books").get(authenticate,getreadListBooks);
router.route("/readlist-book/delete/:id").get(authenticate,deleteBook);




module.exports = router;