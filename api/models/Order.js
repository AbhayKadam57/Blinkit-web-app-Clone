const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    products: {
      type: Array,
    },
    quantity: {
      type: Number,
    },
    amount: {
      type: Number,
    },
    status: {
      type: String,
      default: "pending",
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", OrderSchema);
