// IMPORT PRODUCT MODEL
const Product = require('../model/Product');

// GET ALL PRODUCTS FROM THE DB
async function getAllProducts(req, res) {
  try {
    const products = await Product.find({}).exec();
    res.status(200).json({
      success: true,
      statusCode: 200,
      status: 'ok',
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

module.exports = { getAllProducts };
