import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SellerProfile = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [profileData, setProfileData] = useState({});
  const [isEditing, setIsEditing] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem("id");
        const response = await axios.get(`/profile/getprofile/${userId}`);
        const profileData = response.data.data;
        setProfileData(profileData);
        Object.keys(profileData).forEach((key) =>
          setValue(key, profileData[key])
        );
        setIsEditing(false);
      } catch (err) {
        toast.error("Error fetching profile");
      }
    };
    fetchProfile();
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      const userId = localStorage.getItem("id");
      if (Object.keys(profileData).length === 0) {
        await axios.post("/profile/addprofile", { ...data, userId });
        toast.success("Profile added successfully");
      } else {
        await axios.post(`/profile/updateprofile/${userId}`, data);
        toast.success("Profile updated successfully");
      }
      setProfileData(data);
      setIsEditing(false);
    } catch (err) {
      toast.error("Error updating profile");
    }
  };

  const handleEdit = () => setIsEditing(true);

  const styles = {
    body: {
      background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
      fontFamily: "'Poppins', sans-serif",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
    },
    container: {
      maxWidth: "500px",
      width: "100%",
      padding: "30px",
      background: "rgba(255, 255, 255, 0.15)",
      borderRadius: "15px",
      backdropFilter: "blur(20px)",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
      textAlign: "center",
      color: "#fff",
      transition: "all 0.3s ease",
      border: "1px solid rgba(255, 255, 255, 0.2)",
    },
    title: {
      fontSize: "28px",
      fontWeight: "bold",
      marginBottom: "20px",
      textTransform: "uppercase",
      letterSpacing: "1px",
      color: "#00c6ff",
    },
    profileDisplay: {
      background: "rgba(255, 255, 255, 0.1)",
      padding: "20px",
      borderRadius: "15px",
      backdropFilter: "blur(12px)",
      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      transition: "0.3s ease",
    },
    profileItem: {
      width: "100%",
      background: "rgba(255, 255, 255, 0.15)",
      padding: "12px 15px",
      borderRadius: "10px",
      color: "#fff",
      fontSize: "16px",
      fontWeight: "500",
      display: "flex",
      gap: "10px",
      alignItems: "center",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
      marginBottom: "12px",
      transition: "all 0.3s ease",
      borderLeft: "4px solid #00c6ff",
    },
    profileItemLabel: {
      fontWeight: "bold",
      color: "#d1ecff",
      textTransform: "uppercase",
    },
    button: {
      background: "linear-gradient(135deg, #00c6ff, #0072ff)",
      color: "#fff",
      border: "none",
      padding: "12px",
      borderRadius: "10px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "bold",
      textTransform: "uppercase",
      transition: "0.3s ease",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
      letterSpacing: "1px",
    },

    form: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      background: "rgba(255, 255, 255, 0.1)",
      padding: "20px",
      borderRadius: "15px",
      backdropFilter: "blur(12px)",
      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
      transition: "0.3s ease",
    },
    label: {
      fontWeight: "bold",
      color: "#d1ecff",
      textTransform: "uppercase",
      fontSize: "14px",
      marginBottom: "5px",
      textAlign: "left",
    },
    input: {
      width: "100%",
      padding: "12px",
      border: "none",
      borderRadius: "10px",
      fontSize: "16px",
      background: "rgba(255, 255, 255, 0.2)",
      color: "#fff",
      outline: "none",
      transition: "0.3s ease",
      boxShadow: "inset 0 1px 5px rgba(0, 0, 0, 0.2)",
    },
    inputFocus: {
      background: "rgba(255, 255, 255, 0.3)",
      boxShadow: "0 0 8px rgba(0, 198, 255, 0.8)",
      border: "1px solid #00c6ff",
    },
    error: {
      color: "#ff4d4d",
      fontSize: "14px",
    },

    buttonHover: {
      background: "linear-gradient(135deg, #0072ff, #00c6ff)",
      boxShadow: "0 6px 12px rgba(0, 198, 255, 0.5)",
    },
  };

  return (
    <div style={styles.body}>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar
        theme="dark"
        transition={Slide}
      />
      <div style={styles.container}>
        <h1 style={styles.title}>Seller Profile</h1>
        {isEditing ? (
          <form style={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <label style={styles.label}>Name:</label>
            <input
              style={styles.input}
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p style={styles.error}>{errors.name.message}</p>}

            <label style={styles.label}>Email:</label>
            <input
              style={styles.input}
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p style={styles.error}>{errors.email.message}</p>}

            <label style={styles.label}>Phone:</label>
            <input
              style={styles.input}
              {...register("phone", { required: "Phone number is required" })}
            />
            {errors.phone && <p style={styles.error}>{errors.phone.message}</p>}

            <label style={styles.label}>Vehicle:</label>
            <input
              style={styles.input}
              {...register("address", {
                required: "Vehicle details are required",
              })}
            />
            {errors.address && (
              <p style={styles.error}>{errors.address.message}</p>
            )}

            <button style={styles.button} type="submit">
              {Object.keys(profileData).length === 0
                ? "Add Profile"
                : "Update Profile"}
            </button>
          </form>
        ) : (
          <div style={styles.profileDisplay}>
            <p style={styles.profileItem}>
              <strong>Name:</strong> {profileData.name}
            </p>
            <p style={styles.profileItem}>
              <strong>Email:</strong> {profileData.email}
            </p>
            <p style={styles.profileItem}>
              <strong>Phone:</strong> {profileData.phone}
            </p>
            <p style={styles.profileItem}>
              <strong>Address:</strong> {profileData.address}
            </p>
            <button style={styles.button} onClick={handleEdit}>
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
