import React, { useState } from "react";
import axios from "axios";
import "./Register.css";

const Register = () => {
    const [data, setData] = useState({ username: "", email: "", password: "", mobile: "", gender: "" });
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);  // Loading state

    const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

    const validate = () => {
        const errors = {};

        if (!data.username) {
            errors.username = "Username is required";
        } else if (/\d/.test(data.username)) {
            errors.username = "Username should not contain numbers";
        } else if (/[^a-zA-Z]/.test(data.username)) {
            errors.username = "Username should not contain special characters";
        }

        if (!data.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = "Email is invalid";
        }

        if (!data.password) {
            errors.password = "Password is required";
        } else if (data.password.length < 6) {
            errors.password = "Password must be at least 6 characters long";
        }

        if (!data.mobile) {
            errors.mobile = "Mobile number is required";
        } else if (!/^\d{10}$/.test(data.mobile)) {
            errors.mobile = "Mobile number must be 10 digits";
        }

        if (!data.gender) {
            errors.gender = "Gender is required";
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        setLoading(true);  // Start loading
        try {
            await axios.post("http://localhost:5000/api/auth/register", data);
            setMessage("Registration Successful!");
            setData({ username: "", email: "", password: "", mobile: "", gender: "" });
            setErrors({});  // Clear errors
        } catch {
            setMessage("Error during registration.");
        } finally {
            setLoading(false);  // Stop loading
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2 className="register-title">Register</h2>
                {message && <div className="register-alert">{message}</div>}
                <form onSubmit={handleSubmit}>
                    {["username", "email", "password", "mobile"].map((field) => (
                        <div key={field} className="form-field">
                            <input
                                type={field === "password" ? "password" : "text"}
                                name={field}
                                value={data[field]}
                                onChange={handleChange}
                                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                className="form-input"
                            />
                            {errors[field] && <div className="error-message">{errors[field]}</div>}
                        </div>
                    ))}
                    <div className="form-field">
                        <select name="gender" value={data.gender} onChange={handleChange} className="form-input">
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        {errors.gender && <div className="error-message">{errors.gender}</div>}
                    </div>
                    <button type="submit" className="register-button" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
                <p className="login-text">Already have an account? <a href="/login" className="login-link">Login</a></p>
            </div>
        </div>
    );
};

export default Register;
