const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/config");

// checks if an user is logged in
const authValidation = async (req, res, next) => {
  // checking if auth is set in the headers
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("Not Authenticated, Missing Token");
    error.statusCode = 401;
    throw error;
  }
  // getting the jwt token
  const token = req.get("Authorization").split(" ")[1];
  let decodedToken;

  try {
    // if token null or undefined
    decodedToken = await jwt.verify(token, jwtSecret);
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
  // if token does not match
  if (!decodedToken) {
    const error = new Error("Not Authenticated");
    error.statusCode = 401;
    throw error;
  }
  // extracts the userId from token and set it to the request, now you have access everywhere
  req.userId = decodedToken.userId;
  next();
};

// to authenticate by role
function authRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      res.status(401);
      return res.send("not Allowed");
    }
    next();
  };
}

module.exports = { authValidation };
