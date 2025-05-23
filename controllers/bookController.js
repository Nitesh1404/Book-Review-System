const Book = require('../models/book');
const Review = require('../models/reviewModel');
const User = require('../models/userModel');
const APIFeature = require('../utils/apiFeature');


exports.getAllBooks = async (req, res) => {
	try {
		const feature = new APIFeature(Book.find(), req.query)
			.limitingFields()
			.pagination();

		const allBooks = await feature.query;
		res.status(200).json({
			status: "success",
			length: allBooks.length,
			data: {
				books: allBooks
			}
		});
	}
	catch (err) {
		console.log(`Error occured : ${err}`);
		res.status(500).json({
			status: "success",
			message: err.message
		});
	}
}

exports.getBook = async (req, res) => {
	try {
		const book = await Book.findById(req.params.id).populate('createdBy', 'name');

		if (!book) {
			res.status(404).json({
				status: "error",
				message: "Book not found"
			});
		}

		const reviews = await Review.find({ book: req.params.id })
			.populate('user', 'name')
			.sort({ createdAt: -1 });


		res.status(200).json({
			status: "success",
			data: {
				book: book,
				reviews
			}
		});
	}
	catch (err) {
		res.status(404).json({
			status: "error",
			message: " Cannot find book with this Id",
			error: err.message
		});
	}
}


exports.createBooks = async (req, res) => {
	try {
		const newBook = await Book.create({ ...req.body, createdBy: req.user.id });
		res.status(201).json({
			status: "success",
			data: {
				books: newBook
			}
		});
	}
	catch (err) {
		console.log(`Error occured : ${err}`);
		res.status(400).json({
			status: "error",
			message: err.message
		});
	}
}