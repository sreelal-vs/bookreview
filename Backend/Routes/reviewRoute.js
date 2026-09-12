const express = require("express");
const { getReviews, createReview, updateReview, deleteReview, likeReview, deleteReviewLike, getUserReviews } = require("../controllers/reviewController");
const { authenticate } = require("../middlewares/auth");
const router = express.Router();


router.route("/get/reviews").get(getReviews);
router.route("/create").post(authenticate,createReview);
router.route("/update").patch(authenticate,updateReview);
router.route("/delete").delete(authenticate,deleteReview);
router.route("/add/like").patch(authenticate,likeReview);
router.route("/delete/like").patch(authenticate,deleteReviewLike);
router.route("/get/user/reviews").get(authenticate,getUserReviews);








module.exports = router;