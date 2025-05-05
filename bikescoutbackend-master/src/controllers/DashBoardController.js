const Bike = require("../models/BikeModel");
const Order = require("../models/OrderModel");


exports.getSellerBikeStats = async (req, res) => {
    try {
      const userId = req.params.userId;
  
      // 1. Get bikes listed by this seller
      const bikes = await Bike.find({ userId });
      const bikeIds = bikes.map(b => b._id);
  
      console.log("SellerID:", userId);
      console.log("Found bikes:", bikes.length);
      console.log("Bike IDs:", bikeIds);
  
      // 2. Find orders for these bikes
      const orders = await Order.find({ bikeId: { $in: bikeIds } });
      console.log("Matching orders:", orders.length);
  
      // 3. Logging paymentStatus of each order
      orders.forEach(order => {
        console.log(`Order: ${order._id}, Bike: ${order.bikeId}, Payment Status: ${order.paymentStatus}`);
      });
  
      // 4. Count values
      const totalListed = bikes.length;
      const totalSold = orders.filter(order => order.paymentStatus?.toLowerCase() === "created").length;
      const ordersPending = orders.filter(order => order.paymentStatus?.toLowerCase() === "created").length;
  
      console.log("Total Listed:", totalListed);
      console.log("Total Sold:", totalSold);
      console.log("Orders Pending:", ordersPending);
  
      return res.status(200).json({
        totalListed,
        totalSold,
        ordersPending
      });
  
    } catch (err) {
      console.error("Stats error:", err);
      res.status(500).json({ message: "Server error" });
    }
  };

exports.getTopSellingBikes = async (req, res) => {
  try {
    const { userId } = req.params;

    const bikes = await Bike.find({ userId });

    const topSelling = await Promise.all(
      bikes.map(async bike => {
        const count = await Order.countDocuments({ bikeId: bike._id, paymentStatus: "created" });
        return {
          _id: bike._id,
          model: bike.model,
          bikeURL: bike.bikeURL,
          soldCount: count
        };
      })
    );

    

    const sortedTop = topSelling.sort((a, b) => b.soldCount - a.soldCount).slice(0, 3);

    res.status(200).json(sortedTop);
  } catch (error) {
    res.status(500).json({ message: "Error fetching top selling bikes", error });
  }
};
