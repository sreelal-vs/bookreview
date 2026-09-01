const express = require("express");
const { authenticate } = require("../middlewares/auth");
const { getFavourite, updateFavourite, getFavouriteBooks, createBookCollection } = require("../controllers/collectionController");

const router = express.Router();


// router.route("/favourites").get(authenticate,getFavourite);
router.route("/favourite-update").patch(authenticate,updateFavourite)
router.route("/get/favourites").get(authenticate,getFavouriteBooks);
router.route("/create").put(authenticate,createBookCollection)


module.exports = router;