const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/OrderModel");
const User = require("../models/UserModel");
const Bike = require("../models/BikeModel");


const instance = new Razorpay({
    key_id: "rzp_test_A00Xot9pYdQcbk",
    key_secret: "WIy2Dgr1XhEEDJsCzROTIkjp",
});

// Create order
exports.createOrder = async (req, res) => {
    try {
      const { amount, userId, bikeId } = req.body;

         console.log("🟢 Incoming order data:", { amount, userId, bikeId }); 
  
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      const razorpayOrder = await instance.orders.create({
        amount: amount * 100,
        currency: "INR",
        receipt: `rcptid_${Date.now()}`,
      });
  
      const newOrder = new Order({
        userId,
        bikeId, // ✅ Save bikeId here
        amount,
        razorpayOrderId: razorpayOrder.id,
        status: "created",
      });
  
      await newOrder.save();
  
      res.status(200).json({
        message: "Order created successfully",
        order: razorpayOrder,
        user: {
          Username: user.Username,
          email: user.email,
          phone: user.Phonenumber,
        }
      });
  
    } catch (err) {
      console.error("❌ Order creation error:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  




// Get orders by user ID
exports.getOrdersByUser = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const orders = await Order.find({ userId }).populate("bikeId");
      res.status(200).json({ success: true, orders });
    } catch (error) {
      console.error("Error fetching user orders:", error);
      res.status(500).json({ success: false, message: "Error fetching orders" });
    }
  };
  

 exports.getSellerOrders = async (req, res) => {
    const { userId } = req.params;
    try {
      const orders = await Order.find({ userId })
        .populate("bikeId", "model brand price bikeURL") // populate bike details
        .sort({ createdAt: -1 });
  
      res.status(200).json({ count: orders.length, orders });
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch seller orders" });
    }
  };