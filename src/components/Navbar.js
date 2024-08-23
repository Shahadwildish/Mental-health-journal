import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <nav>
            <Link to="/">Home</Link>
            {isAuthenticated && (
                <>
                    <Link to="/mood-entries">My Mood Entries</Link>
                    <Link to="/reflections">My Reflections</Link>
                    <Link to="/profile">My Profile</Link>
                    <Link to="/create-mood-entry">Create Mood Entry</Link>
                    <Link to="/create-reflection">Create Reflection</Link>
                    <button onClick={logout}>Logout</button>
                </>
            )}
            {!isAuthenticated && <Link to="/login">Login</Link>}
        </nav>
    );
};

export default Navbar;
