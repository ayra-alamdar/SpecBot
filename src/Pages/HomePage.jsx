import React from 'react';
import Navbar from './NavBar'
import './HomePage.css';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
     const navigate = useNavigate();
    return (
        <div className="container">

            <Navbar />

            <div className="content">
                <h1 className="heading">Accelerate your Code's Performance with SpecBot!</h1>
                <div className="video-placeholder">Video Placeholder</div>
                <p className="description">
                    Optimize your software's performance by automatically converting sequential code into efficient, parallelized solutions based on your hardware specifications.
                </p>
                <button className="get-started-btn"   onClick={() => navigate('/upload')}>Get Started</button>

                <h2 className="subheading">Why use SpecBot?</h2>
                <ul className="features">
                    <li>-> Automates code parallelization for C/C++</li>
                    <li>-> Enhances code performance for specific hardware setups</li>
                    <li>-> Easy integration with Visual Studio Code</li>
                    <li>-> Works for computationally intensive tasks</li>
                </ul>

                <div className="promo-box">
                    <h3>Get Started today for</h3>
                    <h2>FREE!</h2>
                    <p>Join us in making coding more efficient</p>
                    <button className="try-free-btn">Try for Free</button>
                </div>

                <h2 className="extension-heading">Representation as an extension on Visual Studio Code</h2>
                <div className="video-demo-placeholder">Video Demo Placeholder</div>

                <h2 className="flow-heading">Our Flow Diagram</h2>
                <div className="image-placeholder">Image Placeholder</div>
            </div>

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

export default HomePage;
