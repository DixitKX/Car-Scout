const User = require("../models/UserModel");
const Bike = require("../models/BikeModel");
const Order = require("../models/OrderModel");

const getAdminOverview = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBikes = await Bike.countDocuments();
    const totalOrders = await Order.countDocuments();
    const orders = await Order.find();
    const totalRevenue = orders.reduce((sum, o) => sum + (o.amount || 0), 0);

    res.json({ totalUsers, totalBikes, totalOrders, totalRevenue });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch overview stats" });
  }
};

const getMonthlyUsers = async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $group: {
          _id: { $substr: ["$createdAt", 0, 7] },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const formatted = users.map(u => ({ month: u._id, count: u.count }));
    res.json(formatted);
  } catch {
    res.status(500).json({ error: "User chart error" });
  }
};

const getMonthlyBikes = async (req, res) => {
  try {
    const bikes = await Bike.aggregate([
      {
        $group: {
          _id: { $substr: ["$createdAt", 0, 7] },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const formatted = bikes.map(b => ({ month: b._id, count: b.count }));
    res.json(formatted);
  } catch {
    res.status(500).json({ error: "Bike chart error" });
  }
};

const getMonthlyRevenue = async (req, res) => {
  try {
    const revenue = await Order.aggregate([
      {
        $group: {
          _id: { $substr: ["$createdAt", 0, 7] },
          revenue: { $sum: "$amount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const formatted = revenue.map(r => ({ month: r._id, revenue: r.revenue }));
    res.json(formatted);
  } catch {
    res.status(500).json({ error: "Revenue chart error" });
  }
};

module.exports = {
  getAdminOverview,
  getMonthlyUsers,
  getMonthlyBikes,
  getMonthlyRevenue,
};
