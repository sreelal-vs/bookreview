const express = require("express");
const { addBooks, bookResults, discoveryResults } = require("../controllers/bookController");

const router = express.Router();

router.route('/discovery/result').get(discoveryResults)
router.route('/results').get(bookResults)
router.route('/addBooks').post(addBooks)



module.exports = router;