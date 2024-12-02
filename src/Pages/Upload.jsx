import React, { useState, useEffect } from "react";
import "./Upload.css";
import Navbar from "./NavBar";
import { auth } from "./firebase-config";

const UploadFilesPage = () => {
  const [coreType, setCoreType] = useState("");
  const [ramType, setRamType] = useState("");
  const [processorsCount, setProcessorsCount] = useState("");
  const [codeInput, setCodeInput] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleAutoRetrieve = () => {
    const userAgent = navigator.userAgent;
    const hardwareConcurrency = navigator.hardwareConcurrency || "Unknown";
    const totalRAM = navigator.deviceMemory || "Unknown";

    setCoreType(userAgent.includes("Win64") ? "64-bit" : "32-bit");
    setProcessorsCount(hardwareConcurrency);
    setRamType(`${totalRAM} GB`);
  };

  return (
    <div className="upload-container">
      <Navbar user={user} />
      <div className="content">
        <h1 className="heading">Fill in the Following Information:</h1>
        <button className="auto-retrieve-btn" onClick={handleAutoRetrieve}>
          Auto Retrieve
        </button>
        <br />
        <br />

        <div className="hardware-section">
          <div className="hardware-input">
            <div className="label">Core Type</div>
            <div className="input-display">
              <div className="grey-box">
                <div className="white-box">{coreType || "Enter Core Type"}</div>
              </div>
            </div>
          </div>

          <div className="hardware-input">
            <div className="label">RAM Type</div>
            <div className="input-display">
              <div className="grey-box">
                <div className="white-box">{ramType || "Enter RAM Type"}</div>
              </div>
            </div>
          </div>

          <div className="hardware-input">
            <div className="label">Number of Processors</div>
            <div className="input-display">
              <div className="grey-box">
                <div className="white-box">
                  {processorsCount || "Enter Number of Processors"}
                </div>
              </div>
            </div>
          </div>
        </div>

        <h1 className="heading">
          Upload your code file here to Convert your serial code into a parallel
          one to improve your code's performance
        </h1>
        <div className="code-section">
          <div className="code-editor">
            <div className="line-numbers">
              {Array.from({
                length: (codeInput.match(/\n/g) || []).length + 1,
              }).map((_, index) => (
                <div key={index} className="line-number">
                  {index + 1}
                </div>
              ))}
            </div>
            <textarea
              className="code-input"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              placeholder="Paste your code here..."
            />
          </div>
          <div className="code-editor">
            <div className="line-numbers">
              <div className="line-number">1</div>
            </div>
            <textarea
              className="code-input"
              placeholder="Your parallelized code will be here"
              disabled
            />
          </div>
        </div>
      </div>
      <div>
        {/* Footer */}
        <footer className="footer">
          <a href="#" className="social-link youtube">
            YouTube
          </a>
          <a href="#" className="social-link facebook">
            Facebook
          </a>
          <a href="#" className="social-link gmail">
            Gmail
          </a>
          <a href="#" className="social-link linkedin">
            LinkedIn
          </a>
          <a href="#" className="social-link instagram">
            Instagram
          </a>
          <a href="#" className="social-link github">
            GitHub
          </a>
          <p>Copyright © 2024 SpecBot</p>
        </footer>
      </div>
    </div>
  );
};

export default UploadFilesPage;
