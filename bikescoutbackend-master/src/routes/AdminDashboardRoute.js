const express = require("express");
const router = express.Router();
const {
  getAdminOverview,
  getMonthlyUsers,
  getMonthlyBikes,
  getMonthlyRevenue,
} = require("../controllers/AdminDashboardController");

router.get("/dashboard/overview", getAdminOverview);
router.get("/dashboard/monthly-users", getMonthlyUsers);
router.get("/dashboard/monthly-bikes", getMonthlyBikes);
router.get("/dashboard/monthly-revenue", getMonthlyRevenue);

module.exports = router;
