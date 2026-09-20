const express = require("express");
const { getReviews, createReview, updateReview, deleteReview, likeReview, deleteReviewLike, getUserReviews, getReportPreview, getReportUsersReview } = require("../controllers/reviewController");
const { authenticate, authorization } = require("../middlewares/auth");
const router = express.Router();


router.route("/get/reviews").get(getReviews);
router.route("/create").post(authenticate,createReview);
router.route("/update").patch(authenticate,updateReview);
router.route("/delete").delete(authenticate,deleteReview);
router.route("/add/like").patch(authenticate,likeReview);
router.route("/delete/like").patch(authenticate,deleteReviewLike);
router.route("/get/user/reviews").get(authenticate,getUserReviews);
router.route("/get/review/preview").get(authenticate,getReportPreview);
router.route("/report-user/reviews").get(authenticate,authorization("admin"),getReportUsersReview);










module.exports = router;