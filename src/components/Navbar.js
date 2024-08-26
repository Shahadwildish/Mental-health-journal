import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <nav>
            {isAuthenticated && (
                <>
                    <Link to="/home">Home</Link>
                    <Link to="/MoodEntryList">My Mood Entries</Link>
                    <Link to="/reflections">My Reflections</Link>
                    <Link to="/profile">My Profile</Link>
                    <Link to="/create-mood-entry">Create Mood Entry</Link>
                    <Link to="/create-reflection">Create Reflection</Link>
                    <button onClick={logout}>Logout</button>
                </>
            )}
            {!isAuthenticated && (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/Register">Register</Link>
                </>)
            }
        </nav>
    );
};

export default Navbar;
