const User = require('../model/User');

class LogoutController {
  static async handleLogout(req, res) {
    // REFRESH TOKEN IS STORED INSIDE COOKIES
    // check if cookies exist
    const cookies = req.cookies;
    // if cookies doesn't exists
    if (!cookies?.refreshToken) return res.sendStatus(204);
    // obtain the refresh token from cookies
    const refreshToken = cookies.refreshToken;
    try {
      // check if the user with this refresh token exist
      const foundUser = await User.findOne({ refreshToken });
      if (!foundUser) {
        // if user doesn't exist, i.e. the token is incorrect.
        res.clearCookie('refreshToken', { httpOnly: true });
        res.sendStatus(204);
      }
      // remove the refresh token from the DB
      await User.updateOne({ refreshToken }, { refreshToken: '' });
      // clear the refresh token from cookies
      res.clearCookie('refreshToken', { httpOnly: true });
      res.sendStatus(204);
    } catch (err) {
      res.status(500).json({
        error: true,
        statusCode: 500,
        status: 'internal server error',
        message: err.message,
      });
    }
  }
}

module.exports = LogoutController;
