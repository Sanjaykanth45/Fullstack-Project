import React, { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import "./checkout.css";

const Checkout = () => {
    const { cart } = useContext(CartContext);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        paymentMethod: "cod"
    });

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const total = subtotal + 50; // ₹50 delivery charge

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Order Placed Successfully!");
    };

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>
            
            <div className="checkout-content">
                {/* Billing & Shipping Address */}
                <div className="address-section">
                    <h3>Shipping Address</h3>
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
                        <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
                        <input type="text" name="address" placeholder="Street Address" value={formData.address} onChange={handleChange} required />
                        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
                        <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
                        <input type="text" name="zip" placeholder="ZIP Code" value={formData.zip} onChange={handleChange} required />
                        
                        <h3>Payment Method</h3>
                        <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
                            <option value="cod">Cash on Delivery (COD)</option>
                            <option value="upi">UPI (Google Pay, Paytm, PhonePe)</option>
                            <option value="card">Credit/Debit Card</option>
                        </select>

                        <button type="submit" className="place-order-btn">Place Order</button>
                    </form>
                </div>

                {/* Order Summary */}
                <div className="summary-section">
                    <h3>Order Summary</h3>
                    <ul>
                        {cart.map((item) => (
                            <li key={item._id}>
                                <img src={item.image} alt={item.productname} className="summary-img" />
                                <div>
                                    <p>{item.productname}</p>
                                    <p>₹{item.price} x {item.quantity}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <hr />
                    <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
                    <p>Delivery Charge: ₹50</p>
                    <h3>Total: ₹{total.toFixed(2)}</h3>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
