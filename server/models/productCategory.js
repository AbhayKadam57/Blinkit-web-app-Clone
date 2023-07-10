const mongoose = require("mongoose");

const ProductCategorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("productCategories", ProductCategorySchema);
