import React, { useState, useEffect } from "react";
import "./Analytics.css";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";

const Analytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [selectedFile, setSelectedFile] = useState("default"); // Default file selection
  const [availableFiles, setAvailableFiles] = useState([]); // Available input files for selection
  const [currentAnalysisIndex, setCurrentAnalysisIndex] = useState(0);
  const [messages, setMessages] = useState([
    "HPC systems can perform quadrillions of calculations per second, measured in petaFLOPS.",
    "The first supercomputer, the CDC 6600 (1964), was 1,000 times faster than other computers of its time.",
    "Japan's Fugaku supercomputer held the #1 spot on the TOP500 list from 2020-2021, reaching 442 petaFLOPS.",
    "MPI (Message Passing Interface) is the de facto standard for distributed memory parallel programming.",
    "GPUs can have thousands of cores, while CPUs typically have dozens, making GPUs ideal for parallel workloads.",
    "Amdahl's Law states that the maximum speedup is limited by the portion of code that cannot be parallelized.",
    "Exascale computing (systems capable of at least one exaFLOPS) was achieved in 2022 with Frontier supercomputer.",
    "Weather forecasting models use HPC to process trillions of calculations from millions of observations daily.",
    "The human brain operates at roughly an exaFLOPS, making it comparable to today's fastest supercomputers.",
    "OpenMP is a popular API for shared-memory parallel programming using compiler directives.",
    "Parallel computing faces challenges like race conditions, deadlocks, and load balancing.",
    "Quantum computing may eventually solve certain problems exponentially faster than classical supercomputers.",
    "The TOP500 list, ranking the world's fastest supercomputers, has been published twice yearly since 1993.",
    "CUDA, developed by NVIDIA, is a parallel computing platform enabling GPU acceleration.",
    "Cloud computing has democratized access to HPC through services like AWS ParallelCluster.",
    "Protein folding simulations in medical research can require millions of CPU hours.",
    "Distributed computing projects like Folding@home leverage thousands of volunteer computers worldwide.",
    "Modern HPC systems often consume megawatts of power, enough to power thousands of homes.",
    "Parallel file systems like Lustre can achieve I/O rates of hundreds of gigabytes per second.",
    "The energy efficiency of supercomputers is measured in FLOPS per watt on the Green500 list."
  ]);

  // Rotate through messages every 3 seconds while loading
  useEffect(() => {
    let interval = null;
    
    if (loading) {
      interval = setInterval(() => {
        setCurrentMessageIndex((prevIndex) => 
          prevIndex === messages.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [loading, messages.length]);

  // Fetch data based on selected file
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const formData = {
          P_Code: sessionStorage["ParallelCode"],
          S_Code: sessionStorage["serialCode"]
        };
        
        const response = await axios.post("http://localhost:5000/Analysis", {
          body: formData,
          headers: {
            "Content-Type": "application/json",
          },
        });
        
        setData(response.data);
        setAvailableFiles(response.data['Input File'] || []); // Update available files
        console.log(response.data);
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedFile]); // Re-fetch when selected file changes

  // Handle file selection change
  const handleFileChange = (e) => {
    setSelectedFile(e.target.value);
  };

  const handleNextAnalysis = () => {
    if (currentAnalysisIndex < data.S_Analysis.length - 1) {
      setCurrentAnalysisIndex(currentAnalysisIndex + 1);
    } else {
      setCurrentAnalysisIndex(0); // Reset to beginning
    }
  };

  return (
    <div>
      <NavBar />
      <div className="analytics-container">
        <div className="header-with-dropdown">
          <h1>Analytics Results</h1>
          <div className="file-selection">
            <label htmlFor="fileSelect">Select Input File: </label>
            <select 
              id="fileSelect" 
              value={selectedFile} 
              onChange={handleFileChange}
              disabled={loading}
            >
              {availableFiles.length > 0 ? (
                availableFiles.map(file => (
                  <option key={file.id} value={file.id}>
                    {file.name}
                  </option>
                ))
              ) : (
                <option value="default">No files available</option>
              )}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            {/* Rotating HPC facts card - only shown during loading */}
            <div className="loading-card">
              <h2>Did You Know?</h2>
              <p>{messages[currentMessageIndex]}</p>
            </div>
          </div>
        ) : error ? (
          <div className="error-message">Error: {error.message}</div>
        ) : (
          <>
            <h3>File: {availableFiles.find(file => file.id === selectedFile)?.name}</h3>
            <table className="results-table">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Serial</th>
                  <th>Parallel</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(data.S_Analysis[currentAnalysisIndex]).map((key) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{data.S_Analysis[currentAnalysisIndex][key]}</td>
                    <td>{data.P_Analysis[currentAnalysisIndex][key]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="next-analysis-button">
              <button 
                onClick={handleNextAnalysis}
                className="next-button"
              >
                Next Analysis
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Analytics;