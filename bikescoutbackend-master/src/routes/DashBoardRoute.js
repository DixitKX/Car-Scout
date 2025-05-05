const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/DashBoardController");

router.get("/seller/stats/:userId", dashboardController.getSellerBikeStats);
router.get("/seller/top-selling/:userId", dashboardController.getTopSellingBikes);

module.exports = router;
