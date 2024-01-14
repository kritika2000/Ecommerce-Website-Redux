// IMPORT PRODUCT MODEL
const Cart = require('../model/Cart');
const Product = require('../model/Product');

// DECLARE A CLASS FOR PRODUCT CONTROLLER CONTAINING CART APPLICATION LOGIC
class ProductController {
  // GET ALL PRODUCTS FROM THE DB
  static async getAllProducts(req, res) {
    try {
      const products = await Product.find({}).exec();
      res.status(200).json({
        success: true,
        statusCode: 200,
        status: 'ok',
        results: products.length,
        data: {
          products,
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
  // GET A PRODUCT WITH A SPECIFIC ID
  static getProduct(req, res) {
    const { product } = req;
    res.status(200).json({
      success: true,
      statusCode: 200,
      status: 'ok',
      data: {
        product,
      },
    });
  }

  // CREATE A PRODUCT
  static async createProduct(req, res) {
    try {
      const productWithMaxId = await Product.find({})
        .sort({ id: 'desc' })
        .limit(1)
        .exec();
      const newProduct = {
        ...req.body,
        id: productWithMaxId.length === 0 ? 0 : productWithMaxId[0].id + 1,
      };
      await Product.create(newProduct);
      res.status(201).json({
        success: true,
        statusCode: 201,
        status: 'created',
        data: {
          product: newProduct,
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

  // UPDATE A PRODUCT
  static async updateProduct(req, res) {
    try {
      await Product.updateOne({ id: req.params.id }, { ...req.body }).exec();
      res.status(201).json({
        success: true,
        statusCode: 201,
        status: 'updated',
        data: {
          product: { ...req.product, ...req.body },
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

  // DELETE A PRODUCT
  static async deleteProduct(req, res) {
    try {
      await Product.deleteOne({ id: req.params.id }).exec();
      res.sendStatus(204);
    } catch (err) {
      res.status(500).json({
        error: false,
        statusCode: 500,
        status: 'internal server error',
        message: err.message,
      });
    }
  }
}

module.exports = ProductController;
