const { Sequelize } = require("sequelize");
const {
  dbName,
  dbUser,
  dbPassword,
  dbDialect,
  dbHost,
} = require("../config/config");

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDialect,
  logging: false,
});

// testing connection to DB
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
testConnection();

module.exports = sequelize;
