const mongoose = require("mongoose");
//const InitialFormSchema = require('./InitialForm').InitialFormSchema;

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    totalPoints: {
        type: Number,
        default: 0
    },
    initialFormSubmitted: {
        type: Boolean,
        default: false
    },
    
});

const User = mongoose.model("User", UserSchema);

module.exports = {User, UserSchema};
