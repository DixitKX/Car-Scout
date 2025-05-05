import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [showForgotModal, setShowForgotModal] = useState(false);

  const submitHandler = async (data) => {
    try {
      const res = await axios.post("/user/login", data);
      if (res.status === 200) {
        toast.success("Login successful!", {
          position: "top-center",
          autoClose: 2000,
          theme: "dark",
          transition: Slide,
        });
        localStorage.setItem("id", res.data.data._id);
        localStorage.setItem("role", res.data.data.roleId.name);
        setTimeout(() => {
          navigate(
            res.data.data.roleId.name === "buyer"
              ? "/user"
              : res.data.data.roleId.name === "seller"
              ? "/seller"
              : res.data.data.roleId.name === "admin"
              ? "/admin"
              : "/"
          );
        }, 2000);
      }
    } catch (error) {
      toast.error("Login failed. Please try again.", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
        transition: Slide,
      });
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    try {
      const res = await axios.post("/user/forgotpassword", { email });
      toast.success(res.data.message);
      setShowForgotModal(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error sending reset link.");
    }
  };

  const validationSchema = {
    email: {
      required: "Email is required",
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Invalid email format",
      },
    },
    password: { required: "Password is required" },
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        theme="dark"
        transition={Slide}
      />
      <div
        className="container-fluid d-flex justify-content-center align-items-center min-vh-100"
        style={{ background: "#2a2d3e", fontFamily: "Poppins, sans-serif" }}
      >
        <div
          className="card p-4 shadow-lg"
          style={{
            maxWidth: "400px",
            width: "100%",
            borderRadius: "10px",
            background: "#ffffff",
          }}
        >
          <h2
            className="text-center mb-3"
            style={{
              color: "#ff4757",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            Login
          </h2>

          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="mb-3">
              <label
                className="form-label"
                style={{ fontWeight: "bold", color: "#333" }}
              >
                Email
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                {...register("email", validationSchema.email)}
              />
              <small className="text-danger">{errors.email?.message}</small>
            </div>

            <div className="mb-3">
              <label
                className="form-label"
                style={{ fontWeight: "bold", color: "#333" }}
              >
                Password
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                {...register("password", validationSchema.password)}
              />
              <small className="text-danger">{errors.password?.message}</small>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              style={{ background: "#ff4757", border: "none" }}
            >
              Login
            </button>
          </form>

          <div className="text-center mt-3">
            <a
              href="#"
              onClick={() => setShowForgotModal(true)}
              style={{
                color: "#ff4757",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Forgot Password?
            </a>
          </div>

          <div className="text-center mt-2">
            <p>
              Don't have an account?{" "}
              <Link
                to="/signup"
                style={{
                  color: "#ff4757",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {showForgotModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ background: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Forgot Password</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowForgotModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowForgotModal(false)}
                >
                  Close
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleForgotPassword}
                >
                  Send Reset Link
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
