// SCRIPT TO ADD PRODUCTS TO THE DB

require('dotenv').config();
const dbConnect = require('../db/dbConnect');
const Product = require('../model/Product');
const fs = require('fs');
const path = require('path');

dbConnect().then(() => {
  const products = fs.readFileSync(path.resolve('db/products.json'), 'utf-8');
  Product.create(JSON.parse(products));
});
