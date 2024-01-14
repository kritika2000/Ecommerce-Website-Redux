const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/loginController');

router.route('/').post(LoginController.handleLogin);

module.exports = router;
