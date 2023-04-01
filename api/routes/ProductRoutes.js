const router = require("express").Router();
const {
  Registerproduct,
  GetProducts,
  AddProductCategories,
  GetAllCategory,
  SingleProduct,
  SortProduct,
  SearchProduct,
} = require("../controllers/productInfo.js");
const {
  verifyTokenAndUser,
  verifyTokenAndAdmin,
} = require("../Util/VerifyToken.js");

//Register product
router.post("/register/:id", verifyTokenAndAdmin, Registerproduct);

//Get All produts

router.get("/find", GetProducts);

//Add product category

router.post("/add-category/:id", verifyTokenAndAdmin, AddProductCategories);

//Get all product

router.get("/getallcategories", GetAllCategory);

//Get Single product

router.get("/getproduct/:id/:productId", verifyTokenAndUser, SingleProduct);

//rpoduct

router.get("/filter/:id", verifyTokenAndUser, SortProduct);

//Search Product

router.get("/search", SearchProduct);

module.exports = router;
