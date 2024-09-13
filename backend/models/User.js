const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    highScore: { type: Number, default: 0 },
    pastScores: { type: [Number], default: [] }
});

module.exports = mongoose.model('User', UserSchema);