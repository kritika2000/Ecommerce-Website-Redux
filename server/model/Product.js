const mongoose = require('mongoose');

// CREATE PRODUCT SCHEMA
const productSchema = mongoose.Schema({
  id: Number,
  title: {
    type: String,
    required: [true, 'A product must have a title'],
    lowercase: true,
  },
  price: {
    type: Number,
    required: [true, 'A product must have a price'],
  },
  description: {
    type: String,
    required: [true, 'A product must have a description'],
    lowercase: true,
  },
  category: {
    type: String,
    required: [true, 'A product must have a category'],
    lowercase: true,
  },
  image: String,
  rating: {
    rate: Number,
    count: Number,
  },
});

// EXPORTING THE MODEL TO QUERY DATABASE
module.exports = mongoose.model('Product', productSchema);
