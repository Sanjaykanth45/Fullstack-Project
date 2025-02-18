import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3 style={{color:"white"}}>Get to Know Us</h3>
          <ul>
            <li>About SoleLuxe</li>
            <li>Careers</li>
            <li>Press Releases</li>
            <li>Our Commitment</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3 style={{color:"white"}}>Connect with Us</h3>
          <ul>
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Instagram</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3 style={{color:"white"}}>Make Money with Us</h3>
          <ul>
            <li>Sell on SoleLuxe</li>
            <li>Advertise Your Products</li>
            <li>Become an Affiliate</li>
            <li>Supply to SoleLuxe</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3 style={{color:"white"}}>Let Us Help You</h3>
          <ul>
            <li>Your Account</li>
            <li>Returns & Refunds</li>
            <li>Order Tracking</li>
            <li>Help Center</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-logo">SoleLuxe</div>
        <div className="footer-options">
          <button className="footer-btn">🌍 English</button>
          <button className="footer-btn">🇮🇳 India</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
