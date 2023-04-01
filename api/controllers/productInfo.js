const Product = require("../models/products.js");
const productCategories = require("../models/productCategory.js");

const Registerproduct = async (req, res) => {
  try {
    let newProduct = new Product(req.body);

    await newProduct.save();

    res.status(200).json(newProduct);
  } catch (e) {
    res.status(401).json("Something went wrong....");
  }
};

const GetProducts = async (req, res) => {
  const New = req.query.new; //true or false

  const category = req.query.category; // milk and pav,fruits and vegetables

  const subcategory = req.query.subcategory; // milk,pav

  const sort = req.query.sort;

  console.log(sort);

  console.log(subcategory);

  try {
    let products;

    if (New) {
      products = await Product.find().sort({ updatedAt: -1 });
    } else if (category) {
      products = await Product.find({ category: category });
    } else if (subcategory) {
      products = await Product.find({ subcategory: subcategory });
    } else {
      products = await Product.find().sort({ updatedAt: 1 });
    }

    res.json(products);
  } catch (e) {
    res.send(401).json("something went wrong...");
  }
};

const SingleProduct = async (req, res) => {
  const id = req.params.productId;

  console.log(id);

  try {
    let product = await Product.findOne({ _id: id });

    res.status(200).json(product);
  } catch (e) {
    res.status(401).json("Something went wrong...");
  }
};

const AddProductCategories = async (req, res) => {
  try {
    const NewCategory = new productCategories(req.body);

    await NewCategory.save();

    res.status(200).json(NewCategory);
  } catch (e) {
    res.status(401).json("Something went wrong...");
  }
};

const GetAllCategory = async (req, res) => {
  try {
    let GetAllCategories = await productCategories.find({});
    res.json(GetAllCategories);
  } catch (e) {
    res.status(401).json("Something went wrong...");
  }
};

const SortProduct = async (req, res) => {
  const subcategory = req.query.subcategory;
  const sort = req.query.sort;

  console.log(subcategory);

  try {
    let response;

    if (sort === "Price (Low to High)") {
      response = await Product.find({ subcategory: `${subcategory}` }).sort({
        price: 1,
      });
    } else if (sort === "Price (High to Low)") {
      response = await Product.find({ subcategory: `${subcategory}` }).sort({
        price: -1,
      });
    } else {
      response = await Product.find({ subcategory: `${subcategory}` }).sort({
        updatedAt: 1,
      });
    }

    res.status(200).json(response);
  } catch (e) {
    console.log(e);
  }
};

const SearchProduct = async (req, res) => {
  const term = req.query.term;

  try {
    const products = await Product.aggregate([
      {
        $search: {
          index: "default",
          text: {
            query: `${term}`,
            path: {
              wildcard: "*",
            },
          },
        },
      },
    ]);

    res.status(200).json(products);
  } catch (e) {
    res.status(401).json("no products found...");
  }
};

module.exports = {
  Registerproduct,
  GetProducts,
  SingleProduct,
  AddProductCategories,
  GetAllCategory,
  SortProduct,
  SearchProduct,
};
