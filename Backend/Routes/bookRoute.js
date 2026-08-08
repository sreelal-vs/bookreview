const express = require("express");
const { addBooks, bookResults } = require("../controllers/bookController");

const router = express.Router();


router.route('/results').get(bookResults)
router.route('/addBooks').post(addBooks)



module.exports = router;