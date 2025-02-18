import React from "react";
import { FaUsers, FaHandshake, FaRocket, FaBook } from "react-icons/fa";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <section id="about" className="about-us">
      <div className="about-overlay"></div>
      <div className="about-content">
        <h1 className="about-title">Our Company Values</h1>
        <div className="about-values">
          <div className="value-item">
            <FaUsers className="value-icon" />
            <div className="value-text">
              <h3>Transparency</h3>
              <p>Openness with our team & clients. We raise issues & provide solutions promptly.</p>
            </div>
          </div>
          <div className="value-item">
            <FaHandshake className="value-icon" />
            <div className="value-text">
              <h3>Commitment</h3>
              <p>Our word and hard work over everything else. Our clients and vision guide us.</p>
            </div>
          </div>
          <div className="value-item">
            <FaBook className="value-icon" />
            <div className="value-text">
              <h3>Self Improvement</h3>
              <p>Never stop learning and evolving into who we want to be and where we want to be.</p>
            </div>
          </div>
          <div className="value-item">
            <FaRocket className="value-icon" />
            <div className="value-text">
              <h3>Over Deliver</h3>
              <p>Deliver more value than expected. Every day, over every delivery.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
