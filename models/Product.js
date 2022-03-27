const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
});

module.exports = Product;
