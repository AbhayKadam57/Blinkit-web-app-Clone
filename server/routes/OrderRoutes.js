const router = require("express").Router();
const { CreateOrder, GetOrders } = require("../controllers/OrderController");
const { verifyTokenAndUser } = require("../Util/VerifyToken.js");

//create order
router.post("/create-order/:id", verifyTokenAndUser, CreateOrder);

//GetOrders

router.get("/getorders/:id", verifyTokenAndUser, GetOrders);

module.exports = router;
