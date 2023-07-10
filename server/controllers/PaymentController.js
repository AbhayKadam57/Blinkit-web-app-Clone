const Razorpay = require("razorpay");
const crypto = require("crypto");

const Order = (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    instance.orders.create(options, (err, order) => {
      if (err) {
        res.status(401).json("something went wrong");
      }

      res.status(200).json({ data: order });
    });
  } catch (e) {
    res.status(401).json({ message: "Internal Server error...." });
  }
};

const verifyOrder = (req, res) => {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const signature = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(signature)
      .digest("hex");

    if (razorpay_signature === expectedSignature) {
      // Payment is valid, do something
      res.status(200).send("OK");
    } else {
      // Payment is not valid, do something else
      res.status(400).send("Bad Request");
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server error..." });
  }
};

module.exports = { Order, verifyOrder };
