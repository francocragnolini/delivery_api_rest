const Product = require("../models/Product");
const { validationResult } = require("express-validator");

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    if (products.length === 0) {
      const error = new Error();
      error.statusCode = 404;
      error.data = "Products were not found.";
      throw error;
    }
    res.status(200).json(products);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    res.status(error.statusCode).json({ error: error });
  }
};

exports.getProduct = async (req, res, next) => {
  const productId = req.params.productId;
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      const error = new Error();
      error.statusCode = 404;
      error.data = "Product not found.";
      throw error;
    }
    res.status(200).json({ product });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
      error.data = "internal error";
    }
    res.status(error.statusCode).json({ error: error });
  }
};

exports.postAddProduct = async (req, res, next) => {
  const { title, price } = req.body;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed.");
      error.statusCode = 409;
      error.data = errors.array()[0].msg;
      throw error;
    }
    const newProduct = await Product.create({ title: title, price: price });

    res
      .status(201)
      .json({ message: "Product has been created.", product: newProduct });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    res.status(error.statusCode).json({ error: error });
  }
};

exports.updateProduct = async (req, res, next) => {
  //validates the incoming data(body)
  const idParam = req.params.productId;
  const { title, price } = req.body;
  try {
    const product = await Product.findByPk(idParam);
    if (!product) {
      const error = new Error();
      error.statusCode = 404;
      error.data = "Product could not be found.";
      throw error;
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed.");
      error.statusCode = 409;
      error.data = errors.array()[0].msg;
      throw error;
    }

    const updateProduct = await product.update({ title: title, price: price });

    return res
      .status(201)
      .json({ message: "product updated", product: updateProduct });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    res.status(error.statusCode).json({ error: error });
  }
};

exports.deleteProduct = async (req, res, next) => {
  const productId = req.params.productId;
  console.log(req.params);
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      const error = new Error();
      error.statusCode = 404;
      error.data = "Product could not be found";
      throw error;
    }

    await product.destroy();
    res.status(200).json({ message: "Deleted product." });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    res.status(error.statusCode).json({ error: error });
  }
};
