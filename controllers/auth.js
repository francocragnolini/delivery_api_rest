const User = require("../models/User");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/config");

// ON PUT method
exports.signup = async (req, res, next) => {
  const { username, fullname, email, password, phone, address } = req.body;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed.");
      error.statusCode = 422;
      error.data = errors.array()[0].msg;
      throw error;
    }
    // check if user already exists.
    const user = await User.findOne({ where: { username: username } });
    if (user) {
      const error = new Error("User already exists.Try another one.");
      error.statusCode = 409;
      throw error;
    }
    // hash the body password.
    const hashedPassword = await bcrypt.hash(password, 12);

    // creates user.
    const newUser = await User.create({
      username: username,
      fullname: fullname,
      email: email,
      password: hashedPassword,
      address: address,
      phone: phone,
    });

    // generating a cart
    const cart = await newUser.createCart();
    return res.status(201).json({ message: "User has been created." });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    // next(error);
    res.status(error.statusCode).json({ error: error });
  }
};

// ON POST method
exports.login = async (req, res, next) => {
  try {
    // validates the incoming data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.statusCode = 422;
      error.data = errors.array()[0].msg;
      throw error;
    }
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      const error = new Error("A user with this email cannot be found");
      error.statusCode = 401;
      throw error;
    }

    // async returns boolean value
    const isEqual = await bcrypt.compare(password, user.password);

    // jwt token
    if (!isEqual) {
      // const error = new Error("Wrong Password");
      const error = new Error();
      error.statusCode = 409;
      error.data = "Wrong password";
      throw error;
    }
    // SHOULD ADD USER INFO WITHOUT PASSWORD AND IS ADMIN PROPERTY

    const token = jwt.sign(
      {
        email: user.email,
        userId: user.id,
      },
      jwtSecret,
      { expiresIn: "6h" }
    );
    return res.status(200).json({ token: token, userId: user.id });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    console.log(error);
    // next(error);
    res.json({ error: error });
  }
};
