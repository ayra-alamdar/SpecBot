import React from 'react';
import './Upload.css';
import Navbar from './NavBar';
import { useState, useEffect } from 'react';
import { auth } from './firebase-config';

const UploadFilesPage = () => {
    const [coreType, setCoreType] = useState('');
    const [ramType, setRamType] = useState('');
    const [processorsCount, setProcessorsCount] = useState('');
    const [code, setCode] = useState('');
    const [user, setUser] = useState(null);

    const handleUpload = async () => {
        // Get the values from the input fields
        const coreType = document.querySelector('.input-box-Core').value;
        const ramType = document.querySelector('.input-box-RAM').value;
        const processorsCount = document.querySelector('.input-box-processor').value;

        const payload = {
            coreType,
            ramType,
            processorsCount,
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

    // on Click of the Auto Retrieve Button get the Hardware Information of the User
    const handleAutoRetrieve = async () => {
        // Get hardware information using the navigator API
        const userAgent = navigator.userAgent;
        let CPUType = "Unknown";

        if (userAgent.includes("Win64") || userAgent.includes("WOW64")) {
            CPUType = "64-bit";
        } else if (userAgent.includes("Win32") || userAgent.includes("WOW32")) {
            CPUType = "32-bit";
        }
        const hardwareConcurrency = navigator.hardwareConcurrency; // Number of logical processors

        // Get total RAM in GB (approximation)
        const totalRAM = (navigator.deviceMemory || 0).toFixed(2); // Convert to GB

        // Output the details
        console.log(`CPU Type: ${CPUType}`);
        console.log(`Number of Logical Processors: ${hardwareConcurrency}`);
        console.log(`Total RAM: ${totalRAM} GB`);

        // Set the state
        setCoreType(`${hardwareConcurrency}`);
        setRamType(totalRAM);

        // placing values on the input fields
        document.querySelector('.input-box-Core').value = `${CPUType}`;
        document.querySelector('.input-box-processor').value = `${hardwareConcurrency}`;
        document.querySelector('.input-box-RAM').value = `${totalRAM} GB`;


        // Display the information to the user
        // alert(`Number of Logical Processors: ${hardwareConcurrency}\nTotal RAM: ${totalRAM} GB`);
    };

    return (
        <div className="upload-container">
            {/* Header */}
            <Navbar user={user} />

            {/* Main Content */}
            <div className="upload-content">
                {/* Heading */}
                <h1 className="upload-heading">Fill in the following information:</h1>

                {/* Hardware Information Section */}

                {/* Automatic Reterival of Hardware Information */}
                <button className="auto-retrieve-btn"
                onClick={handleAutoRetrieve}
                >Auto Retrieve</button>

                {/* Core Type */}
                <div className="input-group">
                    <div className="input-label">Core Type</div>
                    <input
                        type="text"
                        placeholder="enter the type of core of your hardware"
                        className="input-box-Core"
                    />
                </div>

                {/* RAM Type */}
                <div className="input-group">
                    <div className="input-label">RAM Type</div>
                    <input
                        type="text"
                        placeholder="enter the type of RAM of your hardware"
                        className="input-box-RAM"
                    />
                </div>
                                {/* Number of Processors*/}
                <div className="input-group">
                    <div className="input-label">RAM Type</div>
                    <input
                        type="text"
                        placeholder="enter the nu,ber of processors in your cpu"
                        className="input-box-processor"
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