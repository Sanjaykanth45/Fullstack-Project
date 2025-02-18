import React from "react";
import "./discountbanner.css";

const DiscountBanner = () => {
    return (
        <div className="discount-banner">
            <div className="discount-content">
                <h2>Get 20% Discount for Subscribers</h2>
                <p>Subscribe now and be the first to know about exclusive offers!</p>
            </div>
            <div className="discount-input">
                <input type="email" placeholder="Enter Your Email Address" />
                <button>SUBSCRIBE</button>
            </div>
        </div>
    );
};

export default DiscountBanner;
