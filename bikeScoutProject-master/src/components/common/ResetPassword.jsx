import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    try {
      const obj = {
        token: token,
        password: data.password,
      };

      const res = await axios.post("/user/resetpassword", obj);
      console.log(res.data);
      toast.success("✅ Password reset successfully!", { autoClose: 2000 });

      setTimeout(() => {
        navigate("/login"); // Redirect to login page
      }, 2000);
    } catch (error) {
      console.error("❌ Reset Password Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "#f4f7f6" }}
    >
      <ToastContainer position="top-center" autoClose={2000} />
      <div
        className="card p-4 shadow-lg border-0 d-flex flex-column align-items-center"
        style={{
          maxWidth: "400px",
          width: "100%",
          borderRadius: "12px",
          background: "#ffffff",
        }}
      >
        <h2
          className="text-center"
          style={{
            color: "#ff4757",
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          Reset Password
        </h2>
        <form onSubmit={handleSubmit(submitHandler)} className="w-100 mt-3">
          <div className="mb-3">
            <label className="form-label fw-bold" style={{ color: "#333" }}>
              New Password
            </label>
            <input
              type="password"
              className="form-control"
              style={{
                border: "1px solid #ddd",
                borderRadius: "6px",
                padding: "12px",
                fontSize: "14px",
                background: "#f9f9f9",
              }}
              placeholder="Enter new password"
              {...register("password", {
                required: "⚠️ Password is required",
              })}
            />
            <small className="text-danger fw-bold">
              {errors.password?.message}
            </small>
          </div>
          <button
            type="submit"
            className="btn w-100"
            style={{
              background: "#ff4757",
              border: "none",
              padding: "12px",
              borderRadius: "6px",
              fontSize: "16px",
              fontWeight: "bold",
              color: "white",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.background = "#e43e4e")}
            onMouseOut={(e) => (e.target.style.background = "#ff4757")}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};
