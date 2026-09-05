import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./usernavbar.css"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPhone, faEnvelope, faCartShopping, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { CartContext } from "./CartContext"; // ✅ Import CartContext

const UserNavbar = () => {
    const { cart } = useContext(CartContext); // ✅ Access cart
    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0); // Count items
    const scrollToSection = (event, sectionId) => {
        event.preventDefault();
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <nav className="navbar navbar-light sticky-top bg-white shadow-sm">
            <div className="container">
                {/* Top Row: Logo, Search Bar, Icons */}
                <div className="row w-100 align-items-center">
                    {/* Logo */}
                    <div className="col-md-3">
                        <a className="navbar-brand logo" href="#home">
                            SoleLuxe
                        </a>
                    </div>

                    {/* Search Bar */}
                    <div className="col-md-6 d-flex justify-content-center">
                        <div className="search-container">
                            <input type="text" className="form-control search-input" placeholder="Search Anything..." />
                            <button className="btn search-btn">
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </div>
                    </div>

                    {/* Icons (Cart & Logout) */}
                    <div className="col-md-3 d-flex justify-content-end">
                    <a id="cart-icon" href="/cart" className="nav-link mx-2 position-relative">
                            <FontAwesomeIcon className="icon" icon={faCartShopping} />
                            {/* ✅ Cart Count Badge */}
                            {cartItemCount > 0 && (
                                <span
                                    id="cart-count" // ✅ Add ID for Selenium tests
                                    className="badge bg-danger position-absolute top-0 start-100 translate-middle"
                                >
                                    {cartItemCount}
                                </span>
                            )}
                        </a>
                        <a href="/login" className="nav-link mx-2">
                            <FontAwesomeIcon className="icon logout-icon" icon={faArrowRightFromBracket} />
                        </a>
                    </div>
                </div>

                {/* Bottom Row: Navigation & Contact */}
                <div className="row w-100 mt-2">
                    {/* Navigation Menu */}
                    <div className="col-md-6">
                        <ul className="nav">
                            <li className="nav-item"><a className="nav-link" href="#home" onClick={(e) => scrollToSection(e, "home")}>Home</a></li>
                            <li className="nav-item"><a className="nav-link" href="#product" onClick={(e) => scrollToSection(e, "products")}>Product</a></li>
                            <li className="nav-item"><a className="nav-link" href="#about" onClick={(e) => scrollToSection(e, "about")}>About</a></li>
                            <li className="nav-item"><a className="nav-link" href="#contact" onClick={(e) => scrollToSection(e, "contact")}>Contact</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="col-md-6 d-flex justify-content-end">
                        <span className="contact-item">
                            <FontAwesomeIcon icon={faPhone} className="text-success me-1" />
                            (+91) 987 654 3210
                        </span>
                        <span className="contact-item ms-4">
                            <FontAwesomeIcon icon={faEnvelope} className="text-success me-1" />
                            soleluxe@gmail.com
                        </span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default UserNavbar;
