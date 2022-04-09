const { body } = require("express-validator");
const Product = require("../models/Product");

const createProductValidation = [
  body("title")
    .notEmpty()
    .withMessage("Title cannot be empty. Please fill it up")
    .isString()
    .withMessage("Title must be a string")
    .custom((value, { req }) => {
      return Product.findOne({ where: { title: value } }).then((product) => {
        if (product) {
          return Promise.reject("Product already exists");
        }
      });
    })
    .trim(),

  body("price")
    .notEmpty()
    .withMessage("Price field cannot be empty. Please fill it up.")
    .trim(),
];

const updateProductValidation = [
  body("title")
    .notEmpty()
    .withMessage("Title field is empty. Please fill it out")
    .trim(),
  body("price")
    .notEmpty()
    .withMessage("Price field is empty. Please fill it out"),
];

module.exports = { createProductValidation, updateProductValidation };
