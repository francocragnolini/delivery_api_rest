const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Payment = sequelize.define("Payment", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "confirmed",
    unique: true,
  },
});

module.exports = Payment;
