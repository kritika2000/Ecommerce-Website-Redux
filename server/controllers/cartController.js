// IMPORT CART MODEL
const Cart = require('../model/Cart');

// DECLARE A CLASS FOR CART CONTROLLER CONTAINING CART APPLICATION LOGIC
class CartController {
  // GET ALL CART ITEMS FROM THE DB
  static async getAllCartItems(req, res) {
    try {
      // use the userId obtain by verifying the token inside authorizeUser middleware.
      const user = req.userId;
      // obtain the cart of the user with the above userId
      const cart = await Cart.find({ user }).exec();
      res.status(200).json({
        success: true,
        statusCode: 200,
        status: 'ok',
        results:
          cart.length === 0 || cart[0].items.length === 0
            ? 0
            : cart[0].items.length,
        data: {
          cart: cart[0]?.items || [],
        },
      });
    } catch (err) {
      res.status(500).json({
        error: false,
        statusCode: 500,
        status: 'internal server error',
        message: err.message,
      });
    }
  }

  // ADD AN ITEM TO THE CART
  static async addItemToCart(req, res) {
    try {
      const user = req.userId;
      const cart = await Cart.findOne({ user }).exec();
      if (!cart) {
        const item = { user, item: req.body };
        await Cart.create(item);
        return res.status(201).json({
          success: true,
          statusCode: 201,
          status: 'created',
          data: {
            cart: item,
          },
        });
      }
      await Cart.updateOne(
        { user, 'items.id': { $ne: req.body.id } },
        { $push: { items: { ...req.body } } }
      ).exec();

      res.status(201).json({
        success: true,
        statusCode: 201,
        status: 'created',
        data: {
          cart: { user, item: req.body },
        },
      });
    } catch (err) {
      res.status(500).json({
        error: false,
        statusCode: 500,
        status: 'internal server error',
        message: err.message,
      });
    }
  }

  // UPDATE AN ITEM IN THE CART
  static async updateCartItem(req, res) {
    try {
      const user = req.userId;
      const { quantity } = req.body;
      const cart = await Cart.findOne({
        user,
        'items.id': { $eq: req.params.id },
      }).exec();
      if (!cart)
        return res.status(404).json({
          error: false,
          statusCode: 404,
          status: 'not found',
          message: 'invalid ID',
        });
      await Cart.updateOne(
        { user, 'items.id': { $eq: req.params.id } },
        { $set: { 'items.$.quantity': quantity } }
      );
      return res.status(201).json({
        success: true,
        statusCode: 201,
        status: 'updated',
      });
    } catch (err) {
      res.status(500).json({
        error: false,
        statusCode: 500,
        status: 'internal server error',
        message: err.message,
      });
    }
  }

  // REMOVE ITEM FROM THE CART
  static async removeItemFromCart(req, res) {
    const user = req.userId;
    const cart = await Cart.findOne({
      user,
      'items.id': { $eq: req.params.id },
    }).exec();
    if (!cart)
      return res.status(404).json({
        error: false,
        statusCode: 404,
        status: 'not found',
        message: 'invalid ID',
      });
    await Cart.updateOne(
      { user },
      { $pull: { items: { id: { $eq: req.params.id } } } }
    );
    return res.sendStatus(204);
  }

  // CLEAR CART
  static async clearCart(req, res) {
    const user = req.userId;
    await Cart.findOneAndUpdate({ user }, { items: [] }).exec();
    return res.sendStatus(204);
  }
}

module.exports = CartController;
