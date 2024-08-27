import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();  // Hook for programmatic navigation

    const handleLogout = () => {
        logout();  // Call the logout function
        navigate('/login');  // Redirect to the login page
    };

    return (
        <nav>
            {isAuthenticated && (
                <>
                    <Link to="/home">Home</Link>
                    <Link to="/mood-entries">My Mood Entries</Link>
                    <Link to="/reflections">My Reflections</Link>
                    <Link to="/profile">My Profile</Link>
                    <Link to="/create-mood-entry">Create Mood Entry</Link>
                    <Link to="/create-reflection">Create Reflection</Link>
                    <button onClick={handleLogout}>Logout</button> {/* Updated button */}
                </>
            )}
            {!isAuthenticated && (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/Register">Register</Link>
                </>
            )}
        </nav>
    );
};

export default Navbar;
