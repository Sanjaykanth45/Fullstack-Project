import React, { useContext, useEffect, useState } from "react";
import "./productlist.css";
import { CartContext } from "./CartContext";
import axios from "axios";

const ProductList = () => {
    const { addToCart, removeFromCart } = useContext(CartContext); 
    const [products, setProducts] = useState([]);
    const [clickedButtons, setClickedButtons] = useState({});

    useEffect(() => {
        console.log("Fetching Products");
        const fetchProducts = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/auth/getProduct");
                console.log("API Response:", res.data);
                
                if (Array.isArray(res.data)) {
                    setProducts(res.data);
                } else if (res.data.products && Array.isArray(res.data.products)) {
                    setProducts(res.data.products);
                } else {
                    console.error("Unexpected response format:", res.data);
                }
            } catch (err) {
                console.error("Error fetching Products:", err);
            }
        };

        fetchProducts();
    }, []);

    const handleCartToggle = (product) => {
        setClickedButtons((prev) => {
            const newState = { ...prev };
            if (newState[product._id]) {
                removeFromCart(product._id);
                delete newState[product._id];
            } else {
                addToCart(product, 1);  // Only add the product once
                newState[product._id] = true;
            }
            return newState;
        });
    };
    

    return (
        <div id="productlist" className="container mt-4">
            <div className="row">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product._id} className="col-md-3">
                            <div className="product-card">
                                <span className="sale-badge">Sale</span>
                                <img src={`http://localhost:5000/images/${product.image}`} 
                                     alt={product.productname} 
                                     className="product-img" />
                                <h5>{product.productname}</h5>
                                <p>Brand: {product.brandname}</p>
                                <p className="price">Price: ₹{product.price}</p>

                                <button 
                                    className={`btn ${clickedButtons[product._id] ? "btn-added" : "btn-success"}`}
                                    onClick={() => handleCartToggle(product)}
                                >
                                    {clickedButtons[product._id] ? "✔ Added" : "🛒 Add to Cart"}
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No products available</p>
                )}
            </div>
        </div>
    );
};

export default ProductList;
