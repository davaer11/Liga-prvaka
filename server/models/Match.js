const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
	team1: {
		type: String,
		required: true,
	},
	team2: {
		type: String,
		required: true,
	},
	result: {
		type: String,
	},
});

const Match = mongoose.model('Match', MatchSchema);
module.exports = { Match, MatchSchema };
