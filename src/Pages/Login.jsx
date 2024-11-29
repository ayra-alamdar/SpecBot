import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider, githubProvider } from "./firebase-config";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const LoginPage = () => {
    const navigate = useNavigate();
    const [isSignup, setIsSignup] = useState(false); // Toggle between Login and Signup modes
    const [formData, setFormData] = useState({ email: "", password: "", name: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEmailAuth = async () => {
        try {
            if (isSignup) {
                // Sign up with Email and Password
                await createUserWithEmailAndPassword(auth, formData.email, formData.password);
                alert("Signup successful!");
            } else {
                // Log in with Email and Password
                await signInWithEmailAndPassword(auth, formData.email, formData.password);
                alert("Login successful!");
            }
            navigate("/dashboard");
        } catch (error) {
            alert(error.message);
        }
    };

    const handleOAuth = async (provider) => {
        try {
            await signInWithPopup(auth, provider);
            alert("Authentication successful!");
            navigate("/dashboard");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="login-container">
            <nav className="navbar">
                <img src="logo.png" alt="Logo" className="navbar-logo" />
                <span className="navbar-title">SpecBot</span>
            </nav>
            <div className="login-content">
                <h1>{isSignup ? "Sign Up for SpecBot!" : "Log In to SpecBot!"}</h1>
                <div className="login-box">
                    {isSignup && (
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            className="login-input"
                            onChange={handleChange}
                        />
                    )}
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="login-input"
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        className="login-input"
                        onChange={handleChange}
                    />
                    <button className="login-submit-btn" onClick={handleEmailAuth}>
                        {isSignup ? "Sign Up" : "Log In"}
                    </button>
                    <p>Or {isSignup ? "sign up" : "log in"} using:</p>
                    <div className="social-icons">
                        <img
                            src="google-logo.png"
                            alt="Google"
                            className="social-icon"
                            onClick={() => handleOAuth(googleProvider)}
                        />
                        <img
                            src="github-logo.png"
                            alt="GitHub"
                            className="social-icon"
                            onClick={() => handleOAuth(githubProvider)}
                        />
                    </div>
                    <p>
                        {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
                        <span className="toggle-link" onClick={() => setIsSignup(!isSignup)}>
                            {isSignup ? "Log In" : "Sign Up"}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
