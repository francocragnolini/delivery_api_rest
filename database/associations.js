const sequelize = require("./database");

// MODELS
const productModel = require("../models/Product");
const userModel = require("../models/User");
const roleModel = require("../models/Role");
const cartModel = require("../models/Cart");
const cartItemModel = require("../models/cart-item");
const statusModel = require("../models/Status");
const paymentModel = require("../models/Payment");
const orderModel = require("../models/Order");
const orderItemModel = require("../models/order-item");

// ASSOCIATIONS
// Cart-User
userModel.hasOne(cartModel);
cartModel.belongsTo(userModel);

// Cart-Product
cartModel.belongsToMany(productModel, { through: cartItemModel });
productModel.belongsToMany(cartModel, { through: cartItemModel });

// ROLE - USER
userModel.hasOne(roleModel);
roleModel.belongsTo(userModel);

// Order-User
userModel.hasMany(orderModel);
orderModel.belongsTo(userModel);

// Order-Products
orderModel.belongsToMany(productModel, { through: orderItemModel });
productModel.belongsToMany(orderModel, { through: orderItemModel });

// Order-Payment
paymentModel.hasMany(orderModel);
orderModel.belongsTo(paymentModel);

// Order-Status
statusModel.hasMany(orderModel);
orderModel.belongsTo(statusModel);

// SYNC TABLES
sequelize
  // .sync({ force: true })
  .sync()
  .then((result) => {
    console.log("synchronizing the tables");
  })
  .catch((err) => console.log(error));
