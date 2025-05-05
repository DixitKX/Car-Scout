import React from "react";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <>
      <div className="hero-area">
        <header className="header-section">
          <div className="container">
            <a href="/" className="brand-logo">
              CarScout
            </a>
            <nav className="nav-bar">
              <ul className="nav-list">
                <li className="nav-item">
                  <a href="/home" className="nav-link">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/about" className="nav-link">
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/services" className="nav-link">
                    Services
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/contact" className="nav-link">
                    Contact Us
                  </a>
                </li>
              </ul>
            </nav>
            <div className="btn-box">
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
              <Link to="/signup" className="btn btn-secondary">
                Signup
              </Link>
            </div>
          </div>
        </header>

        <style>
          {`
                                    .hero-area {
                                        background-color: #f8f9fa;
                                        padding: 20px 0;
                                        width: 100%;
                                    }
                                    .header-section {
                                        background-color:rgb(6, 14, 92);
                                        padding: 10px 0;
                                        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                                        width: 100%;
                                        position: fixed;
                                        top: 0;
                                        left: 0;
                                        right: 0;
                                        z-index: 1000;
                                    }
                                    .container {
                                        width: 100%;
                                        max-width: 100%;
                                        margin: 0 auto;
                                        display: flex;
                                        justify-content: space-between;
                                        align-items: center;
                                        padding: 0 50px;
                                    }
                                    .brand-logo {
                                        color: #fff;
                                        font-size: 26px;
                                        font-weight: bold;
                                        text-decoration: none;
                                    }
                                    .nav-bar {
                                        display: flex;
                                        align-items: center;
                                        width: 100%;
                                        justify-content: center;
                                    }
                                    .nav-list {
                                        display: flex;
                                        list-style: none;
                                        padding: 0;
                                        margin: 0;
                                        gap: 40px;
                                    }
                                    .nav-item {
                                        margin-right: 0;
                                    }
                                    .nav-link {
                                        color: #fff;
                                        text-decoration: none;
                                        font-size: 18px;
                                        transition: color 0.3s;
                                    }
                                    .nav-link:hover {
                                        color: #007bff;
                                    }
                                    .btn-box {
                                        display: flex;
                                        gap: 15px;
                                    }
                                    .btn {
                                        padding: 10px 18px;
                                        border-radius: 5px;
                                        text-decoration: none;
                                        color: #fff;
                                        border: none;
                                        cursor: pointer;
                                        transition: background-color 0.3s;
                                    }
                                    .btn-primary {
                                        background-color: #007bff;
                                    }
                                    .btn-primary:hover {
                                        background-color: #0056b3;
                                    }
                                    .btn-secondary {
                                        background-color: #28a745;
                                    }
                                    .btn-secondary:hover {
                                        background-color: #1e7e34;
                                    }
                                `}
        </style>
      </div>

      <div className="services-wrapper">
        <div className="services-section">
          <div className="container">
            <h1 className="section-title">Our Services</h1>
            <p className="section-description">
              At CarScout, we provide a range of services to make your car
              buying and selling experience seamless and enjoyable.
            </p>
            <div className="service-list">
              <div className="service-box">
                <h3>🛒 Buy New & Used Cars</h3>
                <p>
                  Explore a vast collection of new and pre-owned cars from
                  trusted sellers.
                </p>
              </div>
              <div className="service-box">
                <h3>🔄 Sell Your Car</h3>
                <p>
                  List your cars for sale easily and connect with potential
                  buyers.
                </p>
              </div>
              <div className="service-box">
                <h3>💰 Price Comparison</h3>
                <p>
                  Compare different car models and prices to find the best
                  deals.
                </p>
              </div>
              <div className="service-box">
                <h3>📋 Detailed Reviews</h3>
                <p>
                  Read expert and user reviews to make an informed decision.
                </p>
              </div>
            </div>
          </div>
        </div>
        <style>
          {`
                    .services-wrapper {
                        min-height: 100vh;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: linear-gradient(to right, #06125c, #007bff);
                        padding-top: 80px;
                    }
                    .services-section {
                        padding: 80px 20px;
                        color: #fff;
                        text-align: center;
                        border-radius: 12px;
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                        width: 100%;
                        max-width: 1200px;
                        background: rgba(255, 255, 255, 0.1);
                        backdrop-filter: blur(10px);
                    }
                    .container {
                        max-width: 1000px;
                        margin: 0 auto;
                    }
                    .section-title {
                        font-size: 36px;
                        font-weight: bold;
                        margin-bottom: 20px;
                        text-transform: uppercase;
                    }
                    .section-description {
                        font-size: 18px;
                        line-height: 1.6;
                        margin-bottom: 40px;
                        opacity: 0.9;
                    }
                    .service-list {
                        display: flex;
                        justify-content: center;
                        gap: 20px;
                        flex-wrap: wrap;
                    }
                    .service-box {
                        background: rgba(255, 255, 255, 0.1);
                        padding: 25px;
                        border-radius: 12px;
                        width: 300px;
                        text-align: center;
                        transition: transform 0.3s ease-in-out;
                        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
                    }
                    .service-box:hover {
                        transform: translateY(-5px);
                    }
                    .service-box h3 {
                        font-size: 22px;
                        margin-bottom: 12px;
                        color: #ffdd57;
                    }
                    .service-box p {
                        font-size: 16px;
                        opacity: 0.9;
                    }
                `}
        </style>
      </div>
    </>
  );
};

export default Services;
