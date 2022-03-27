// config.js
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbHost: process.env.DB_HOST,
  dbPassword: process.env.DB_PASSWORD,
  dbDialect: process.env.DB_DIALECT,
  port: process.env.SERVER_PORT,
  jwtSecret: process.env.JWT_SECRET,
};
