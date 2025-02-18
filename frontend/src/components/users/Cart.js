import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import "./cart.css";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook


const Cart = () => {
    const navigate = useNavigate();
    const { cart, removeFromCart, updateCartQuantity } = useContext(CartContext);
    const [cartItems, setCartItems] = useState(cart);

    useEffect(() => {
        setCartItems(cart);
    }, [cart]);

    const handleQuantityChange = (id, amount) => {
        setCartItems(prevCart =>
            prevCart.map(item =>
                item._id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + amount) }
                    : item
            )
        );
        updateCartQuantity(id, amount);
    };

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="container">
           
            <h2>Your Order</h2>
            <div className="cart-container">
                <table className="cart-table">
                    <thead>
                        <tr>
                            <th>Serial</th>
                            <th>Product</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Brand</th>
                            <th>Quantity</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.length > 0 ? (
                            cartItems.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td><img src={item.image} alt={item.productname} className="cart-img" /></td>
                                    <td>{item.productname}</td>
                                    <td>₹{item.price}</td>
                                    <td>{item.brandname || "N/A"}</td>
                                    <td>
                                        <button className="quantity-btn minus-btn" onClick={() => handleQuantityChange(item._id, -1)}>
                                            <FontAwesomeIcon icon={faMinus} />
                                        </button>
                                        <span className="quantity-value">{item.quantity}</span>
                                        <button className="quantity-btn plus-btn" onClick={() => handleQuantityChange(item._id, 1)}>
                                            <FontAwesomeIcon icon={faPlus} />
                                        </button>
                                    </td>
                                    <td>
                                        <button className="btn btn-outline-success mx-2">
                                            <FontAwesomeIcon icon={faEye} />
                                        </button>
                                        <button className="btn btn-danger" onClick={() => removeFromCart(item._id)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">Your cart is empty</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="subtotal-container">
                <h4>Subtotal: <span className="subtotal-amount">₹{subtotal.toFixed(2)}</span></h4>
            <button className="checkout-btn" onClick={() => navigate("/checkout")}>
                Proceed to Checkout
            </button>
            </div>

        </div>
    );
};

export default Cart;
