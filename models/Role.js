const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Role = sequelize.define("Role", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "basic",
  },
});

module.exports = Role;
