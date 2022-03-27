const Product = require("../models/Product");

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    if (products.length === 0) {
      const error = new Error("No products were found.");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json(products);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    console.log(error);
    next(error);
  }
};

// get single product

exports.postAddProduct = async (req, res, next) => {
  // validate payload(body)
  const { title, price } = req.body;
  try {
    const product = await Product.findOne({ where: { title: title } });
    if (product) {
      const error = new Error("Product already exists in the DB");
      error.statusCode = 409;
      throw error;
    }
    const newProduct = await Product.create({ title: title, price: price });

    res.status(201).json({ message: "Product Created!", newProduct });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    console.log(error);
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  //validates the incoming data(body)
  const idParam = req.params.productId;
  const { title, price } = req.body;
  try {
    const product = await Product.findByPk(idParam);
    if (!product) {
      const error = new Error("Could not find product.");
      error.statusCode = 404;
      throw error;
    }
    product.title = title;
    product.price = price;
    await product.save();
    return res
      .status(201)
      .json({ message: "product updated", product: product });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findByPk(productId)
    .then((product) => {
      if (!product) {
        const error = new Error("Could not find product.");
        error.statusCode = 404;
        throw error;
      }
      // Check logged in user
      return Product.destroy({ where: { id: productId } });
    })
    .then((result) => {
      console.log(result);
      res.status(200).json({ message: "Deleted product." });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      console.log(err);
      next(err);
    });
};
