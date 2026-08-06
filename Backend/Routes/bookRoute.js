const express = require("express");
const { addBooks } = require("../controllers/bookController");

const router = express.Router();


router.route('/results')
router.route('/addbooks').post(addBooks)

module.exports = router;