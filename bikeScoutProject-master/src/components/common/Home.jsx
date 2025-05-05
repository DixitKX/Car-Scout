import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
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

      <div style={{ width: "100%", overflowX: "hidden" }}>
        {/* HERO SECTION */}
        <section
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            width: "100vw",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "800px", width: "100%", padding: "20px" }}>
            <h1
              style={{ fontSize: "50px", fontWeight: "bold", color: "#0d47a1" }}
            >
              Discover Your Perfect Ride
            </h1>
            <p style={{ fontSize: "20px", color: "#555", margin: "20px 0" }}>
              Browse through the latest and best Cars available. Compare,
              choose, and ride with confidence.
            </p>
            <div
              style={{ display: "flex", justifyContent: "center", gap: "20px" }}
            >
              <Link
                to="/explore"
                style={{
                  backgroundColor: "#1565c0",
                  padding: "14px 24px",
                  borderRadius: "8px",
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: "18px",
                  fontWeight: "bold",
                  boxShadow: "0 3px 6px rgba(0, 0, 0, 0.2)",
                }}
              >
                Explore Now
              </Link>
              <Link
                to="/contact"
                style={{
                  backgroundColor: "#2e7d32",
                  padding: "14px 24px",
                  borderRadius: "8px",
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: "18px",
                  fontWeight: "bold",
                  boxShadow: "0 3px 6px rgba(0, 0, 0, 0.2)",
                }}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US SECTION */}
        <section
          style={{
            padding: "60px 20px",
            textAlign: "center",
            backgroundColor: "#f8f9fa",
          }}
        >
          <h2
            style={{ fontSize: "36px", color: "#0d47a1", marginBottom: "20px" }}
          >
            Why Choose Us?
          </h2>
          <p
            style={{
              fontSize: "18px",
              color: "#555",
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            We provide the best platform to explore and compare Cars. Our
            services ensure a seamless and hassle-free experience.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "30px",
              marginTop: "30px",
            }}
          >
            <div
              style={{
                maxWidth: "250px",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                backgroundColor: "#fff",
              }}
            >
              <h3 style={{ color: "#0d47a1" }}>Wide Variety</h3>
              <p style={{ color: "#555" }}>
                Choose from a huge selection of Cars.
              </p>
            </div>
            <div
              style={{
                maxWidth: "250px",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                backgroundColor: "#fff",
              }}
            >
              <h3 style={{ color: "#0d47a1" }}>Trusted Sellers</h3>
              <p style={{ color: "#555" }}>
                We partner with verified dealers and sellers.
              </p>
            </div>
            <div
              style={{
                maxWidth: "250px",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                backgroundColor: "#fff",
              }}
            >
              <h3 style={{ color: "#0d47a1" }}>Best Prices</h3>
              <p style={{ color: "#555" }}>Get the best deals on bikes.</p>
            </div>
          </div>
        </section>

        <footer
          style={{
            backgroundColor: "#06145C",
            color: "#fff",
            padding: "50px 20px",
            marginTop: "60px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
              gap: "25px",
              maxWidth: "1100px",
              margin: "0 auto",
              textAlign: "left",
            }}
          >
            {/* Column 1 - About */}
            <div>
              <h3
                style={{
                  fontSize: "20px",
                  marginBottom: "10px",
                  color: "#fff",
                }}
              >
                About BikeScout
              </h3>
              <p style={{ fontSize: "16px", color: "#ddd", lineHeight: "1.6" }}>
                CarScout is your one-stop platform to explore, compare, and
                find the perfect Car. We connect you with trusted sellers for a
                seamless buying experience.
              </p>
            </div>

            {/* Column 2 - Quick Links */}
            <div>
              <h3
                style={{
                  fontSize: "20px",
                  marginBottom: "10px",
                  color: "#fff",
                }}
              >
                Quick Links
              </h3>
              <ul
                style={{ listStyle: "none", padding: "0", lineHeight: "1.8" }}
              >
                <li>
                  <a
                    href="/home"
                    style={{
                      color: "#ddd",
                      textDecoration: "none",
                      fontSize: "16px",
                    }}
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    style={{
                      color: "#ddd",
                      textDecoration: "none",
                      fontSize: "16px",
                    }}
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/services"
                    style={{
                      color: "#ddd",
                      textDecoration: "none",
                      fontSize: "16px",
                    }}
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    style={{
                      color: "#ddd",
                      textDecoration: "none",
                      fontSize: "16px",
                    }}
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3 - Contact */}
            <div>
              <h3
                style={{
                  fontSize: "20px",
                  marginBottom: "10px",
                  color: "#fff",
                }}
              >
                Contact Us
              </h3>
              <p style={{ fontSize: "16px", color: "#ddd", lineHeight: "1.8" }}>
                📍 45, Car Scout, Ahmedabad, GUJRAT <br />
                📞 +91 94087 43960 <br />✉ dixitkumbhani588@gmail.com
                {/* 📞 +91 8320032707 <br />✉ bikescout111@gmail.com */}
              </p>
            </div>

            {/* Column 4 - Social Media */}
            <div>
              <h3
                style={{
                  fontSize: "20px",
                  marginBottom: "10px",
                  color: "#fff",
                }}
              >
                Follow Us
              </h3>
              <div style={{ display: "flex", gap: "15px", marginTop: "5px" }}>
                <a
                  href="#"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "#1877F2",
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: "18px",
                    transition: "background 0.3s",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#0e5db3")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "#1877F2")
                  }
                >
                  <i className="fab fa-facebook-f"></i>
                </a>

                <a
                  href="#"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "#E4405F",
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: "18px",
                    transition: "background 0.3s",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#c72e4d")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "#E4405F")
                  }
                >
                  <i className="fab fa-instagram"></i>
                </a>

                <a
                  href="#"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "#1DA1F2",
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: "18px",
                    transition: "background 0.3s",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#0e81c9")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "#1DA1F2")
                  }
                >
                  <i className="fab fa-twitter"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.2)",
              marginTop: "30px",
              paddingTop: "20px",
              textAlign: "center",
              fontSize: "16px",
              color: "#ccc",
            }}
          >
            &copy; 2025 CarScout. All Rights Reserved.
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
