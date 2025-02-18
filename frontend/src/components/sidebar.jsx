import React from "react";
import { NavLink } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="logo">SoleLuxe</div>
            <p className="menu-title">MENU</p>
            <ul>
                <li>
                    <NavLink to="/brand" className={({ isActive }) => isActive ? "active" : ""}>
                        🛡️ Brand
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/product" className={({ isActive }) => isActive ? "active" : ""}>
                        📦 Product
                    </NavLink>
                </li>
               
            </ul>
        </div>
    );
};

export default Sidebar;
