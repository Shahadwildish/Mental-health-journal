import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './components/Homepage';
import MoodEntryList from './components/MoodEntryList';
import Reflections from './pages/Reflections';
import Profile from './pages/Profile';
import CreateMoodEntry from './pages/CreateMoodEntry';
import CreateReflection from './pages/CreateReflection';
import Login from './pages/Login';
import Register from './pages/Register';
import Homepage from './components/Homepage';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/moodEntries" element={<MoodEntryList />} />
          <Route path="/reflections" element={<Reflections />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-mood-entry" element={<CreateMoodEntry />} />
          <Route path="/create-reflection" element={<CreateReflection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Homepage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
