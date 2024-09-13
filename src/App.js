import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Game from './components/Game';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
    const [user, setUser] = useState(null);

    return (
        <Router>
            <div>
                <h1>Number Guessing Game</h1>
                <Switch>
                    <Route path="/login">
                        <Login setUser={setUser} />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/">
                        {user ? <Game userId={user.id} highScore={user.highScore} /> : <Login setUser={setUser} />}
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default App;