const mongoose = require('mongoose');
const RoundResultsSchema = require('./RoundResults').RoundResultsSchema;

const UserSchema = new mongoose.Schema({
	userName: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	totalPoints: {
		type: Number,
		default: 0,
	},
	initialFormSubmitted: {
		type: Boolean,
		default: false,
	},
	roundResults: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'RoundResults',
		},
	],
});

const User = mongoose.model('User', UserSchema);

module.exports = { User, UserSchema };
