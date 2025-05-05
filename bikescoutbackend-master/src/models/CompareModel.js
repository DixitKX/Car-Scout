// models/compareModel.js
const mongoose = require("mongoose");

const compareSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  bikeId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bike",
    }
  ]
}, { timestamps: true });

module.exports = mongoose.models.Compare || mongoose.model("Compare", compareSchema);
