import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Product.css"; // Ensure CSS has modal styles
import Sidebar from "./sidebar";
import Navbar from "./navbar";

const Brand = () => {
    const [brand, setBrand] = useState({
        brandname: "",
        ownername: "",
        phone: "",
        city: "",
        status: "",
    });

    const [brands, setBrands] = useState([]);
    const [message, setMessage] = useState("");
    const [trigger, setTrigger] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null); // Track brand ID for editing

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/auth/getbrand");
                setBrands(res.data.brands);
                console.log("Fetched Brands:", res.data.brands); // ✅ Debugging
            } catch (error) {
                console.error("Error fetching brands:", error);
            }
        };

        fetchBrands();
    }, [trigger]); // ✅ Ensure trigger forces data reload

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBrand((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission (Add or Edit)
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isEditing) {
                // Update brand
                const res = await axios.put(`http://localhost:5000/api/auth/putbrand/${editId}`, brand);
                console.log("Updated Brand:", res.data);
                setMessage("Brand updated successfully!");
            } else {
                // Add new brand
                const res = await axios.post("http://localhost:5000/api/auth/brand", brand);
                console.log("New Brand Added:", res.data);
                setMessage("Brand added successfully!");
            }

            setTrigger((prev) => !prev); // ✅ Ensure re-fetch
            setShowModal(false);
            setIsEditing(false);
            setEditId(null);
            setBrand({ brandname: "", ownername: "", phone: "", city: "", status: "" });
        } catch (err) {
            console.error("Error:", err.response?.data || err.message);
            setMessage("Error processing brand.");
        }
    };

    // Handle Edit Button Click
    const handleEdit = (selectedBrand) => {
        setIsEditing(true);
        setEditId(selectedBrand._id);
        setBrand({ ...selectedBrand }); // ✅ Prevents state mutation
        setShowModal(true);
    };

    // Handle Delete Brand
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this brand?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/auth/deletebrand/${id}`);
            setMessage("Brand deleted successfully!");
            setTrigger((prev) => !prev); // ✅ Force refresh
        } catch (err) {
            console.error("Error deleting brand:", err.response?.data || err.message);
            setMessage("Error deleting brand.");
        }
    };

    return (
       
     

        <div className="dashboard">
           
      
         <Sidebar/>
       
            {/* Main Content */}
            <main className="content">
                <Navbar/>
                <header className="header">
                    <h2>Brand</h2>
                    <button
                        className="add-btn"
                        onClick={() => {
                            setIsEditing(false);
                            setBrand({ brandname: "", ownername: "", phone: "", city: "", status: "" });
                            setShowModal(true);
                        }}
                    >
                        Add Brand
                    </button>
                </header>

                {/* Add/Edit Modal */}
                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h2 className="modal-title">{isEditing ? "✏️ Edit Brand" : "✨ Add Brand"}</h2>

                            <form onSubmit={handleSubmit} className="brand-form-grid">
                                <div className="form-group">
                                    <label>Brand Name</label>
                                    <input type="text" name="brandname" placeholder="Enter Brand Name"
                                        value={brand.brandname} onChange={handleChange} required />
                                </div>

                                <div className="form-group">
                                    <label>Owner Name</label>
                                    <input type="text" name="ownername" placeholder="Enter Owner Name"
                                        value={brand.ownername} onChange={handleChange} required />
                                </div>

                                <div className="form-group">
                                    <label>Phone</label>
                                    <input type="number" name="phone" placeholder="Enter Phone Number"
                                        value={brand.phone} onChange={handleChange} required />
                                </div>

                                <div className="form-group">
                                    <label>City</label>
                                    <input type="text" name="city" placeholder="Enter City"
                                        value={brand.city} onChange={handleChange} required />
                                </div>

                                <div className="form-group">
                                    <label>Status</label>
                                    <select name="status" value={brand.status} onChange={handleChange} required>
                                        <option value="">Select Status</option>
                                        <option value="Active">Active</option>
                                        <option  value="Inactive">Inactive</option>
                                    </select>
                                </div>

                                {/* Modal Actions */}
                                <div className="modal-actions">
                                    <button type="submit" className="submit-btn">{isEditing ? "💾 Update" : "🚀 Submit"}</button>
                                    <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>❌ Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {message && <p className="message">{message}</p>}

                {/* Brand Table */}
                <table className="brand-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Owner Name</th>
                            <th>Brand Name</th>
                            <th>Phone</th>
                            <th>City</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brands.length === 0 ? (
                            <tr>
                                <td colSpan="7">No brands available</td>
                            </tr>
                        ) : (
                            brands.map((brand, index) => (
                                <tr key={brand._id}>
                                    <td>{index + 1}</td>
                                    <td>{brand.ownername}</td>
                                    <td>{brand.brandname}</td>
                                    <td>{brand.phone}</td>
                                    <td>{brand.city}</td>
                                    <td className={brand.status === "Active" ? "status-active" : "status-inactive"}>
                                        {brand.status}
                                    </td>
                                    <td>
                                        <button className="edit-btn" onClick={() => handleEdit(brand)}>✏️ Edit</button>
                                        <button className="delete-btn" onClick={() => handleDelete(brand._id)}>🗑 Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </main>
        </div>
       
    );
    
};

export default Brand;
