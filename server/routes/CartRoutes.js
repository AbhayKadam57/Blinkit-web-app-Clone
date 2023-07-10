const router = require("express").Router();
const { AddCart, GetCart } = require("../controllers/CartController.js");
const { verifyTokenAndUser } = require("../Util/VerifyToken.js");

router.post("/addtocart/:id", verifyTokenAndUser, AddCart);

router.get("/getcart", verifyTokenAndUser, GetCart);

module.exports = router;
