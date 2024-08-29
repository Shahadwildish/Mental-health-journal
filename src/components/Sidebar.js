import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../Sidebar.css';  // Import the CSS file for styling

const Sidebar = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();  // Hook for programmatic navigation

    const handleLogout = () => {
        logout();  // Call the logout function
        navigate('/login');  // Redirect to the login page
    };

    return (
        <div className="sidebar">
            <div className="sidebar-content">
                {isAuthenticated && (
                    <>
                        <Link to="/home" className="sidebar-link">Home</Link>
                        <Link to="/mood-entries" className="sidebar-link">My Mood Entries</Link>
                        <Link to="/reflections" className="sidebar-link">My Reflections</Link>
                        <Link to="/profile" className="sidebar-link">My Profile</Link>
                        <Link to="/create-mood-entry" className="sidebar-link">Create Mood Entry</Link>
                        <Link to="/create-reflection" className="sidebar-link">Create Reflection</Link>
                        <button onClick={handleLogout} className="sidebar-button">Logout</button>
                    </>
                )}
                {!isAuthenticated && (
                    <>
                        <Link to="/login" className="sidebar-link">Login</Link>
                        <Link to="/register" className="sidebar-link">Register</Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
