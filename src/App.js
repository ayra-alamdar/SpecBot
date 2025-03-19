import React from "react";
import "./App.css";
import HomePage from "./Pages/HomePage";
import ParallelCodePage from "./Pages/ParallelCodePage";
import UploadFilesPage from "./Pages/Upload"; // Import the UploadPage component
import Login from "./Pages/Login"; // Import the Login component
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AboutUs from "./Pages/AboutUs";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/upload" element={<UploadFilesPage />} />
          <Route path="/parallel-code" element={<ParallelCodePage />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
