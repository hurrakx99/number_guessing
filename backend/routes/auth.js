const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const secret = process.env.JWT_SECRET || 'your_jwt_secret';

// Register
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User created' });
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, secret);
    res.json({ token, highScore: user.highScore, pastScores: user.pastScores });
});

// Update High Score
router.post('/updateScore', async (req, res) => {
    const { userId, score } = req.body;
    const user = await User.findById(userId);
    if (score > user.highScore) {
        user.highScore = score;
    }
    user.pastScores.push(score);
    await user.save();
    res.json({ highScore: user.highScore, pastScores: user.pastScores });
});

module.exports = router;