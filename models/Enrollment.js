const mongoose = require("mongoose");

// [SECTION] Blueprint/Schema
const enrollmentSchema = new mongoose.Schema({
	userId: {
		type: String,
		require: [true, 'User ID is Required']
	},
	enrolledCourses: [
		{
			courseId: {
				type: String,
				require: [true, 'Course ID is Required'],
			}
		}
	],
	totalPrice: {
		type: Number,
		require: [true, 'totalPrice is Required']	
	},
	enrolledOn: {
		type: Date,
		default: Date.now
	},
	status: {
		type: String,
		default: 'Enrolled'
	}
});

// [SECTION] Model
module.exports = mongoose.model('Enrollment', enrollmentSchema);