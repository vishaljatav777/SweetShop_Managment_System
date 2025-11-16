const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    sweetName: String,
    price: Number,
    quantity: Number,
    total: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
