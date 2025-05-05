import React from "react";
import hamburgermenu from "../../assets/images/hamburgermenu.png";
import { Link, useNavigate } from "react-router-dom";

export const SellerNavbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <nav className="app-header navbar navbar-expand bg-body">
      {/*begin::Container*/}
      <div className="container-fluid">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link btn btn-light"
              href="#"
              role="button"
              style={{
                color: "black",
                padding: "5px 10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
              onClick={toggleSidebar}
            >
              <img
                src={hamburgermenu}
                style={{ height: "25px", width: "25px" }}
              ></img>
            </a>
          </li>
          <li className="nav-item d-none d-md-block">
            <a style={{ color: "black" }} href="/home" className="nav-link">
              Home
            </a>
          </li>
          <li className="nav-item d-none d-md-block">
            <a style={{ color: "black" }} href="/about" className="nav-link">
              AboutUs
            </a>
          </li>
          <li className="nav-item d-none d-md-block">
            <a style={{ color: "black" }} href="/services" className="nav-link">
              Services
            </a>
          </li>
          <li className="nav-item d-none d-md-block">
            <a style={{ color: "black" }} href="/contact" className="nav-link">
              ContactUs
            </a>
          </li>
        </ul>

        <ul className="navbar-nav ms-auto">
          <li>
            <Link to="profile" className="btn" style={styles.profileButton}>
              Profile
            </Link>
          </li>

          <li className="nav-item">
            <button className="btn btn-danger" onClick={handleLogout}>
              LOGOUT
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const styles = {
  profileButton: {
    color: "white",
    textDecoration: "none",
    backgroundColor: "#3498db",

    borderRadius: "5px",
  },
};
