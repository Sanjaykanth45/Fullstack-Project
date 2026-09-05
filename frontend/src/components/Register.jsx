import React, { useState } from "react";
import axios from "axios";
import "./Register.css";

const Register = () => {
    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
        mobile: "",
        gender: ""
    });
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const errors = {};

        // Username validation
        if (!data.username) {
            errors.username = "Username is required";
        } else if (/\d/.test(data.username)) {
            errors.username = "Username should not contain numbers";
        } else if (/[^a-zA-Z]/.test(data.username)) {
            errors.username = "Username should not contain special characters";
        }

        // Email validation
        if (!data.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = "Email is invalid";
        }

        // Password validation
        if (!data.password) {
            errors.password = "Password is required";
        } else if (data.password.length < 6) {
            errors.password = "Password must be at least 6 characters long";
        }

        // Mobile number validation
        if (!data.mobile) {
            errors.mobile = "Mobile number is required";
        } else if (!/^\d{10}$/.test(data.mobile)) {
            errors.mobile = "Mobile number must be exactly 10 digits";
        }

        // Gender validation
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

        setLoading(true);
        try {
            await axios.post("http://localhost:5000/api/auth/register", data);
            setMessage("Registration Successful!");
            setData({ username: "", email: "", password: "", mobile: "", gender: "" });
            setErrors({});
        } catch {
            setMessage("Error during registration.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2 className="register-title">Register</h2>
                {message && <div className="register-alert">{message}</div>}
                <form onSubmit={handleSubmit}>
                    {/* Username */}
                    <div className="form-field">
                        <input
                            type="text"
                            name="username"
                            value={data.username}
                            onChange={handleChange}
                            placeholder="Username"
                            className="form-input"
                        />
                        {errors.username && <div className="error-message">{errors.username}</div>}
                    </div>

                    {/* Email */}
                    <div className="form-field">
                        <input
                            type="text"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="form-input"
                        />
                        {errors.email && <div className="error-message">{errors.email}</div>}
                    </div>

                    {/* Password */}
                    <div className="form-field">
                        <input
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="form-input"
                        />
                        {errors.password && <div className="error-message">{errors.password}</div>}
                    </div>

                   {/* Mobile */}
                    <div className="form-field">
                        <input
                            type="text"
                            name="mobile"
                            value={data.mobile}
                            onChange={handleChange}
                            onKeyPress={(e) => {
                                if (!/[0-9]/.test(e.key)) {
                                    e.preventDefault(); // Prevent non-numeric key
                                }
                            }}
                            placeholder="Mobile"
                            className="form-input"
                            maxLength="10"  // Added maxLength attribute
                        />
                        {errors.mobile && <div className="error-message">{errors.mobile}</div>}
                    </div>

                    {/* Gender */}
      <div className="form-field">
        <select
          name="gender"
          value={data.gender}
          onChange={handleChange}
          className="form-input"
        >
          <option value="">Select Gender</option> {/* Default */}
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && <div className="error-message">{errors.gender}</div>}
      </div>
   

                    {/* Submit Button */}
                    <button type="submit" className="register-button" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>

                <p className="login-text">
                    Already have an account? <a href="/login" className="login-link">Login</a>
                </p>
            </div>
        </div>
    );
};

export default Register;
