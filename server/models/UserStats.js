const mongoose = require('mongoose');
const UserSchema = require('./User').UserSchema;

const generateDefaultArray = (length, defaultValue) => {
	return new Array(length).fill(defaultValue);
};

const UserStatsSchema = new mongoose.Schema({
	pointsPerRounds: {
		type: [Number],
		default: () => generateDefaultArray(6, 0),
	},

	totalPoints: {
		type: Number,
		default: 0,
	},
});

const UserStats = mongoose.model('UserStats', UserStatsSchema);

module.exports = { UserStats };

//Ova schema još treba imat bodove za utakmice završnice lp
