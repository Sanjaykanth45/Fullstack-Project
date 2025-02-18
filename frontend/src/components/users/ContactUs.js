import React from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaQuestionCircle } from "react-icons/fa";
import "./Contactus.css";

const ContactUs = () => {
  return (
    <section id="contact" className="contact-us">
      <div className="contact-container">
        <h1 className="contact-title">How Can We Help You?</h1>
        
        {/* Contact Options */}
        <div className="contact-options">
          <div className="contact-item">
            <FaPhone className="contact-icon" />
            <h3>Call Us</h3>
            <p>+1 800-123-4567</p>
          </div>
          <div className="contact-item">
            <FaEnvelope className="contact-icon" />
            <h3>Email Support</h3>
            <p>support@soleluxe.com</p>
          </div>
          <div className="contact-item">
            <FaMapMarkerAlt className="contact-icon" />
            <h3>Visit Our Office</h3>
            <p>123 Fashion Street, New York, NY</p>
          </div>
          <div className="contact-item">
            <FaQuestionCircle className="contact-icon" />
            <h3>Help Center</h3>
            <p>Find answers in our <a href="/faq">FAQ section</a>.</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form">
          <h2>Send Us a Message</h2>
          <form>
            <div className="form-group">
              <label>Name</label>
              <input type="text" placeholder="Enter your name" required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Enter your email" required />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea placeholder="Your message..." rows="4" required></textarea>
            </div>
            <button type="submit" className="contact-btn">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
