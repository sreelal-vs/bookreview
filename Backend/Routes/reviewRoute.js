const express = require("express");
const { getReviews, createReview, updateReview, deleteReview } = require("../controllers/reviewController");
const { authenticate } = require("../middlewares/auth");
const router = express.Router();


router.route("/get/reviews").get(getReviews);
router.route("/create").post(authenticate,createReview);
router.route("/update").patch(authenticate,updateReview);
router.route("/delete").delete(authenticate,deleteReview);





module.exports = router;