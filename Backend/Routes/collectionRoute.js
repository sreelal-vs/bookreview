const express = require("express");
const { authenticate } = require("../middlewares/auth");
const {  updateFavourite, getFavouriteBooks, createBookCollection, getBookCollections, deleteBookCollection, addItemCollection, getCurrentCollection } = require("../controllers/collectionController");

const router = express.Router();


router.route("/favourite-update").patch(authenticate,updateFavourite)
router.route("/get/current/collection").get(authenticate,getCurrentCollection)

router.route("/add/item/collection").patch(authenticate,addItemCollection)
router.route("/delete/item/collection").patch(authenticate,addItemCollection)


router.route("/get/favourites").get(authenticate,getFavouriteBooks);
router.route("/create").put(authenticate,createBookCollection)
router.route("/delete").delete(authenticate,deleteBookCollection)

router.route("/get/collections").get(authenticate,getBookCollections)



module.exports = router;