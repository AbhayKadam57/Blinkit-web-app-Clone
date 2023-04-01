const User = require("../models/User.js");

const GetAllUser = async (req, res) => {
  try {
    const users = await User.find({});

    res.status(200).json(users);
  } catch (e) {
    res.json(500).json("Something went wrong...");
  }
};

module.exports = { GetAllUser };
