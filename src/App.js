import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './Home';
import Test from './Test';

function App() {
    return (
    <Router>
        <Routes >
            <Route path="/" element={<Test />} />
            <Route path="/home" element={<Home />} />
        </Routes>
    </Router>
    );
}

export default App;
