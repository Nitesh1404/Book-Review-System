const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const url = process.env.MONGODBURL;

const connectToMongoDB = async () => {
	if (!url) {
		console.error("❌ MONGODB URI is not defined in .env");
		process.exit(1);
	}

	try {
		await mongoose.connect(url);
		console.log("✅ Database connected successfully!");
	} catch (error) {
		console.error("❌ Error connecting to the database:", error.message);
		process.exit(1);
	}
};

module.exports = connectToMongoDB;
