const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Status = sequelize.define("Status", {
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

module.exports = Status;
