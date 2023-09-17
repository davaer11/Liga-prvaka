const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
    team1: {
        type:String,
        required: true
    },
    team2: {
        type:String, 
        required: true,
    },
    result: {
        type: String,
        required: true
    },

});

const Match = mongoose.model("Match", MatchSchema);
module.exports = Match;