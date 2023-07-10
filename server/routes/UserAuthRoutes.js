const router = require("express").Router();
const {
  Register,
  Login,
  RefreshToken,
  Logout,
  UpdateAddresses,
  GetAddress,
} = require("../controllers/UserAuth.js");
const { verifyTokenAndUser } = require("../Util/VerifyToken.js");

//Register User
router.post("/register", Register);

//Login User
router.post("/login", Login);

//RefreshToken

router.post("/refreshToken", RefreshToken);

//Logout User

router.post("/logout/:id", verifyTokenAndUser, Logout);

//Update Adddress

router.put("/addAddress/:id", verifyTokenAndUser, UpdateAddresses);

//Get Address

router.get("/getAddress/:id", verifyTokenAndUser, GetAddress);

module.exports = router;
