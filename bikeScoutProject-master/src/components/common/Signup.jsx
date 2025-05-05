import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomLoader from "../../hooks/CustomLoader";

export const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/roles"); // Use the correct API route
        console.log("Response from backend:", res); // Check the full response
        const data = Array.isArray(res.data) ? res.data : [];
        console.log("Fetched Roles:", data);
        setRoles(data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoles();
  }, []);

  const submitHandler = async (data) => {
    try {
      const res = await axios.post("/user", data); // Use the correct API route
      if (res.status === 201) {
        toast.success("Signup successfully!", {
          position: "top-center",
          autoClose: 2000,
          theme: "dark",
          transition: Slide,
        });
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      toast.error("Signup failed. Please try again.", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
        transition: Slide,
      });
    }
  };

  const validationSchema = {
    Firstname: { required: "First name is required" },
    Lastname: { required: "Last name is required" },
    Username: { required: "Username is required" },
    email: {
      required: "Email is required",
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Invalid email format",
      },
    },
    Phonenumber: {
      required: "Phone number is required",
      pattern: {
        value: /^[6-9]{1}[0-9]{9}$/,
        message: "Enter a valid phone number",
      },
    },
    password: { required: "Password is required" },
    roleId: { required: "Please select a role" },
  };

  if (loading) return <CustomLoader />;
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        theme="dark"
        transition={Slide}
      />
      <div
        className="container-fluid d-flex justify-content-center align-items-center min-vh-100"
        style={{ background: "#156596", fontFamily: "Poppins, sans-serif" }}
      >
        <div
          className="card p-4 shadow-lg"
          style={{
            maxWidth: "600px",
            width: "100%",
            transform: "none",
            borderRadius: "10px",
            background: "#ffffff",
          }}
        >
          <h2
            className="text-center mb-3"
            style={{ color: "#1E8FD5", fontWeight: "bold" }}
          >
            Signup
          </h2>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="row g-3">
              <div className="col-md-6">
                <label
                  className="form-label"
                  style={{ fontWeight: "bold", color: "#555" }}
                >
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "10px",
                    fontSize: "14px",
                    background: "#f9f9f9",
                  }}
                  placeholder="Enter first name"
                  {...register("Firstname", validationSchema.Firstname)}
                />
                <small className="text-danger fw-bold">
                  {errors.Firstname?.message}
                </small>
              </div>
              <div className="col-md-6">
                <label
                  className="form-label"
                  style={{ fontWeight: "bold", color: "#555" }}
                >
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "10px",
                    fontSize: "14px",
                    background: "#f9f9f9",
                  }}
                  placeholder="Enter last name"
                  {...register("Lastname", validationSchema.Lastname)}
                />
                <small className="text-danger fw-bold">
                  {errors.Lastname?.message}
                </small>
              </div>
              <div className="col-md-6">
                <label
                  className="form-label"
                  style={{ fontWeight: "bold", color: "#555" }}
                >
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "10px",
                    fontSize: "14px",
                    background: "#f9f9f9",
                  }}
                  placeholder="Enter username"
                  {...register("Username", validationSchema.Username)}
                />
                <small className="text-danger fw-bold">
                  {errors.Username?.message}
                </small>
              </div>
              <div className="col-md-6">
                <label
                  className="form-label"
                  style={{ fontWeight: "bold", color: "#555" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "10px",
                    fontSize: "14px",
                    background: "#f9f9f9",
                  }}
                  placeholder="Enter email"
                  {...register("email", validationSchema.email)}
                />
                <small className="text-danger fw-bold">
                  {errors.email?.message}
                </small>
              </div>
              <div className="col-md-6">
                <label
                  className="form-label"
                  style={{ fontWeight: "bold", color: "#555" }}
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "10px",
                    fontSize: "14px",
                    background: "#f9f9f9",
                  }}
                  placeholder="Enter phone number"
                  {...register("Phonenumber", validationSchema.Phonenumber)}
                />
                <small className="text-danger fw-bold">
                  {errors.Phonenumber?.message}
                </small>
              </div>
              <div className="col-md-6">
                <label
                  className="form-label"
                  style={{ fontWeight: "bold", color: "#555" }}
                >
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "10px",
                    fontSize: "14px",
                    background: "#f9f9f9",
                  }}
                  placeholder="Enter password"
                  {...register("password", validationSchema.password)}
                />
                <small className="text-danger fw-bold">
                  {errors.password?.message}
                </small>
              </div>

              <div className="col-md-12">
                <label
                  className="form-label"
                  style={{ fontWeight: "bold", color: "#555" }}
                >
                  Select Role
                </label>
                <select
                  className="form-select"
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "10px",
                    fontSize: "14px",
                    background: "#f9f9f9",
                  }}
                  {...register("roleId", validationSchema.roleId)}
                >
                  <option value="">Select a role</option>
                  {Array.isArray(roles) &&
                    roles
                      .filter(
                        (role) =>
                          typeof role.name === "string" &&
                          role.name.toLowerCase() !== "admin"
                      )
                      .map((role) => (
                        <option key={role._id} value={role._id}>
                          {role.name.charAt(0).toUpperCase() +
                            role.name.slice(1)}
                        </option>
                      ))}
                </select>
                <small className="text-danger fw-bold">
                  {errors.roleId?.message}
                </small>
              </div>
            </div>

            <div className="mt-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="terms"
                required
              />
              <label
                className="form-check-label"
                htmlFor="terms"
                style={{ color: "#555" }}
              >
                Agree to terms and conditions
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 mt-3"
              style={{
                background: "#007bff",
                border: "none",
                padding: "10px",
                borderRadius: "5px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Signup
            </button>
          </form>
          <div className="text-center mt-3">
            <p>
              Already have an account?{" "}
              <Link
                to="/login"
                style={{
                  color: "#007bff",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
