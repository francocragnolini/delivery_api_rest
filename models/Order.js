const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  total: {
    type: DataTypes.DOUBLE,
  },
});

module.exports = Order;
