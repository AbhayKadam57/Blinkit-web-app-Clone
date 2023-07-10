const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    category: {
      type: String,
    },
    subcategory: {
      type: String,
    },
    images: {
      type: Array,
    },
    brand: {
      type: String,
    },
    key_feature: {
      type: String,
    },
    ingredeints: {
      type: String,
    },
    unit: {
      type: String,
    },
    shelf_life: {
      type: String,
    },
    manufacturer: {
      type: String,
    },
    marketed_by: {
      type: String,
    },
    fssi_licence: {
      type: Number,
    },
    country_of_origin: {
      type: String,
    },
    expire_date: {
      type: String,
    },
    seller: {
      type: String,
    },
    description: {
      type: String,
    },
    descliamer: {
      type: String,
    },
    price: {
      type: Number,
    },
    discount: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("products", ProductSchema);
