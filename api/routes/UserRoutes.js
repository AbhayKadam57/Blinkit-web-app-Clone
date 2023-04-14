const router = require("express").Router();
const { GetAllUser, GetUser } = require("../controllers/UserInfo.js");
const { verifyTokenAndUser } = require("../Util/VerifyToken.js");

//Get All users
router.get("/getAllusers/:id", verifyTokenAndUser, GetAllUser);

router.get("/getUser/:id", verifyTokenAndUser, GetUser);

module.exports = router;
