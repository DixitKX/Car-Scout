const express = require("express");
const router = express.Router();
const adminBikeController = require("../controllers/AdminBikeController");

router.get("/bikes", adminBikeController.getAllBikes);
router.put("/bikes/approve", adminBikeController.approveBike);
router.put("/bikes/reject", adminBikeController.rejectBike);
router.put("/bikes/unreject",adminBikeController.unrejectBike);
router.delete("/bikes/:bikeId", adminBikeController.deleteBike);

module.exports = router;
