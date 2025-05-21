const Book = require('../models/book');


exports.getAllBooks = async (req, res) => {
	try {
		const allBooks = await Book.find();
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
			message: "Error occured while accessing data !!"
		})
	}
}

exports.getBook = async (req, res) => {
	try {
		const book = await Book.findById(req.params.id);
		res.status(200).json({
			status: "success",
			data: {
				book: book
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
		const newBook = await Book.create(req.body);
		res.status(201).json({
			status: "success",
			data: {
				books: newBook
			}
		});
	}
	catch (error) {
		console.log(`Error occured : ${error}`);
		res.status(400).json({
			status: "error",
			message: "Some error occured while uploading"
		});
	}
}