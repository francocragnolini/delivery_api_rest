const User = require("../models/User");
const Order = require("../models/Order");
const Status = require("../models/Status");
const Payment = require("../models/Payment");

// ON GET : retrieves all orders
// if admin retrieves all else only user's orders
exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: User,
          attributes: ["fullname", "address"],
        },
        {
          model: Payment,
          attributes: ["name"],
        },
        {
          model: Status,
          attributes: ["name"],
        },
      ],
    });
    if (orders.length === 0) {
      const error = new Error();
      error.statusCode = 404;
      error.data = "No Orders were found.";
    }

    res.status(200).json(orders);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    res.status(error.statusCode).json({ error: error });
  }
};

// ON POST  a logged-in user can generate an order
exports.createOrder = async (req, res, next) => {
  const userId = req.userId;
  try {
    const user = await User.findByPk(userId);
    const cart = await user.getCart();
    const totalCart = cart.total;

    // getting the products from the user cart
    const products = await cart.getProducts();
    // if no product in the cart
    if (products.length === 0) {
      const error = new Error("No products in the cart.");
      error.statusCode = 404;
      throw error;
    }

    // generates an order
    const order = await user.createOrder();

    // adding the products from cart to the order
    await order.addProducts(
      products.map((product) => {
        product.OrderItem = {
          quantity: product.CartItem.quantity,
        };
        return product;
      })
    );
    await order.update({ total: totalCart });

    //  empties the cart after the order was created
    await cart.setProducts(null);

    res.status(200).json({ message: "Order created", order });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
