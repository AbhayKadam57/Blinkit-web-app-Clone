const Order = require("../models/Order.js");

const CreateOrder = async (req, res) => {
  try {
    const NewOrder = new Order(req.body);

    await NewOrder.save();

    res.status(200).json(NewOrder);
  } catch (e) {
    res.status(401).json("Something went wrong...");
  }
};

const GetOrders = async (req, res) => {
  const userId = req.params.id;

  try {
    const order = await Order.find({ userId: userId }).sort({ createdAt: -1 });

    res.status(200).json(order);
  } catch (e) {
    res.status(401).json("Something went wrong...");
  }
};

module.exports = { CreateOrder, GetOrders };
