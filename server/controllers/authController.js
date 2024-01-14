const User = require('../model/User');

class AuthController {
  static async authenticate(req, res) {
    const { userId, username } = await User.findOne({
      userId: req.userId,
    }).exec();
    return res.status(200).json({
      success: true,
      currentUser: { userId, username },
    });
  }
}

module.exports = AuthController;
