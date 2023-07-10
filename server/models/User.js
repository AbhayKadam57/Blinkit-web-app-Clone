const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
    },
    isAdmin: {
      type: String,
      default: false,
    },
    refreshToken: {
      type: String,
    },
    address: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", UserSchema);
