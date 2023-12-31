const mongoose = require('mongoose');
const RoundResultsSchema = require('./RoundResults').RoundResultsSchema;

const bcrypt = require('bcrypt');

const generateDefaultBooleanArray = (length, defaultValue) => {
	return new Array(length).fill(defaultValue);
};

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
	pointsAreCalculated: {
		type: [Boolean],
		default: () => generateDefaultBooleanArray(6, false),
	},
	roundResults: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'RoundResults',
		},
	],
	userStats: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'UserStats',
	},
});

UserSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}
	try {
		const hashedPassword = await bcrypt.hash(this.password, 10);
		this.password = hashedPassword;
		next();
	} catch (error) {
		return next(error);
	}
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };
