const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class LoginController {
  static async handleLogin(req, res) {
    // check if the user has passed both username and password
    const { userId, password } = req.body;
    if (!userId || !password)
      // show user the appropriate error
      return res.status(400).json({
        error: true,
        statusCode: 400,
        status: 'bad request',
        message: 'userId and password are missing',
      });
    // check if the user with the userId exists
    const foundUser = await User.findOne({ userId }).exec();
    if (!foundUser)
      // if user doesn't exist return the appropriate error
      return res.status(404).json({
        error: true,
        statusCode: 404,
        status: 'not found',
        message: `user with userId: ${userId} doesn't exist`,
      });
    // compare passwords
    const match = await bcrypt.compare(password, foundUser.password);
    if (!match)
      return res.status(400).json({
        error: true,
        statusCode: 400,
        status: 'bad request',
        message: `Invalid credentials`,
      });
    // create access/refresh token
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '5m',
    });
    const refreshToken = jwt.sign(
      { userId },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );
    // return the refresh token as a secure cookie, so that it can't be accessed through CJS
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    await User.findOneAndUpdate({ userId }, { refreshToken });
    /* 
     return the access token as json, the client side developer
     will be responsible to store the token in the appropriate
     storage
    */
    res.status(201).json({
      username: foundUser.username,
      userId,
      accessToken,
    });
  }
}

module.exports = LoginController;
