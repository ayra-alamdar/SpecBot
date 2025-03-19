import React from "react";
import "./AboutUs.css";
import NavBar from "./NavBar";
import Footer from "./Footer";

const AboutUs = () => {
  return (
    <div className="about-container">
      <NavBar />
      <div className="about-content">
        <h1>About SpecBot</h1>
        <p>
          SpecBot is an advanced automation tool designed to generate optimized
          code based on user hardware specifications. Our mission is to
          streamline the coding process by automatically converting sequential
          code into efficient parallel implementations to achieve HPC.
        </p>
        <h2>Our Features</h2>
        <ul>
          <li>
            Automated parallelization using C++, OpenMP.
          </li>
          <li>Enhanced Loop level performance.</li>
          <li>Reduction of computational overhead and dependency conflicts.</li>
          <li>Race condition prevention and cache conflict resolution.</li>
          <li>Seamless integration as a Visual Studio Code extension.</li>
        </ul>
        <h2>Our Team</h2>
        <p>
          SpecBot is developed by a dedicated team of engineers passionate about
          automation and optimization. Under the supervision of Dr. Arshad
          Islam, our team is continuously improving SpecBot to enhance developer
          efficiency.
        </p>
        <h3>Team Members</h3>
        <ul>
          <li>Muhammad Abdur Rafey - 21I-0705</li>
          <li>Ayra Alamdar - 21I-2968</li>
          <li>Husnain Ali - 21I-0542</li>
        </ul>
        <h3>Supervisor</h3>
        <p>Dr. Arshad Islam</p>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
