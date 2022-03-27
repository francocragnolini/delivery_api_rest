const User = require("../models/User");
const Product = require("../models/Product");

//ON POST add a product to cart
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
        const error = new Error("Product not found.");
        error.statusCode = 404;
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
    console.log(cart);

    res.status(201).json({ message: "Product added to cart" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// ON delete method: deletes a product from the cart
exports.deleteItem = async (req, res, next) => {
  const productId = req.params.productId;
  const userId = req.userId;

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

    // getting the item
    const product = products[0];

    if (!product) {
      const error = new Error("Product not found in cart.");
      error.statusCode = 404;
      throw error;
    }

    await product.CartItem.destroy();

    return res.status(202).json({ message: "Product deleted." });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// ON GET method to fetch a single cart
exports.getCart = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await User.findByPk(userId);
    const cart = await user.getCart();
    if (!cart) {
      const error = new Error("Cannot fetched cart");
      throw error;
    }
    const products = await cart.getProducts();

    res.json({ cart: products });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
