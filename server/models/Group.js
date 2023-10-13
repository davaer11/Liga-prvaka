const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
	groupName: {
		type: String,
	},

	teams: {
		type: [String],
		required: true,
	},
	matches: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Match',
		},
	],
});

const Group = mongoose.model('Group', GroupSchema);

module.exports = { Group, GroupSchema };
