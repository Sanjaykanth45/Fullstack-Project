import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        console.log("Updated Cart:", cart);
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product, quantity) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item._id === product._id);
            if (existingItem) {
                return prevCart; // Prevent duplicate addition
            } else {
                return [...prevCart, { 
                    ...product, 
                    quantity: 1, // Ensure only one item is added
                    image: `http://localhost:5000/images/${product.image}`
                }];
            }
        });
    };
    

    // ✅ New function to update quantity
    const updateCartQuantity = (id, amount) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item._id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
            )
        );
    };

    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item._id !== id));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, updateCartQuantity, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
