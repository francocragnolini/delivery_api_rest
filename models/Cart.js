const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Cart = sequelize.define("Cart", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  total: {
    type: DataTypes.DOUBLE,
    defaultValue: 0,
  },
});

module.exports = Cart;
