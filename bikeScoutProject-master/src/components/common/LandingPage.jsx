import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/landingPage.css";
import "../../assets/landing/css/style.css";
import "../../assets/landing/css/responsive.css";
import about2image from "../../assets/landing/images/about-img2.png";
import sliderImage from "../../assets/landing/images/slider-img.png";
import { Link } from "react-router-dom";

export const LandingPage = () => {
  return (
    <div className="hero_area">
      <div className="hero-area">
        <header className="header-section">
          <div className="container">
            <a href="/" className="brand-logo">
              CarScout
            </a>
            <nav className="nav-bar">
              <ul className="nav-list">
                <li className="nav-item">
                  <Link to="/home" className="nav-link">
                    Home
                  </Link>
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
                            
                            background-color:rgb(217, 226, 234);
                            padding: 20px 0;
                            width: 100%;
                        }
                        .header-section {
                            background-color:rgb(6, 14, 92);
                            padding: 10px 0;
                            box-shadow: 0 4px 10px rgba(33, 13, 209, 0.1);
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

      <section className=" slider_section ">
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active carousel-item-left">
              <div className="container">
                <div className="row">
                  <div className="col-md-6 ">
                    <div className="detail_box">
                      {/* <h1>CarScout</h1> */}
                      <h1 style={{ color: '#f0f0f0' }}>CarScout</h1>

                      <p>
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking
                      </p>
                      <div className="btn-box">
                        <a href="" className="btn-1">
                          Contact Us
                        </a>
                        <a href="" className="btn-2">
                          Get A Quote
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="img-box">
                      <img src={sliderImage} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item carousel-item-next carousel-item-left">
              <div className="container">
                <div className="row">
                  <div className="col-md-6 ">
                    <div className="detail_box">
                      <h1>The best marketing</h1>
                      <p>
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking
                      </p>
                      <div className="btn-box">
                        <a href="" className="btn-1">
                          Contact Us
                        </a>
                        <a href="" className="btn-2">
                          Get A Quote
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="img-box">
                      <img src={sliderImage} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="container">
                <div className="row">
                  <div className="col-md-6 ">
                    <div className="detail_box">
                      <h1>The best marketing</h1>
                      <p>
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking
                      </p>
                      <div className="btn-box">
                        <a href="" className="btn-1">
                          Contact Us
                        </a>
                        <a href="" className="btn-2">
                          Get A Quote
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="img-box">
                      <img src={sliderImage} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel_btn-container">
            <a
              className="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
      </section>
      <section className="about_section ">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="img-box">
                <img src={about2image} alt="" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="detail-box">
                <div className="heading_container">
                  <h2>About Us</h2>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud
                </p>
                <a href="">Read More</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
