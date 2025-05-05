// routes/sellerRoutes.js
const express = require("express");
const router = express.Router();
const { getSellerOrders } = require("../controllers/SellerOrderController");

router.get("/orders/:userId", getSellerOrders);

module.exports = router;
