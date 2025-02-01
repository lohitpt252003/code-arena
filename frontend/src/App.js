import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Users from './Components/Users/Users';
import User from './Components/User/User';
import Problems from './Components/Problems/Problems';
import Problem from './Components/Problem/Problem';
import Editor from './Components/Editor/Editor';
import LandingPage from './Components/LandingPage/LandingPage';
import Contests from './Components/Contests/Contests';
import Contest from './Components/Contest/Contest';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/:user_id" element={<User />} /> {/* Ensure :user_id is here */}
                <Route path="/problems" element={<Problems />} /> {/* Ensure there's no trailing slash */}
                <Route path="/problems/:problem_id" element={<Problem />} /> {/* Ensure there's no trailing slash */}
                <Route path="/editor" element={<Editor />} /> {/* Ensure there's no trailing slash */}
                <Route path="/contests" element={<Contests />} />
                <Route path="/contests/:contest_id" element={<Contest />} />
            </Routes>
        </Router>
    );
};

export default App;