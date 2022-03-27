const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");

// ON PUT /auth/signup
router.put("/signup", authController.signup);

// /auth/login
router.post("/login", authController.login);

module.exports = router;
