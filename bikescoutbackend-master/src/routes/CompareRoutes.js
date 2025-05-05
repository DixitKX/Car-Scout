// routes/compareRoutes.js
const express = require("express");
const router = express.Router();
const compareController = require("../controllers/CompareController");

router.post("/add", compareController.addToCompare);
router.get("/user/:userId", compareController.getCompareBikes);
router.post("/remove", compareController.removeFromCompare);

module.exports = router;
