const express = require("express");
const sequelize = require("./database/database");
// const seed = require("./seed");
const association = require("./database/associations");
const { port } = require("./config/config");

const app = express();

// parsing the body
app.use(express.json());

// setting the headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow access from different domains
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  ); //methods allowed
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // set the data type
  next();
});

// routes
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/orders", orderRoutes);

app.listen(port, () => {
  console.log(`App running successfully on port:${port}`);
});
