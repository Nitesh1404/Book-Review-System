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
		averageRating: {
			type: Number,
			default: 0
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User', // like a foreign key to user
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now()
		}
	}
)

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
