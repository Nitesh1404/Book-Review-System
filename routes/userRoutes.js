const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router
	.route('/register')
	.post(userController.createUser);

router
	.route('/login')
	.post(userController.userLogin);

module.exports = router;