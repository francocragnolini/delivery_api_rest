const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const OrderItem = sequelize.define("OrderItem", {
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

module.exports = OrderItem;
