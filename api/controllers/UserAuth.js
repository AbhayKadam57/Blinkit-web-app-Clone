const User = require("../models/User.js");
const CryptoJs = require("crypto-js");
const JWT = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return JWT.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECERTE_KEY,
    { expiresIn: "30m" }
  );
};

const generateRefreshToken = (user) => {
  return JWT.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECERTE_KEY,
    { expiresIn: "1D" }
  );
};

const RefreshToken = async (req, res) => {
  try {
    const refreshToken = req.body.token;
    console.log(refreshToken);

    if (!refreshToken) {
      return res.status(401).json("Token is not missing...");
    }

    const user = await User.findOne({ refreshToken: refreshToken });

    if (!user) {
      return res.status(401).json("Token is Invalid...");
    }

    const NewAccessToken = generateAccessToken(user);

    const NewRefreshToken = generateRefreshToken(user);

    user.refreshToken = NewRefreshToken;

    await user.save();

    res.status(200).json({
      NewAccessToken: NewAccessToken,
      NewRefreshToken: NewRefreshToken,
    });
  } catch (err) {
    res.status(500).json(e);
  }
};

const Register = async (req, res) => {
  try {
    const newUser = await User({
      username: req.body.username,
      password: CryptoJs.AES.encrypt(
        req.body.password,
        process.env.SECERTE_KEY
      ),
      isAdmin: req.body.isAdmin,
    });

    let savedUser = await newUser.save();

    res.status(200).json(savedUser);
  } catch (err) {
    res.status(401).json(err);
  }
};

const Login = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  try {
    if (!user) {
      return res.status(401).json("Username is not found...");
    }

    const hashedPassword = CryptoJs.AES.decrypt(
      user.password,
      process.env.SECERTE_KEY
    );

    const OriginalPassword = hashedPassword.toString(CryptoJs.enc.Utf8);

    if (OriginalPassword !== req.body.password) {
      return res.status(403).json("Password is wrong...");
    }

    const accessToken = generateAccessToken(user);

    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;

    await user.save();

    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (e) {
    res.status(401).json(e);
  }
};

const Logout = async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.params.id });

    user.refreshToken = "";

    await user.save();

    res.json("User logout successfully");
  } catch (e) {
    res.send(401).json(e);
  }
};

const UpdateAddresses = async (req, res) => {
  const userId = req.params.id;

  try {
    const res = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { address: req.body } }
    );

    res.status(200).json("address added...");
  } catch (e) {
    res.status(401).json("something went wrong...");
  }
};

const GetAddress = async (req, res) => {
  const userId = req.params.id;

  try {
    const userAddress = await User.findOne(
      { _id: userId },
      { address: 1, _id: 0 }
    );

    res.status(200).json(userAddress);
  } catch (e) {
    res.status(401).json("something went wrong...");
  }
};

module.exports = {
  Register,
  Login,
  RefreshToken,
  Logout,
  UpdateAddresses,
  GetAddress,
};
