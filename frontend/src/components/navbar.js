import React from "react";
import "./navbar.css"; // Import styles
import { FaSearch, FaBell, FaShoppingCart, FaMoon, FaTh, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const handleLogout = () => {
    alert("Logging out..."); // Replace with actual logout logic
  };

  return (
    <nav className="navbar">
      {/* Left: Menu & Search */}
      <div className="navbar-left">
        <button className="menu-btn">☰</button>
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search..." />
        </div>
      </div>

      {/* Right: Icons & User Profile */}
      <div className="navbar-right">
        <img 
          src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg" 
          alt="Language" 
          className="flag-icon" 
        />

        <FaTh className="icon" />
        <FaShoppingCart className="icon" />
        <FaMoon className="icon" />
        <FaBell className="icon" />

        <div className="profile">
          <img 
            src="https://randomuser.me/api/portraits/women/45.jpg" 
            alt="User" 
            className="profile-img" 
          />
          <span className="profile-name">Sanjay</span>
        </div>

        {/* Logout Button */}
        <a style={{textDecoration:"none"}} href="/login">
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt className="logout-icon" /> Logout
        </button></a>
      </div>
    </nav>
  );
};

export default Navbar;
