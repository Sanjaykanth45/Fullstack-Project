import React from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import "./Testimonials.css";

const testimonialsData = [
  {
    name: "John Doe",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    rating: 5,
    feedback: "SoleLuxe offers the best sneakers! Comfortable, stylish, and great customer service!",
  },
  {
    name: "Emily Smith",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    rating: 4,
    feedback: "I love my new shoes from SoleLuxe! They fit perfectly and the delivery was super fast!",
  },
  {
    name: "Michael Brown",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    rating: 5,
    feedback: "The quality of the shoes exceeded my expectations. Highly recommended!",
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials">
      <h2 className="testimonials-title">What Our Customers Say</h2>
      <div className="testimonials-container">
        {testimonialsData.map((testimonial, index) => (
          <div className="testimonial-card" key={index}>
            <FaQuoteLeft className="quote-icon" />
            <p className="testimonial-feedback">{testimonial.feedback}</p>
            <div className="testimonial-user">
              <img src={testimonial.image} alt={testimonial.name} className="user-img" />
              <h3>{testimonial.name}</h3>
              <div className="testimonial-rating">
                {Array(testimonial.rating)
                  .fill()
                  .map((_, i) => (
                    <FaStar key={i} className="star-icon" />
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
