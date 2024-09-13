import React, { useState } from 'react';
import axios from 'axios';
import Confetti from 'react-confetti';

const Game = ({ userId, highScore }) => {
    const [number, setNumber] = useState(Math.floor(Math.random() * 100) + 1);
    const [guess, setGuess] = useState('');
    const [score, setScore] = useState(0);
    const [message, setMessage] = useState('');
    const [showConfetti, setShowConfetti] = useState(false);

    const handleGuess = () => {
        if (parseInt(guess) === number) {
            setScore(score + 1);
            setMessage('Correct! Guess a new number.');
            setNumber(Math.floor(Math.random() * 100) + 1);
            if (score + 1 > highScore) {
                setShowConfetti(true);
                setTimeout(() => setShowConfetti(false), 3000);
                updateHighScore(score + 1);
            }
        } else {
            setMessage('Try again!');
        }
        setGuess('');
    };

    const updateHighScore = async (newScore) => {
        await axios.post('http://localhost:5000/api/auth/updateScore', { userId, score: newScore });
    };

    return (
        <div>
            {showConfetti && <Confetti />}
            <h2>Guess the Number (1-100)</h2>
            <input 
                type="number" 
                value={guess} 
                onChange={(e) => setGuess(e.target.value)} 
            />
            <button onClick={handleGuess}>Submit Guess</button>
            <p>{message}</p>
            <p>Current Score: {score}</p>
        </div>
    );
};

export default Game;