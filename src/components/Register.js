import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/api/auth/register', { username, password });
        alert('User registered!');
    };

    return (
        <form onSubmit={handleRegister}>
            <h2>Register</h2>
            <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Username" 
            />
            <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Password" 
            />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;