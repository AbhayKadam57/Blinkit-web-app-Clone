const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
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
    total: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("cart", CartSchema);
