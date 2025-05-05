import React from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
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
    background-color: rgb(6, 14, 92);
    padding: 10px 0;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
}

.container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1200px; /* Adjust max width */
    padding: 0 20px;
    margin: 0 auto;
}

.left-section {
    flex: 1; /* Makes sure the logo section stays on the left */
    display: flex;
    align-items: center;
}

.brand-logo {
    color: #fff;
    font-size: 26px;
    font-weight: bold;
    text-decoration: none;
}

.nav-bar {
    flex: 2; /* Keeps navigation centered */
    display: flex;
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
    flex: 1; /* Keeps buttons on the right */
    display: flex;
    justify-content: flex-end;
    gap: 15px;
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
      <div className="about-us-wrapper">
        <div className="about-us-section">
          <div className="container">
            <h1 className="section-title">About US</h1>
            <p className="section-description">
              CarScout is your ultimate destination for buying, selling, and
              exploring the best cars in the market. We aim to connect car
              enthusiasts with trusted sellers and provide valuable insights to
              make informed decisions.
            </p>
            <div className="features">
              <div className="feature-box">
                {/* <h3>🚴 Wide Selection</h3> */}
                <h3>🚗 Wide Selection</h3>                
                <p>
                  Choose from a vast range of cars, from sports models to daily
                  commuters.
                </p>
              </div>
              <div className="feature-box">
                <h3>✅ Trusted Sellers</h3>
                <p>
                  We ensure every seller meets quality standards for a secure
                  experience.
                </p>
              </div>
              <div className="feature-box">
                <h3>🔍 Easy Comparison</h3>
                <p>
                  Compare different models, features, and prices effortlessly.
                </p>
              </div>
            </div>
          </div>
        </div>
        <style>
          {`
                    .about-us-wrapper {
                        min-height: 100vh;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: linear-gradient(to right, #06125c, #007bff);
                        padding-top: 80px;
                    }
                    .about-us-section {
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
                    .features {
                        display: flex;
                        justify-content: center;
                        gap: 20px;
                        flex-wrap: wrap;
                    }
                    .feature-box {
                        background: rgba(255, 255, 255, 0.1);
                        padding: 25px;
                        border-radius: 12px;
                        width: 320px;
                        text-align: center;
                        transition: transform 0.3s ease-in-out;
                        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
                    }
                    .feature-box:hover {
                        transform: translateY(-5px);
                    }
                    .feature-box h3 {
                        font-size: 22px;
                        margin-bottom: 12px;
                        color: #ffdd57;
                    }
                    .feature-box p {
                        font-size: 16px;
                        opacity: 0.9;
                    }
                `}
        </style>
      </div>
    </>
  );
};

export default AboutUs;
