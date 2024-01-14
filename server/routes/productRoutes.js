/* 
  EITHER CREATE ROUTES ON THE app OBJECT using app.route.
  TO DO THIS WE NEED TO EXPORT THE app OBJECT TO ALL THE
  ROUTES. 
  SO, WE CAN USE express.router() MIDDLEWARE, TO CREATE
  SEPARATE ROUTERS FOR EACH ROUTE.
*/
const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');
const Product = require('../model/Product');
const checkBody = require('../middlewares/checkBody');
const authorizeUser = require('../middlewares/authorizeUser');

// ADDING ROUTE PARAM MIDDLEWARE
/**
 * This middleware will execute if the request comes with the
 * current mount path with a specific rout param.
 * We can use this middleware to check if the param is a valid
 * one or not.
 */
router.param('id', async (req, res, next, id) => {
  try {
    const product = await Product.findOne({ id }).exec();
    if (!product)
      return res.status(404).json({
        error: true,
        statusCode: 404,
        status: 'not found',
        message: 'Invalid ID',
      });
    req.product = product.toObject();
    next();
  } catch (err) {
    return res.status(500).json({
      error: true,
      statusCode: 500,
      status: 'Internal Server Error',
      message: err.message,
    });
  }
});

// CREATE ROUTER & ATTACH ROUTER HANDLER/CONTROLLER
router
  .route('/')
  .get(ProductController.getAllProducts)
  .post(authorizeUser, checkBody, ProductController.createProduct);

router
  .route('/:id')
  .get(ProductController.getProduct)
  .patch(authorizeUser, checkBody, ProductController.updateProduct)
  .delete(authorizeUser, ProductController.deleteProduct);

// EXPORT THE ROUTER
module.exports = router;
