const mongoose = require('mongoose');

// CREATE CART SCHEMA
const cartSchema = new mongoose.Schema({
  user: {
    type: String,
    required: [true, 'A cart must be associated with a user email'],
  },
  items: [
    {
      id: {
        type: Number,
        required: [true, 'A cart item must have a unique ID'],
      },
      title: {
        type: String,
        required: [true, 'A product must have a title'],
        lowercase: true,
      },
      price: {
        type: Number,
        required: [true, 'A product must have a price'],
      },
      quantity: {
        type: Number,
        default: 1,
      },
      image: String,
    },
  ],
});

// EXPORTING THE MODEL TO QUERY DATABASE
module.exports = mongoose.model('Cart', cartSchema);
