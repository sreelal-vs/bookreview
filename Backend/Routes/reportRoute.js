const express  = require("express");
const { authenticate, authorization } = require("../middlewares/auth");
const { addReport, getReviewReports, getUserReports, getCommentReports, flagComment, flagReview, handleUserban } = require("../controllers/reportController");

const router = express.Router();

router.route('/add').post(authenticate,addReport);

router.route('/review').get(authenticate,authorization("admin"),getReviewReports);
router.route('/user').get(authenticate,authorization("admin"),getUserReports);
router.route('/comment').get(authenticate,authorization("admin"),getCommentReports);
router.route('/flag/comment').patch(authenticate,authorization("admin"),flagComment);
router.route('/flag/review').patch(authenticate,authorization("admin"),flagReview);
router.route('/ban/user').patch(authenticate,authorization("admin"),handleUserban);








module.exports = router;