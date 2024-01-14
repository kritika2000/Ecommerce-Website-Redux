const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserController {
  static async getAllUsers(req, res) {
    try {
      const users = await User.find({}).exec();
      return res.status(200).json({
        success: true,
        statusCode: 200,
        status: 'ok',
        data: {
          users,
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
  static async getUser(req, res) {
    try {
      return res.status(200).json({
        success: true,
        statusCode: 200,
        status: 'ok',
        data: {
          user: req.user,
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
  static async createUser(req, res) {
    try {
      const { username, userId, password } = req.body;
      // check if all fields are sent
      if (!username || !userId || !password)
        return res.status(400).json({
          error: true,
          statusCode: 400,
          status: 'bad request',
          message: 'userId or password is missing',
        });
      // check if the user already exists in DB
      const foundUser = await User.findOne({ userId }).exec();
      if (foundUser)
        return res.status(400).json({
          error: true,
          statusCode: 409,
          status: 'conflict',
          message: `userId already in use`,
        });
      const hashedPwd = await bcrypt.hash(password, 10);
      const newUser = { username, userId, password: hashedPwd };
      await User.create(newUser);
      res.status(201).json({
        success: true,
        statusCode: 201,
        status: 'created',
        data: {
          user: newUser,
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
  static async updateUser(req, res) {
    try {
      const hashedPwd = await bcrypt.hash(req.body.password, 10);
      const updatedUser = { ...req.user, password: hashedPwd };
      console.log(req.user);
      await User.updateOne({ _id: req.params.id }, { ...req.body }).exec();
      res.status(201).json({
        success: true,
        statusCode: 201,
        status: 'updated',
        data: {
          user: updatedUser,
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
  static async deleteUser(req, res) {
    try {
      await User.deleteOne({ _id: req.params.id }).exec();
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

module.exports = UserController;
