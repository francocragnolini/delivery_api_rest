const express = require("express");
const {
  createProductValidation,
  updateProductValidation,
} = require("../validations/product");
const router = express.Router();

const productController = require("../controllers/product");

// ON GET method retrieves all products // all logged-in users
router.get("/", productController.getProducts);

// ON POST method creates a new product // only admin
router.post(
  "/add-product",
  createProductValidation,
  productController.postAddProduct
);

// ON PUT  edits a single product by id // only admin
router.put(
  "/:productId",
  updateProductValidation,
  productController.updateProduct
);

// ON DELETE  deletes a single product // only admin
router.delete("/:productId", productController.deleteProduct);

module.exports = router;
