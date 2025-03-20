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
          <li>Identifying parallelizable segments.</li>
          <li>Examining hardware specifications.</li>
          <li>Identifying computationally intensive code sections.</li>
          <li>Identifying data dependencies.</li>
          <li>Automating code parallelization.</li>
          <li>Assessing parallelized code performance.</li>
          <li>Displaying performance through comparison graphs.</li>
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
