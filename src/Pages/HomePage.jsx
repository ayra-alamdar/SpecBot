import React, { useEffect, useState } from 'react';
import Navbar from './NavBar';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase-config';

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
            <div className="content">
                <h1 className="heading">Accelerate your Code's Performance with SpecBot!</h1>
                <div className="video-placeholder">Video Placeholder</div>
                <p className="description">
                    Optimize your software's performance by automatically converting sequential code into efficient, parallelized solutions based on your hardware specifications.
                </p>
                {/* If there's no user, show Login button */}
                {!user ? (
                    <div>
                        <p>Before Get started, Login with your credentials</p>
                        <button className="get-started-btn" onClick={() => navigate('/login')}>
                            Login
                        </button>
                    </div>
                ) : (
                    <button className="get-started-btn" onClick={() => navigate('/upload')}>
                        Get Started
                    </button>
                )}

                <h2 className="subheading">Why use SpecBot?</h2>
                <ul className="features">
                    <li> 1. Automates code parallelization for C/C++</li>
                    <li> 2. Enhances code performance for specific hardware setups</li>
                    <li> 3.Easy integration with Visual Studio Code</li>
                    <li> 4. Works for computationally intensive tasks</li>
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
