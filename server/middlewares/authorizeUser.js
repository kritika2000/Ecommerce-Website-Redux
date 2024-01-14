require('dotenv').config(); // get env variables
const jwt = require('jsonwebtoken');
const User = require('../model/User');

/**
 * THIS MIDDLEWARE WILL BE EXECUTED BEFORE EVERY PROTECTED ROUTE,
 * TO CHECK IF THE USER HAS THE CORRECT ACCESS TOKEN TO GIVE THE
 * REQUIRED DATA TO THE LOGGED IN USER.
 */

async function authorizeUser(req, res, next) {
  // check if access and refresh token exists
  const authHeader = req.headers.authorization;
  const cookies = req.cookies;
  if (!authHeader && !cookies?.refreshToken) return res.sendStatus(401);

  // obtain access and refresh tokens
  const token = authHeader.split(' ')[1];
  const refreshToken = cookies.refreshToken;

  try {
    // verify the tokens against the token secrets
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // put the userId present in the token payload in req object, so that it can be user to get current logged in user's information.
    req.userId = decoded.userId;
    next();
  } catch (err) {
    const foundUser = await User.findOne({ refreshToken });
    if (!foundUser) {
      res.sendStatus(403);
      return;
    }
    try {
      // verify refresh token
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      // create a new access token, if the refresh token is verified
      const accessToken = jwt.sign(
        { username: foundUser.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '5m' }
      );
      // returns the new access token
      return res.status(200).json({
        success: true,
        accessToken,
      });
    } catch (err) {
      // incorrect refresh token
      res.sendStatus(403);
    }
  }
}

module.exports = authorizeUser;
