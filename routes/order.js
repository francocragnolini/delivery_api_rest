const express = require("express");
const router = express.Router();
const { authValidation } = require("../middleware/auth");
const orderController = require("../controllers/order");

// ON POST  path: /order/create-order
router.post("/create", authValidation, orderController.createOrder);

module.exports = router;
