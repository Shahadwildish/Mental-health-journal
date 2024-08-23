import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './components/Homepage';
import MoodLogging from './components/MoodLogging';
import Reflections from './pages/Reflections';
import Profile from './pages/Profile';
import CreateMoodEntry from './pages/CreateMoodEntry';
import CreateReflection from './pages/CreateReflection';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mood-entries" element={<MoodLogging />} />
          <Route path="/reflections" element={<Reflections />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-mood-entry" element={<CreateMoodEntry />} />
          <Route path="/create-reflection" element={<CreateReflection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
