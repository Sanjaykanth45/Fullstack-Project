import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import "./Product.css";

const Categorylist = () => {
    const [category, setCategory] = useState({
        categoryname: "",
        description: "",
        quantity: "",
        price: "",
        image: null,
    });

    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState("");
    const [trigger, setTrigger] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    // Fetch categories from backend
    useEffect(() => {
        axios.get("http://localhost:5000/api/auth/getCategory")
            .then(response => {
                console.log("Fetched Categories:", response.data);
                setCategories(response.data.categories);
            })
            .catch(error => console.error("Error fetching categories:", error));
    }, [trigger]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            setCategory(prev => ({ ...prev, [name]: files[0] }));
        } else {
            setCategory(prev => ({ ...prev, [name]: value }));
        }
    };

    // Handle form submission (Add/Edit)
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const formData = new FormData();
            formData.append("categoryname", category.categoryname);
            formData.append("description", category.description);
            formData.append("quantity", category.quantity);
            formData.append("price", category.price);
            if (category.image) {
                formData.append("image", category.image);
            }

            let response;
            if (isEditing) {
                response = await axios.put(`http://localhost:5000/api/auth/putCategory/${editId}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                setMessage("Category updated successfully!");
            } else {
                response = await axios.post("http://localhost:5000/api/auth/category", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                setMessage("Category added successfully!");
            }

            console.log("API Response:", response.data);
            setTrigger(prev => !prev);
            setShowModal(false);
            setIsEditing(false);
            setEditId(null);
            setCategory({ categoryname: "", description: "", quantity: "", price: "", image: null });
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            setMessage("Error processing category.");
        }
    };

    // Handle Edit Button Click
    const handleEdit = (selectedCategory) => {
        setIsEditing(true);
        setEditId(selectedCategory._id);
        setCategory({
            categoryname: selectedCategory.categoryname,
            description: selectedCategory.description,
            quantity: selectedCategory.quantity,
            price: selectedCategory.price,
            image: null, // Reset image input
        });
        setShowModal(true);
    };

    // Handle Delete Category
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this category?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/auth/deleteCategory/${id}`);
            setMessage("Category deleted successfully!");
            setTrigger(prev => !prev);
        } catch (error) {
            console.error("Error deleting category:", error.response?.data || error.message);
            setMessage("Error deleting category.");
        }
    };

    return (
        <div className="dashboard">
            <Sidebar />
            <div className="content">
                <Navbar />
                <div className="header">
                    <h2>Category List</h2>
                    <button className="add-btn" onClick={() => {
                        setIsEditing(false);
                        setCategory({ categoryname: "", description: "", quantity: "", price: "", image: null });
                        setShowModal(true);
                    }}>+ Add Category</button>
                </div>

                {message && <p className="message">{message}</p>}

                <table className="category-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>DESCRIPTION</th>
                            <th>QUANTITY</th>
                            <th>PRICE</th>
                            <th>IMAGE</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.length === 0 ? (
                            <tr>
                                <td colSpan="7">No categories available</td>
                            </tr>
                        ) : (
                            categories.map((category, index) => (
                                <tr key={category._id}>
                                    <td>{index + 1}</td>
                                    <td>{category.categoryname}</td>
                                    <td>{category.description}</td>
                                    <td>{category.quantity}</td>
                                    <td>{category.price}</td>
                                    <td>
                                        {category.image ? (
                                            <img src={`http://localhost:5000/images/${category.image}`} alt={category.categoryname} width="50" />
                                        ) : "No Image"}
                                    </td>
                                    <td>
                                        <button className="edit-btn" onClick={() => handleEdit(category)}>✏️ Edit</button>
                                        <button className="delete-btn" onClick={() => handleDelete(category._id)}>🗑 Delete</button>
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
                        <h2 className="modal-title">{isEditing ? "✏️ Edit Category" : "✨ Add Category"}</h2>
                        <form className="category-form-grid" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Category Name</label>
                                <input type="text" placeholder="Enter Category Name" value={category.categoryname} name="categoryname" onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <textarea placeholder="Enter Category Description" value={category.description} name="description" onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label>Quantity</label>
                                <input type="number" placeholder="Enter Quantity" value={category.quantity} name="quantity" onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label>Price</label>
                                <input type="number" step="0.01" placeholder="Enter Price" value={category.price} name="price" onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label>Category Image</label>
                                <input type="file" accept="image/*" name="image" onChange={handleChange} />
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

export default Categorylist;
