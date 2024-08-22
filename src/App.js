// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MoodEntryForm from './components/MoodEntryForm';
import MoodEntryList from './components/MoodEntryList';
import Homepage from './components/Homepage'; // Create this component for the homepage
import './App.css'
const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/homepage">Home</Link></li>
            <li><Link to="/mood-entries">Mood Entries</Link></li>
            <li><Link to="/create-mood-entry">Create Mood Entry</Link></li>
          </ul>
        </nav>

        <main>
          <Routes>
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/mood-entries" element={<MoodEntryList />} />
            <Route path="/create-mood-entry" element={<MoodEntryForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
