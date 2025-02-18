import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./user.css"; // Custom styles
import UserNavbar from "./usernavbar";
import background from "./images/background.png"; // Shoe image
import ProductList from "./ProductList";
import carousel1 from "./images/carousel1.png";
import carousel3 from "./images/carousel3.jpg";
import carousel2 from "./images/carousel2.png";
import Carousel from "react-bootstrap/Carousel";
import BrandCategories from "./BrandCategoies";
import BrandGrid from "./BrandGrid";
import DiscountBanner from "./DiscountBanner";
import AboutUs from "./AboutsUs";
import ContactUs from "./ContactUs";
import Testimonials from "./Testimonials";
import Footer from "./Footer";

const User = () => {
    return (
        <div>
            {/* Navbar */}
            <UserNavbar />

            {/* Hero Section */}
            <header id="home" className="hero-section">
    <div className="hero-container">
        {/* Left Content */}
        <div className="hero-text">
            <h1>
                A journey of a thousand miles begins with a fabulous pair of shoes.
            </h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Modi consequuntur eaque expedita porro necessitatibus.
            </p>
            <div className="btn-group">
                <button className="btn btn-primary">🛒 Shop Now</button>
                <button className="btn btn-outline-primary">🎉 Get Offer</button>
            </div>
        </div>

        {/* Right Content */}
        <div className="hero-image">
            <img  src={background} alt="Shoes" />
        </div>
    </div>
</header>



            {/* Products Section */}
            <section id="products">
                <h2 className="text-center mt-5">Products</h2>
                <div className="container mt-4">
                    <ProductList />
                </div>
            </section>

            {/* Full-Width Carousel */}
            <section>
                <div className="container-fluid mt-5 p-0">
                    <h2 className="text-center mb-4">Featured Shoes</h2>
                    <Carousel className="full-width-carousel">
                        <Carousel.Item>
                            <img className="d-block w-100" src={carousel1} alt="Sneakers" />
                            <Carousel.Caption>
                                <h2 style={{color:"white"}}>Stylish Sneakers</h2>
                                <p>Best in comfort and style.</p>
                            </Carousel.Caption>
                        </Carousel.Item>

                        <Carousel.Item>
                            <img className="d-block w-100" src={carousel2} alt="Casual Shoes" />
                            <Carousel.Caption>
                                <h2 style={{color:"white"}}>Casual Shoes</h2>
                                <p>Perfect for everyday use.</p>
                            </Carousel.Caption>
                        </Carousel.Item>

                        <Carousel.Item>
                            <img className="d-block w-100" src={carousel3} alt="Formal Wear" />
                            <Carousel.Caption>
                                <h2 style={{color:"white"}}>Formal Wear</h2>
                                <p>Elegant and comfortable.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </section><br />
           

            {/* Brand Categories */}
            <section>
                <BrandCategories />
            </section>

            <section>
               <BrandGrid/>
            </section>

            <section>
                <DiscountBanner/>
            </section>
            <section>
                <Testimonials/>
            </section>
            <section>
                <AboutUs/>
            </section>

            <section>
                <ContactUs/>
            </section>

            <section>
                <Footer/>
            </section>
        </div>
    );
};

export default User;
