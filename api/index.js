const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const UserAuthRoutes = require("./routes/UserAuthRoutes.js");
const UserOperationRoutes = require("./routes/UserRoutes.js");
const ProductRoutes = require("./routes/ProductRoutes.js");
const CartRoutes = require("./routes/CartRoutes.js");
const OrderRoutes = require("./routes/OrderRoutes.js");
const PaymentRoutes = require("./routes/PaymentRoutes.js");

const PORT = process.env.PORT || 5500;

dotenv.config();

const Connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB is connected...");
  } catch (err) {
    console.log(err);
  }
};

const app = express();

app.use(cors());

app.options("*", cors());

// app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use("/api/user", UserAuthRoutes);
app.use("/api/userOperation", UserOperationRoutes);
app.use("/api/product", ProductRoutes);
app.use("/api/cart", CartRoutes);
app.use("/api/order", OrderRoutes);
app.use("/api/payment", PaymentRoutes);

// console.log(path.join(__dirname, "../client/dist"));

// app.use(express.static(path.join(__dirname, "../client/dist")));

// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "../client/dist/index.html"));
// });

app.listen(PORT, () => {
  Connect();
  console.log(`Server is started ${PORT}`);
});
