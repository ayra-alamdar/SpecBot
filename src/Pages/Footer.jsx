import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <a href="#" className="social-link linkedin">
        <img src="linkedin-logo.png" alt="LinkedIn" className="icon" />
      </a>
      <a href="#" className="social-link github">
        <img src="github-logo.jpg" alt="GitHub" className="icon" />
      </a>
      <a href="#" className="social-link gmail">
        <img src="gmail-logo.png" alt="Gmail" className="icon" />
      </a>

      <div className="footer-text">
        <p>Copyright © 2024 SpecBot</p>
      </div>
    </footer>
  );
};

export default Footer;
