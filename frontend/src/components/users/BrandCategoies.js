import React from "react";
import "./BrandCategories.css";

const categories = [
  {
    image: "https://m.media-amazon.com/images/S/al-eu-726f4d26-7fdb/c5303c56-2cef-461e-abf0-44e36492a038._CR0,0,1200,628_SX920_QL70_.jpg",
    brand: "Neeman's",
    description: "Sustainable and stylish footwear.",
  },
  {
    image: "https://m.media-amazon.com/images/S/al-eu-726f4d26-7fdb/bfa1f195-952e-4d45-bc17-11b6dbb08fb5._CR0,1,1600,837_SX920_QL70_.jpeg",
    brand: "Athco",
    description: "Performance running shoes with memory foam.",
  },
  {
    image: "https://m.media-amazon.com/images/S/al-eu-726f4d26-7fdb/8e8b1aeb-fb32-4352-a271-6ee35e03d8e4._CR0,0,1200,628_SX920_QL70_.jpg",
    brand: "Addidas",
    description: "Comfortable slip-on shoes for everyday wear.",
  },
];

const BrandCategories = () => {
  return (
    <div className="brand-container">
      <h2 className="brand-title">Brands in this category</h2>
      <div className="brand-list">
        {categories.map((category, index) => (
          <div key={index} className="brand-card">
            <img src={category.image} alt={category.brand} className="brand-image" />
            <div className="brand-overlay">
              <p>{category.description}</p>
            </div>
            <div className="brand-name">{category.brand}</div> {/* Moved brand name below */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandCategories;
