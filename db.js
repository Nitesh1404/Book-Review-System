const mongoose = require('mongoose');

const url = "mongodb://127.0.0.1:27017/book-review-system";

const connectToMongoDB = () => {
	mongoose.connect(url);
	if (mongoose.connection) {
		console.log("Database connected successfully !!");
	}
	else {
		console.log("error in connecting database!!😒");
	}
}

module.exports = connectToMongoDB;