const Bike = require("../models/BikeModel");
const User = require("../models/UserModel");
const sendEmail = require("../utils/MailUtil")
// Get all bikes with seller info
exports.getAllBikes = async (req, res) => {
  try {
    const bikes = await Bike.find()
      .populate("userId", "Username email")
      .sort({ createdAt: -1 });

    res.json(bikes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching bikes", error: err });
  }
};

// Approve bike (uses variant field as a status placeholder)
exports.approveBike = async (req, res) => {
  try {
    const { bikeId } = req.body;
    const updatedBike = await Bike.findByIdAndUpdate(
      bikeId,
      { variant: "Approved" },
      { new: true }
    );
    res.json(updatedBike);
  } catch (err) {
    res.status(500).json({ message: "Error approving bike", error: err });
  }
};

// Reject bike (uses variant field)
exports.rejectBike = async (req, res) => {
    try {
      const { bikeId } = req.body;
      const bike = await Bike.findById(bikeId).populate("userId");
  
      if (!bike) return res.status(404).json({ message: "Bike not found" });
  
      bike.isVisible = false;
      await bike.save();
  
      // Send email to seller
      if (bike.userId && bike.userId.email) {
        await sendEmail.sendingMail({
          to: bike.userId.email,
          subject: "Bike Listing Rejected",
          text: `Hi ${bike.userId.Username},\n\nYour listing for ${bike.brand} ${bike.model} has been rejected by the admin.\n\nRegards,\nBikeScout Team`,
        });
      }
  
      res.status(200).json({ message: "Bike rejected and seller notified" });
    } catch (err) {
      res.status(500).json({ message: "Error rejecting bike", error: err.message });
    }
  };

  exports.unrejectBike = async (req, res) => {
  try {
    const { bikeId } = req.body;
    const bike = await Bike.findById(bikeId);
    if (!bike) return res.status(404).json({ message: "Bike not found" });

    bike.isVisible = true;
    await bike.save();

    res.status(200).json({ message: "Bike is now visible to buyers" });
  } catch (err) {
    res.status(500).json({ message: "Error unrejecting bike" });
  }
};
// Delete bike
exports.deleteBike = async (req, res) => {
  try {
    const { bikeId } = req.params;
    await Bike.findByIdAndDelete(bikeId);
    res.json({ message: "Bike deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting bike", error: err });
  }
};
