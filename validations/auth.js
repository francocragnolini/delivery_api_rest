const { body } = require("express-validator");
const User = require("../models/User");

const signupValidation = [
  // username
  body("username")
    .notEmpty()
    .withMessage("Username field is empty.")
    .custom((value, { req }) => {
      return User.findOne({ where: { username: value } }).then((user) => {
        if (user) {
          return Promise.reject("Username already exists");
        }
      });
    })
    .trim(),

  //   fullname
  body("fullname").notEmpty().withMessage("Fullname field is empty.").trim(),

  //   email
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email.")
    .custom((value, { req }) => {
      return User.findOne({ where: { email: value } }).then((user) => {
        if (user) {
          return Promise.reject("E-Mail address already exists!");
        }
      });
    })
    .normalizeEmail(),

  // password
  body("password")
    .notEmpty()
    .withMessage("Password field is empty.")
    .isLength({ min: 5 })
    .withMessage("Must be 5 characters long.")
    .trim(),

  // phone
  body("phone")
    .notEmpty()
    .withMessage("Phone field is empty")
    .isString()
    .withMessage("Must be an string")
    .trim(),

  // address
  body("address")
    .notEmpty()
    .withMessage("Address field is empty.")
    .isString()
    .withMessage("Must be an string")
    .trim(),
];

const loginValidation = [
  // email
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email.")
    .custom((value, { req }) => {
      return User.findOne({ where: { email: value } }).then((user) => {
        if (!user) {
          return Promise.reject("User with this email cannot be found");
        }
      });
    })
    .normalizeEmail(),

  // password
  body("password").notEmpty().withMessage("Password field is empty.").trim(),
];

module.exports = { signupValidation, loginValidation };
