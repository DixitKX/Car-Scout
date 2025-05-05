const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    bikeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bike",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        default: "INR",
    },
    razorpayOrderId: {
        type: String,
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ["created", "paid", "failed"],
        default: "created",
    },

    signature: {

       type: String,

    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("orders", orderSchema);
