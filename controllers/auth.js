const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/config");

// ON PUT method
exports.signup = async (req, res, next) => {
  //1- validate the body data
  const { username, fullname, email, password, phone, address } = req.body;

  // check if user already exists.
  try {
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
    return res.status(201).json({ message: "User has been created!!" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// ON POST method
exports.login = async (req, res, next) => {
  //1- validate body
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      const error = new Error("A user with this email cannot be found");
      error.statusCode = 401;
      throw error;
    }

    // async returns boolean value
    const isEqual = await bcrypt.compare(password, user.password);

    // jwt token
    // 3- use ENV file to keep the away the secret key
    if (!isEqual) {
      const error = new Error("Wrong Password");
      error.statusCode = 401;
      throw error;
    }
    // SHOULD ADD USER COMPLETE WITHOUT PASSWORD AND IS ADMIN PROPERTY

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
    next(error);
  }
};
