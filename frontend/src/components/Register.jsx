import React, { useState } from "react";
import axios from "axios";
import "./Register.css";

const Register = () => {
    const [data, setData] = useState({ username: "", email: "", password: "", mobile: "", gender: "" });
    const [message, setMessage] = useState("");

    const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/auth/register", data);
            setMessage("Registration Successful! 🎉");
        } catch {
            setMessage("Error during registration.");
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2 className="register-title"> Register</h2>
                {message && <div className="register-alert">{message}</div>}
                <form onSubmit={handleSubmit}>
                    {["username", "email", "password", "mobile"].map((field) => (
                        <input key={field} type={field === "password" ? "password" : "text"} name={field} value={data[field]} onChange={handleChange} placeholder={field.charAt(0).toUpperCase() + field.slice(1)} className="form-input" />
                    ))}
                    <select name="gender" value={data.gender} onChange={handleChange} className="form-input">
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    <button type="submit" className="register-button">Register</button>
                </form>
                <p className="login-text">Already have an account? <a href="/login" className="login-link">Login</a></p>
            </div>
        </div>
    );
};

export default Register;
