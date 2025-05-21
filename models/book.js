const mongoose = require('mongoose');

const bookSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true
		},
		author: String,
		description: String,
		publishedYear: String,
		genre: String,
		createdAt: {
			type: Date,
			default: Date.now()
		}
	}
)

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
