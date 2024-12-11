import React, { useEffect, useState } from "react";
import Navbar from "./NavBar";
import Footer from "./Footer";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase-config";

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Check if the user is logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  return (
    <div className="container">
      <Navbar user={user} />
      <div className="content-wrapper">
        <div className="content">
          <div className="heading-hp">
            Accelerate your Code's Performance with SpecBot!
          </div>

          <div className="bg-vid">
            <video className="video-demo" controls width="100%" src="./BG.mp4">
              Your browser does not support the video tag.
            </video>
          </div>

          <p className="description">
            Optimize your software's performance by automatically converting
            sequential code into efficient, parallelized solutions based on your
            hardware specifications.
          </p>
          {!user ? (
            <div className="login-cred">
              <p>Before we get started, Login with your credentials</p>
              <button
                className="get-started-btn"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </div>
          ) : (
            <button
              className="get-started-btn"
              onClick={() => navigate("/upload")}
            >
              Get Started
            </button>
          )}

          <h2 className="subheading">Why use SpecBot?</h2>
          <ul className="features">
            <li> 1. Automates code parallelization for C/C++</li>
            <li> 2. Enhances code performance for specific hardware setups</li>
            <li> 3. Easy integration with Visual Studio Code</li>
            <li> 4. Works for computationally intensive tasks</li>
          </ul>

          <div className="promo-box">
            <h3>Get Started today for</h3>
            <h2>FREE!</h2>
            <p>Join us in making coding more efficient</p>
            <button
              className="try-free-btn"
              onClick={() => navigate("/upload")}
            >
              Try for Free
            </button>
          </div>

          <h2 className="extension-heading">
            Representation as an extension on Visual Studio Code
          </h2>
          <div className="demo-video">
            <video
              className="demo"
              controls
              width="80%"
              src="./Ext_working.mp4"
            >
              Your browser does not support the video tag.
            </video>
          </div>

          <h2 className="flow-heading">Our Flow Diagram</h2>
          <div className="image-placeholder">
            <img
              className="flow-diagram"
              src="./WorkFlow.png"
              alt="Flow Diagram"
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
