import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
     const navigate = useNavigate();
    return (
        <nav className="navbar">
            <img src="logo192.png" alt="Logo" className="navbar-logo" />
            <span className="navbar-title">SpecBot</span>
            <div className="navbar-links">
                <span>About</span>
                <span>Contact</span>
                <button className="login-btn" onClick={() => navigate('/login')}>Login</button>
            </div>
        </nav>
    );
}

export default NavBar;