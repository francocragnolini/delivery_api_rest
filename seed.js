const sequelize = require("./database/database");
const Status = require("./models/Status");
const Product = require("./models/Product");
const Payment = require("./models/Payment");
const Role = require("./models/Role");

const products = [
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

const payments = [
  { name: "cash" },
  { name: "credit card" },
  { name: "debit card" },
];

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("uploading data from seed.");
  })
  .then(() => {
    products.forEach((element) => Product.create(element));
  })
  .then(() => {
    status.forEach((element) => Status.create(element));
  })
  .then(() => {
    payments.forEach((element) => Payment.create(element));
  })
  .then(() => {
    roles.forEach((element) => Role.create(element));
  });
