const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cartController');
const checkBody = require('../middlewares/checkBody');
const authorizeUser = require('../middlewares/authorizeUser');

// AUTHORIZE APIs
router.use(authorizeUser);

// CREATE ROUTER & ATTACH ROUTER HANDLER/CONTROLLER
router
  .route('/')
  .get(CartController.getAllCartItems)
  .post(checkBody, CartController.addItemToCart)
  .delete(CartController.clearCart);

router
  .route('/:id')
  .patch(checkBody, CartController.updateCartItem)
  .delete(CartController.removeItemFromCart);

module.exports = router;
