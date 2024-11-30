import React from 'react';
import './Upload.css';
import Navbar from './NavBar';
import { useState, useEffect } from 'react';
import { auth } from './firebase-config';

const UploadFilesPage = () => {
    const [coreType, setCoreType] = useState('');
    const [ramType, setRamType] = useState('');
    const [code, setCode] = useState('');
    const [user, setUser] = useState(null);

    const handleUpload = async () => {
        const payload = {
            coreType,
            ramType,
            code,
        }
        try {
            const response = await fetch('http://localhost:5000/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })
            if (response.ok) {
                alert('File uploaded successfully!');
            }
            else {
                alert('Failed to upload the file.');
            }
        }
        catch (error) {
            console.error('Error uploading file:', error);
            alert('An error occurred. Please try again.');
        }
    };
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe(); // Cleanup on unmount
    }, []);
    return (
        <div className="upload-container">
            {/* Header */}
            <Navbar user={user} />

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
                    {/* Code Editor Section */}
                    <textarea
                        className="code-editor"
                        placeholder="Paste or type your code here"
                        value={code}  // Bind the textarea value to the state
                        onChange={(e) => setCode(e.target.value)}  // Update the state on change
                        rows="10"  // Adjust the size of the textarea
                    ></textarea>
                </div>

                {/* Upload Button */}
                <button className="upload-btn" onClick={handleUpload}>Upload</button>

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