const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({

    teams: {
        type: [String],
        required: true
    },
    matches: {
        // Tu stavit Match schemu tj. polje Match Schema 
    }

});