const mongoose = require("mongoose");

// [SECTION] Blueprint/Schema
const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, 'firstName is Required']
	},
	lastName: {
		type: String,
		required: [true, 'lastName is Required']
	},
	email: {
		type: String,
		required: [true, 'email is Required']
	},
	password: {
		type: String,
		required: [true, 'password is Required']
	},
	isAdmin: {
		type: Boolean,
		default: false
	},
	mobileNo: {
		type: String,
		required: [true, 'mobileNo. is Required']
	},
	status: {
		type: String,
		default: 'pending'
	}
});

// [SECTION] Model
module.exports = mongoose.model('User', userSchema);