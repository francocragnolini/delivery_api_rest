const sequelize = require("./database/database");
const Status = require("./models/Status");
const Product = require("./models/Product");
const Payment = require("./models/Payment");

const product = [
  { title: "burger", price: 12.99 },
  { title: "hot dog", price: 13.99 },
  { title: "salad", price: 14.99 },
];

const roles = [{ name: "admin" }, { name: "basic" }];

const status = [
  { name: "new" },
  { name: "confirmed" },
  { name: "preparing" },
  { name: "sending" },
  { name: "delivered" },
  { name: "canceled" },
];

const payment = [{ name: "cash" }, { name: "card" }];
