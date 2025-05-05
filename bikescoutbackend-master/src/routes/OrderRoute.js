const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/OrderController");

router.post("/create-order", paymentController.createOrder);

router.get('/user/:userId', paymentController.getOrdersByUser);

router.get('/seller/orders/:userId', paymentController.getSellerOrders);



module.exports = router;
