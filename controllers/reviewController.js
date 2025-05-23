const Review = require('../models/reviewModel');
const Book = require('../models/book');

exports.addReview = async (req, res) => {
	try {
		const bookId = req.params.id;
		const { rating, comment } = req.body;
		const userId = req.user._id;

		const existing = await Review.findOne({ book: bookId, user: userId });
		if (existing) {
			return res.status(400).json({
				status: "error",
				message: "User has already added review on this book"
			});
		}

		const review = await Review.create({ book: bookId, user: userId, rating, comment });

		const reviews = await Review.find({ book: bookId });
		const avg = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
		await Book.findByIdAndUpdate(bookId, { averageRating: avg });

		res.status(201).json({
			status: "success",
			data: {
				review
			}
		});
	}
	catch (err) {
		res.status(400).json({
			status: "error",
			message: err.message
		});
	}
}

exports.updateReview = async (req, res) => {
	try {
		const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });

		if (!review) {
			return res.status(404).json({
				status: "error",
				message: "Review Not Found"
			});
		}

		res.status(200).json({
			status: "success",
			data: {
				review
			}
		});
	}
	catch (err) {
		res.status(500).json({
			status: "error",
			message: err.message
		});
	}
}

exports.deleteReview = async (req, res) => {
	try {
		const deletedReview = await Review.findByIdAndDelete(req.params.id);

		if (!deletedReview) {
			return res.status(404).json({
				status: "error",
				message: "Review Not Found !!"
			});
		}

		res.status(200).json({
			status: 'success',
			data: null
		});
	}
	catch (err) {
		res.status(500).json({
			status: "error",
			message: err.message
		});
	}
}