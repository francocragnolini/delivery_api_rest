const express = require("express");
const router = express.Router();

const productController = require("../controllers/product");

// ON GET method retrieves all products
router.get("/", productController.getProducts);

// ON POST method creates a new product
router.post("/add", productController.postAddProduct);

// ON PUT method edits a product by id
router.put("/update/:productId", productController.updateProduct);

// ON DELETE method
router.delete("/delete/:productId", productController.deleteProduct);

module.exports = router;
