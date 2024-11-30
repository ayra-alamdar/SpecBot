import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css'; // Ensure you have styles for the avatar and navbar

const NavBar = ({ user }) => {
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <img src="logo192.png" alt="Logo" className="navbar-logo" />
            <span className="navbar-title">SpecBot</span>
            <div className="navbar-links">
                <span onClick={() => navigate('/about')}>About</span>
                <span onClick={() => navigate('/contact')}>Contact</span>
                {user ? (
                    // Display the avatar when user is logged in
                    <div className="avatar" title={user.email}>
                        {user.email[0].toUpperCase()}
                    </div>
                ) : (
                    // Display Login button when user is not logged in
                    <button className="login-btn" onClick={() => navigate('/login')}>
                        Login
                    </button>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
