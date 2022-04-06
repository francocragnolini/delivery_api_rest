const express = require("express");
const router = express.Router();
const { authValidation } = require("../middleware/auth");

const cartController = require("../controllers/cart");

// ON GET retrieves the user's cart //
router.get("/:userId", authValidation, cartController.getCart);

// ON POST adds an existing product to the user's cart
router.post("/add", authValidation, cartController.postCart);

// ON DELETE  deletes a product from the users's cart
router.delete("/delete/:productId", authValidation, cartController.deleteItem);

module.exports = router;
