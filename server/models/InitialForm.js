const mongoose = require('mongoose');
const UserSchema = require('./User').UserSchema;

const InitialFormSchema = new mongoose.Schema({
	leagueWinner: {
		type: String,
		required: true,
	},
	bestScorer: {
		type: String,
		required: true,
	},
	groupAOrder: {
		type: [String],
	},
	groupBOrder: {
		type: [String],
	},
	groupCOrder: {
		type: [String],
	},
	groupDOrder: {
		type: [String],
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
});

const InitialForm = mongoose.model('InitialForm', InitialFormSchema);

module.exports = InitialForm;
