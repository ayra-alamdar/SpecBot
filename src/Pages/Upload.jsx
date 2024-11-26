import React from 'react';
import './Upload.css';

const UploadFilesPage = () => {
    return (
        <div className="upload-container">
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
            <div className="upload-content">
                {/* Heading */}
                <h1 className="upload-heading">Fill in the following information:</h1>

                {/* Core Type */}
                <div className="input-group">
                    <div className="input-label">Core Type</div>
                    <input
                        type="text"
                        placeholder="enter the type of core of your hardware"
                        className="input-box"
                    />
                </div>

                {/* RAM Type */}
                <div className="input-group">
                    <div className="input-label">RAM Type</div>
                    <input
                        type="text"
                        placeholder="enter the type of RAM of your hardware"
                        className="input-box"
                    />
                </div>

                {/* File Upload Section */}
                <h1 className="upload-subheading">Upload your files here:</h1>
                <div className="upload-box">
                    <p className="upload-instructions">
                        Convert your serial code into a parallel one to improve your code’s performance
                    </p>
                    <div className="code-editor">
                        <span className="line-number">1</span>
                        <span className="placeholder-text">Paste your code here</span>
                    </div>
                </div>

                {/* Upload Button */}
                <button className="upload-btn">Upload</button>
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

export default UploadFilesPage;