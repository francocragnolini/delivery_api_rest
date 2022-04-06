const express = require("express");
const router = express.Router();
const { signupValidation, loginValidation } = require("../validations/auth");
const authController = require("../controllers/auth");

// ON PUT  creates a new user
router.put("/signup", signupValidation, authController.signup);

// ON POST logs in a registered user
router.post("/login", loginValidation, authController.login);

module.exports = router;
