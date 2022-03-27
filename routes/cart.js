const express = require("express");
const router = express.Router();
const { authValidation } = require("../middleware/auth");

const cartController = require("../controllers/cart");

// ON GET method fetches the cart products
router.get("/:userId", authValidation, cartController.getCart);

// ON POST method adds a existing product to the cart
router.post("/add", authValidation, cartController.postCart);

router.delete("/delete/:productId", authValidation, cartController.deleteItem);
// router.get("/all", authValidation, cartController.get_all_carts);

module.exports = router;
