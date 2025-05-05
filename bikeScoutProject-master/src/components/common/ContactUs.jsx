import React from "react";
import { Link } from "react-router-dom";

const ContactUs = () => {
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

      <div className="contact-us-wrapper">
        <div className="contact-us-section">
          <h1 className="section-title">Contact Us</h1>
          <p className="section-description">
            Have questions or need help? Reach out to us!
          </p>

          <div className="contact-container">
            <div className="contact-form">
              <h3>Send Us a Message</h3>
              <form>
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Your Email" required />
                <textarea
                  placeholder="Your Message"
                  rows="5"
                  required
                ></textarea>
                <button type="submit" className="btn-submit">
                  Send Message
                </button>
              </form>
            </div>

            <div className="contact-info">
              <h2>Contact Information</h2>
              <p>📍 Location: Ahmedabad, GUJRAT</p>
              <p>📞 Phone: +91 94087 43960</p>
              <p>✉️ Email: dixitkumbhani588@gmail.com</p>
            </div>
          </div>
        </div>

        <style>
          {`
                    .contact-us-wrapper {
                        min-height: 100vh;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: linear-gradient(to right, #06125c, #007bff);
                        padding-top: 80px;
                    }
                    .contact-us-section {
                        padding: 50px 20px;
                        color: #fff;
                        text-align: center;
                        border-radius: 12px;
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                        width: 100%;
                        max-width: 1200px;
                        background: rgba(255, 255, 255, 0.1);
                        backdrop-filter: blur(10px);
                    }
                    .section-title {
                        font-size: 36px;
                        font-weight: bold;
                        margin-bottom: 20px;
                        text-transform: uppercase;
                    }
                    .section-description {
                        font-size: 18px;
                        margin-bottom: 30px;
                        opacity: 0.9;
                    }
                    .contact-container {
                        display: flex;
                        justify-content: space-around;
                        flex-wrap: wrap;
                        gap: 30px;
                    }
                    .contact-form, .contact-info {
                        background: rgba(255, 255, 255, 0.1);
                        padding: 25px;
                        border-radius: 12px;
                        width: 400px;
                        text-align: center;
                        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
                        padding-top:150px;
                        
                    }
                          .contact-form{

                              background: rgba(255, 255, 255, 0.1);
                        padding: 25px;
                        border-radius: 12px;
                        width: 400px;
                        text-align: center;
                        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
                          }
                    .contact-form h3, .contact-info h2 {
                        font-size: 40px;
                        margin-bottom: 15px;
                    }
                    input, textarea {
                        width: 100%;
                        padding: 10px;
                        margin: 10px 0;
                        border: none;
                        border-radius: 5px;
                        font-size: 16px;
                    }
                    .btn-submit {
                        background-color: #ffdd57;
                        color: #06125c;
                        border: none;
                        padding: 12px;
                        font-size: 18px;
                        cursor: pointer;
                        border-radius: 8px;
                        transition: background 0.3s;
                    }
                    .btn-submit:hover {
                        background-color: #ffc107;
                    }
                `}
        </style>
      </div>
    </>
  );
};

export default ContactUs;
