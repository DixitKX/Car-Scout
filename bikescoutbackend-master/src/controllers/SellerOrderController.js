// controllers/sellerOrderController.js
const Order = require("../models/OrderModel");
const Bike = require("../models/BikeModel");
const User = require("../models/UserModel");

const getSellerOrders = async (req, res) => {
  try {
    const sellerUserId = req.params.userId;

    // 1. Get all bikes listed by this seller
    const sellerBikes = await Bike.find({ userId: sellerUserId }).select("_id");

    const bikeIds = sellerBikes.map(bike => bike._id);

    // 2. Find all orders for those bikes
    const orders = await Order.find({ bikeId: { $in: bikeIds } })
      .populate({
        path: "bikeId",
        select: "model brand price",
      })
      .populate({
        path: "userId", // Buyer
        select: "Username email",
      });

    // 3. Format orders
    const formattedOrders = orders.map(order => ({
      orderId: order._id,
      bike: {
        model: order.bikeId?.model,
        brand: order.bikeId?.brand,
        price: order.bikeId?.price,
      },
      buyer: {
        name: order.userId?.Username,
        email: order.userId?.email,
      },
      status: order.paymentStatus,
      createdAt: order.createdAt,
    }));

    res.status(200).json({ success: true, orders: formattedOrders });
  } catch (error) {
    console.error("Error fetching seller orders:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  getSellerOrders,
};
