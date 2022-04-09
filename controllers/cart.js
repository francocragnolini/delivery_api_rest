const User = require("../models/User");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const CartItem = require("../models/cart-item");

// ON POST add a product to cart
exports.postCart = async (req, res, next) => {
  const { prodId, quantity } = req.body;
  const userId = req.userId;
  let product;

  try {
    const user = await User.findByPk(userId);
    const cart = await user.getCart();

    // retrieves an array with a single product
    const products = await cart.getProducts({ where: { id: prodId } });

    // product not found in cart´s array
    if (products.length === 0) {
      // find product in db
      product = await Product.findByPk(prodId);
      if (!product) {
        const error = new Error();
        error.statusCode = 404;
        error.data = "Product not found.";
        throw error;
      }
      const oldTotal = cart.total;
      // adds the product with its quantity
      await cart.addProduct(product, { through: { quantity: quantity } });
      // updates the total price
      await cart.update({ total: oldTotal + product.price * quantity });

      return res.status(201).json({ message: "Product added to cart" });
    }

    // product found in cart's array
    product = products[0];
    // takes the existing quantity of the product
    const oldQuantity = product.CartItem.quantity;
    const updatedQuantity = oldQuantity + quantity;
    const price = product.price;
    // updates the existing quantity
    await cart.addProduct(product, {
      through: { quantity: updatedQuantity },
    });

    // updates the total price of cart
    await cart.update({ total: updatedQuantity * price });

    res.status(201).json({ message: "Product added to cart" });
  } catch (error) {
    res.status(error.statusCode).json({ error: error });
  }
};

// TESTING
exports.deleteItem = async (req, res, next) => {
  const productId = req.params.productId;
  const userId = req.userId;
  const quantity = req.body.quantity;

  try {
    // getting the user cart
    const user = await User.findByPk(userId);
    const cart = await user.getCart();

    // returns an array with a single element
    const products = await cart.getProducts({
      where: {
        id: productId,
      },
    });

    // product not found
    if (products.length === 0) {
      const error = new Error();
      error.statusCode = 404;
      error.data = "Product could not be found.";
      throw error;
    }

    // extracts product from array
    const product = products[0];
    const total = cart.total;
    const price = product.price;
    const oldQuantity = product.CartItem.quantity;
    const newQuantity = oldQuantity - quantity;

    // deletes product from cart
    if (newQuantity <= 0) {
      await product.CartItem.destroy();
      await cart.update({ total: total - oldQuantity * price });
    }

    // updates the product quantity

    return res.status(202).json({ message: "Product deleted." });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    res.status(error.statusCode).json({ error: error });
  }
};
// TESTING

// ON GET returns the user's cart
exports.getCart = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const cart = await Cart.findOne({
      include: { model: Product },
      where: { UserId: userId },
    });

    if (!cart) {
      const error = new Error();
      error.statusCode = 404;
      error.data = "Cart not found.";
      throw error;
    }

    res.json(cart);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    res.status(error.statusCode).json({ error: error });
  }
};
