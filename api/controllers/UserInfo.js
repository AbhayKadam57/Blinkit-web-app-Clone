const User = require("../models/User.js");

const GetAllUser = async (req, res) => {
  try {
    const users = await User.find({});

    res.status(200).json(users);
  } catch (e) {
    res.json(500).json("Something went wrong...");
  }
};

const GetUser = async (req, res) => {
  const id = req.body.id;

  try {
    const user = await User.findOne({ _id: id });

    res.status(200).json(user);
  } catch (e) {
    console.log(e);
  }
};

module.exports = { GetAllUser, GetUser };
