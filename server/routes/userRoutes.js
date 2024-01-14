const User = require('../model/User');
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.param('id', async (req, res, next, id) => {
  try {
    const user = await User.findOne({ _id: id }).exec();
    if (!user)
      return res.status(404).json({
        error: true,
        statusCode: 404,
        status: 'not found',
        message: 'Invalid ID',
      });
    req.user = user.toObject();
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

router
  .route('/')
  .get(UserController.getAllUsers)
  .post(UserController.createUser);

router
  .route('/:id')
  .get(UserController.getUser)
  .patch(UserController.updateUser)
  .delete(UserController.deleteUser);

module.exports = router;
