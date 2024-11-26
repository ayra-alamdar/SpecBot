import React from 'react';
import './Login.css';
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
     const navigate = useNavigate();
    return (
        <div className="login-container">
            {/* Header */}
            <nav className="navbar">
                <img src="logo.png" alt="Logo" className="navbar-logo" />
                <span className="navbar-title">SpecBot</span>
                <div className="navbar-links">
                    <span>About</span>
                    <span>Contact</span>
                    <button className="login-btn">Login</button>
                </div>
            </nav>

            {/* Main Content */}
            <div className="login-content">
                <h1 className="login-heading">Get Started with SpecBot today!</h1>

                {/* Background Box */}
                <div className="login-box">
                    <p className="premium-text">To get a premium experience</p>
                    <p className="join-now-text">Join us now!</p>

                    {/* Input Fields */}
                    <input
                        type="text"
                        placeholder="enter username here"
                        className="login-input"
                    />
                    <input
                        type="password"
                        placeholder="enter password here"
                        className="login-input"
                    />

                    {/* Forgot Password Button */}
                    <button className="forgot-password-btn">Forgot Password?</button>

                    {/* Login Button */}
                    <button className="login-submit-btn">Login</button>

                    {/* Social Signup */}
                    <p className="signup-text">Or sign up now using:</p>
                    <div className="social-icons">
                        <img src="google-logo.png" alt="Google" className="social-icon" />
                        <img src="github-logo.png" alt="GitHub" className="social-icon" />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="footer">
                <a href="#" className="social-link youtube">YouTube</a>
                <a href="#" className="social-link facebook">Facebook</a>
                <a href="#" className="social-link gmail">Gmail</a>
                <a href="#" className="social-link linkedin">LinkedIn</a>
                <a href="#" className="social-link instagram">Instagram</a>
                <a href="#" className="social-link github">GitHub</a>
                <p>Copyright © 2024 SpecBot</p>
            </footer>
        </div>
    );
};

export default LoginPage