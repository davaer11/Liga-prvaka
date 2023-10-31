const mongoose = require('mongoose');
const UserSchema = require('./User').UserSchema;

const RoundResultsSchema = new mongoose.Schema({
	roundNumber: { type: Number },

	results: {
		type: [
			{
				id: { type: Number },
				match: { type: String },
				winningTeam: { type: String },
				result: { type: String },
			},
		],
	},
});

const RoundResults = mongoose.model('RoundResults', RoundResultsSchema);
module.exports = { RoundResults, RoundResultsSchema };
