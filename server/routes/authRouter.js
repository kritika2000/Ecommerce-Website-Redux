const express = require('express');
const router = express.Router();
const authorizeUser = require('../middlewares/authorizeUser');
const AuthController = require('../controllers/authController');

// CREATE ROUTER & ATTACH ROUTER HANDLER/CONTROLLER
router.get('/', authorizeUser, AuthController.authenticate);

module.exports = router;
