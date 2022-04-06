const express = require("express");
const router = express.Router();
const { authValidation } = require("../middleware/auth");
const orderController = require("../controllers/order");

// ON GET path: /orders/
router.get("/", orderController.getAllOrders);

// ON POST  path: /orders/create-order
router.post("/create", authValidation, orderController.createOrder);

module.exports = router;
