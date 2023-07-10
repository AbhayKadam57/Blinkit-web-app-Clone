const Cart = require("../models/Cart.js");

const AddCart = async (req, res) => {
  const userId = req.params.id;

  const user = await Cart.findOne({ userId: userId });

  try {
    if (!user) {
      const NewCart = new Cart(req.body);

      await NewCart.save();

      return res.status(200).json(NewCart);
    } else {
      const UpdatedCart = await Cart.findOneAndUpdate(
        { userId: userId },
        { $set: req.body },
        { new: true }
      );

      return res.status(200).json(UpdatedCart);
    }
  } catch (e) {
    res.status(401).json("Something went wrong...");
  }
};

const GetCart = async (req, res) => {
  const userId = req.params.id;

  try {
    const ExistedCart = await Cart.findOne(userId);

    res.status(200).json(ExistedCart);
  } catch (e) {
    res.status(401).json("Something went wrong...");
  }
};

module.exports = { AddCart, GetCart };
