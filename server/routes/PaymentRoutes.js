const router = require("express").Router();
const { Order, verifyOrder } = require("../controllers/PaymentController");
const { verifyTokenAndUser } = require("../Util/VerifyToken.js");

//Create Razorpay order

router.post("/create/:id", verifyTokenAndUser, Order);

//Verify order

router.post("/verify/:id", verifyTokenAndUser, verifyOrder);

module.exports = router;
