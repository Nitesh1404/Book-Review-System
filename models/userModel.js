const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "The user Should have name "]
	},
	email: {
		type: String,
		unique: [true, " The email should ne unique"],
		required: [true, "User should have email"]
	},
	password: {
		type: String,
		required: [true, "user should have password"]
	}
});

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();
	this.password = await bcrypt.hash(this.password, 12);
	next();
});

userSchema.methods.correctPassword = function (enteredPassword) {
	return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;