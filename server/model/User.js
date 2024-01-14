const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, 'A user must have a name'],
    lowercase: true,
  },
  userId: {
    type: String,
    required: [true, 'A user must have a userid'],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'A user must have a password'],
  },
  refreshToken: {
    type: String,
    default: '',
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('User', userSchema);
