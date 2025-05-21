const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const secretKey = 'BookReviewSystem';

const createToken = (userId) => {
	return jwt.sign({ id: userId }, secretKey);
}

exports.createUser = async (req, res) => {
	try {
		const user = await User.create(req.body);
		const token = createToken(user._id);

		res.status(201).json({
			status: "success",
			data: {
				users: user
			}
		});
	}
	catch (err) {
		res.status(400).json({
			status: "success",
			message: err.message
		});
	}
}

exports.userLogin = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		const checkPassword = await user.correctPassword(password);

		if (!user || !checkPassword) {
			return res.status(404).json({
				status: "Error",
				message: "Invalid Credential"
			});
		}

		const token = createToken(user._id);
		res.status(200).json({
			status: "success".
				token,
			user
		});

	}
	catch (err) {
		res.status(500).json({
			status: "error",
			message: err.message
		});
	}
}