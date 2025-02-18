import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Product.css";
import Sidebar from "./sidebar";
import Navbar from "./navbar";

    const Category = () => {
        const [product, setProduct] = useState({
            brandname: "",
            productname: "",
            description: "",
            image: null, // Ensure image is null initially
          
        });

    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState("");
    const [trigger, setTrigger] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null); // Track ID for editing

    // Fetch products from backend
    useEffect(() => {
        axios.get("http://localhost:5000/api/auth/getProduct")
            .then(response => setProducts(response.data.products))
            .catch(error => console.error("Error fetching products:", error));
    }, [trigger]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
          setProduct((prevData) => ({
            ...prevData,
            [name]: files[0],
          }));
        } else {
          setProduct((prevData) => ({
            ...prevData,
            [name]: value,
          }));
        }
      };

    // Handle form submission (Add/Edit)
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const formData = new FormData();
            formData.append("brandname", product.brandname);
            formData.append("productname", product.productname);
            formData.append("description", product.description);
            if (product.image) {
                formData.append("image", product.image);
            }

            if (isEditing) {
                // Update product
                const res = await axios.put(`http://localhost:5000/api/auth/putCategory/${editId}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                console.log("Updated Product:", res.data);
                setMessage("Product updated successfully!");
            } else {
                // Add new product
                const res = await axios.post("http://localhost:5000/api/auth/category", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                console.log("New Product Added:", res.data);
                setMessage("Product added successfully!");
            }

            setTrigger((prev) => !prev); // Refresh list
            setShowModal(false);
            setIsEditing(false);
            setEditId(null);
            setProduct({ brandname: "", productname: "", description: "", image: "null" });
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            setMessage("Error processing product.");
        }
    };

    // Handle Edit Button Click
    const handleEdit = (selectedProduct) => {
        setIsEditing(true);
        setEditId(selectedProduct._id);
        setProduct({
            brandname: selectedProduct.brandname,
            productname: selectedProduct.productname,
            description: selectedProduct.description,
            image: null, // Reset image input
        });
        setShowModal(true);
    };

    // Handle Delete Product
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/auth/deleteCategory/${id}`);
            setMessage("Product deleted successfully!");
            setTrigger((prev) => !prev);
        } catch (error) {
            console.error("Error deleting product:", error.response?.data || error.message);
            setMessage("Error deleting product.");
        }
    };

    return (
        <div className="dashboard">
            <Sidebar />

            <div className="content">
                <Navbar/>
                <div className="header">
                    <h2>Category List</h2>
                    <button className="add-btn" onClick={() => {
                        setIsEditing(false);
                        setProduct({ brandname: "", productname: "", description: "", image: null });
                        setShowModal(true);
                    }}>+ Add Product</button>
                </div>

                {message && <p className="message">{message}</p>}

                <table className="product-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>BRAND</th>
                            <th>PRODUCT NAME</th>
                            <th>Description Name</th>
                            <th>IMAGE</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan="5">No products available</td>
                            </tr>
                        ) : (
                            products.map((product, index) => (
                                <tr key={product._id}>
                                    <td>{index + 1}</td>
                                    <td>{product.brandname}</td>
                                    <td>{product.productname}</td>
                                    <td>{product.description}</td>
                                    <td><img src={`http://localhost:5000/images/${product.image}`} alt={product.productname} width="50" /></td>

                                    <td>
                                        <button className="edit-btn" onClick={() => handleEdit(product)}>✏️ Edit</button>
                                        <button className="delete-btn" onClick={() => handleDelete(product._id)}>🗑 Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2 className="modal-title">{isEditing ? "✏️ Edit Product" : "✨ Add Product"}</h2>
                        <form className="brand-form-grid" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Brand Name</label>
                                <input type="text" placeholder="Enter Brand Name" value={product.brandname} name="brandname" onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label>Product Name</label>
                                <input type="text" placeholder="Enter Product Name" value={product.productname} name="productname" onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <textarea placeholder="Enter Product Description" value={product.description} name="description" onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label>Product Image</label>
                                <input type="file" accept="image/*" name="image" onChange={handleChange} required={!isEditing} />
                            </div>

                            <div className="modal-actions">
                                <button type="submit" className="submit-btn">{isEditing ? "💾 Update" : "🚀 Submit"}</button>
                                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>❌ Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Category;
