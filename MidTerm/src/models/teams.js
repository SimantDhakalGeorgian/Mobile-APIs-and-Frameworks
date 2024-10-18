const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    teamId: {
        type: Number,
        required: true,
        unique: true
    },
    teamName: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    founded: {
        type: String,
        required: true
    },
    coach: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Team', teamSchema);
