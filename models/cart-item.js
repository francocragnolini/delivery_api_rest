const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const CartItem = sequelize.define("CartItem", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
});

module.exports = CartItem;
