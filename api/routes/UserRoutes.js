const router = require("express").Router();
const { GetAllUser } = require("../controllers/UserInfo.js");
const { verifyTokenAndUser } = require("../Util/VerifyToken.js");

//Get All users
router.get("/getAllusers/:id", verifyTokenAndUser, GetAllUser);

module.exports = router;
