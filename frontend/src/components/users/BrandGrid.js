import React from "react";
import "./brandgrid.css"; // Updated styles

const brands = [
    { name: "Reebok", image: "https://m.media-amazon.com/images/I/51GwXJN4cwL._AC_UL480_FMwebp_QL65_.jpg", items: 40 },
    { name: "Jordan", image: "https://m.media-amazon.com/images/I/71slxw7HqTL._AC_UL480_FMwebp_QL65_.jpg", items: 20 },
    { name: "Adidas", image: "https://m.media-amazon.com/images/I/51KwPRfaUdL._AC_UL480_FMwebp_QL65_.jpg", items: 55 },
    { name: "Nike", image: "https://m.media-amazon.com/images/I/612xnCXWuXL._AC_UL480_FMwebp_QL65_.jpg", items: 35 },
    { name: "Puma", image: "https://m.media-amazon.com/images/I/51QZn2sqF1L._AC_UL480_FMwebp_QL65_.jpg", items: 28 }
];

const BrandGrid = () => {
    return (
        <div className="brand-container">
            <h2>Shop By Brands</h2>
            <div className="brand-grid">
                {brands.map((brand, index) => (
                    <div key={index} className="brand-item">
                        <img src={brand.image} alt={brand.name} onError={(e) => e.target.src = "/images/default.png"} />
                        <h3>{brand.name}</h3>
                        <p>({brand.items} items)</p>
                    </div>
                ))}
            </div>
            <button className="view-all-btn">View All Brands</button>
        </div>
    );
};

export default BrandGrid;
