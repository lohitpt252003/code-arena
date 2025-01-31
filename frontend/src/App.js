import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Users from './Components/Users/Users';
import User from './Components/User/User';
import Problems from './Components/Problems/Problems';
import Problem from './Components/Problem/Problem';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/users" element={<Users />} />
                <Route path="/users/:user_id" element={<User />} /> {/* Ensure :user_id is here */}
                <Route path="/problems" element={<Problems />} /> {/* Ensure there's no trailing slash */}
                <Route path="/problems/:problem_id" element={<Problem />} /> {/* Ensure there's no trailing slash */}
            </Routes>
        </Router>
    );
};

export default App;