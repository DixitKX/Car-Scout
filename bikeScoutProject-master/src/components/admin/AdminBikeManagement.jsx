// 📁 AdminBikeManagement.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomLoader from "../../hooks/CustomLoader";

const AdminBikeManagement = () => {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBikes = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/admin/bikes");
      setBikes(res.data);
    } catch (err) {
      toast.error("Failed to fetch bikes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBikes();
  }, []);

  const handleReject = async (bikeId) => {
    setLoading(true);
    try {
      await axios.put("/api/admin/bikes/reject", { bikeId });
      toast.success("Bike rejected");
      fetchBikes();
    } catch {
      toast.error("Error rejecting bike");
    } finally {
      setLoading(false);
    }
  };

  const handleUnreject = async (bikeId) => {
    setLoading(true);
    try {
      await axios.put("/api/admin/bikes/unreject", { bikeId });
      toast.success("Bike unrejected");
      fetchBikes();
    } catch {
      toast.error("Error unrejecting bike");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (bikeId) => {
    if (!window.confirm("Are you sure you want to delete this bike?")) return;
    setLoading(true);
    try {
      await axios.delete("/api/admin/bikes/delete", { data: { bikeId } });
      toast.success("Bike deleted");
      fetchBikes();
    } catch {
      toast.error("Error deleting bike");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Bike Management (Admin)</h2>
      {loading && <CustomLoader />}
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Model</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Seller</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bikes.map((bike) => (
            <tr key={bike._id} style={!bike.isVisible ? styles.rejected : {}}>
              <td>
                <img src={bike.bikeURL} alt="bike" style={styles.img} />
              </td>
              <td>{bike.model}</td>
              <td>{bike.brand}</td>
              <td>₹{bike.price}</td>
              <td>{bike.userId?.Username || "N/A"}</td>
              <td>{bike.isVisible ? "Visible" : "Rejected"}</td>
              <td>
                {bike.isVisible ? (
                  <button
                    style={styles.rejectBtn}
                    onClick={() => handleReject(bike._id)}
                  >
                    Reject
                  </button>
                ) : (
                  <button
                    style={styles.unrejectBtn}
                    onClick={() => handleUnreject(bike._id)}
                  >
                    approve
                  </button>
                )}
                <button
                  style={styles.deleteBtn}
                  onClick={() => handleDelete(bike._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
  },
  heading: {
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "600",
    color: "#333",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  img: {
    width: "80px",
    height: "50px",
    objectFit: "cover",
    borderRadius: "5px",
  },
  loader: {
    color: "#555",
    marginBottom: "10px",
  },
  rejectBtn: {
    padding: "5px 10px",
    backgroundColor: "#ff4d4f",
    color: "white",
    border: "none",
    borderRadius: "5px",
    marginRight: "8px",
    cursor: "pointer",
  },
  unrejectBtn: {
    padding: "5px 10px",
    backgroundColor: "#52c41a",
    color: "white",
    border: "none",
    borderRadius: "5px",
    marginRight: "8px",
    cursor: "pointer",
  },
  deleteBtn: {
    padding: "5px 10px",
    backgroundColor: "#d9d9d9",
    color: "#333",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  rejected: {
    backgroundColor: "#fff2f0",
  },
};

export default AdminBikeManagement;
