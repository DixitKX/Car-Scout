// controllers/compareController.js
const Compare = require("../models/CompareModel");

exports.addToCompare = async (req, res) => {
  const { userId, bikeId } = req.body;
  try {
    let compare = await Compare.findOne({ userId });

    if (!compare) {
      compare = new Compare({ userId, bikeIds: [bikeId] });
    } else {
      if (!compare.bikeIds.includes(bikeId)) {
        compare.bikeIds.push(bikeId);
      }
    }

    await compare.save();
    res.status(200).json({ success: true, message: "Bike added to compare", compare });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

exports.getCompareBikes = async (req, res) => {
  const { userId } = req.params;
  try {
    const compare = await Compare.findOne({ userId }).populate("bikeIds");
    if (!compare) {
      return res.status(404).json({ success: false, message: "No compare list found" });
    }
    res.status(200).json({ success: true, bikes: compare.bikeIds });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

exports.removeFromCompare = async (req, res) => {
  const { userId, bikeId } = req.body;
  try {
    const compare = await Compare.findOne({ userId });
    if (!compare) return res.status(404).json({ success: false, message: "No compare list found" });

    compare.bikeIds = compare.bikeIds.filter((id) => id.toString() !== bikeId);
    await compare.save();

    res.status(200).json({ success: true, message: "Bike removed from compare", compare });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};
