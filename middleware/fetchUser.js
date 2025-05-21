const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const secretKey = 'BookReviewSystem';

const fetchUser = async (req, res, next) => {
	const token = req.headers.authorization?.split(' ')[1];
	if (!token) {
		return res.status(401).json({
			status: 'error',
			message: err.message
		});
	}

	try {
		const decoded = jwt.verify(token, secretKey);
		req.user = await User.findById(decoded.id);
		next();
	} catch (err) {
		res.status(401).json({
			status: "error",
			message: 'Invalid token'
		});
	}
}

module.exports = fetchUser;