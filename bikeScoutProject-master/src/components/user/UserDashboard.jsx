import React, { useEffect, useState } from "react";
import axios from "axios";
import { Slide, toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CustomLoader from "../../hooks/CustomLoader";

const UserDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [bikes, setBikes] = useState([]);
  const [selectedBikes, setSelectedBikes] = useState([]);
  const [loading, setLoading] = useState();
  const userId = localStorage.getItem("id");

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/order/user/${userId}`);
        setOrders(res.data.orders || res.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
      setLoading(false);
    };
    fetchOrders();
  }, [userId]);

  // Fetch wishlist
  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/wishlist/user/${userId}`);
        if (res.data && Array.isArray(res.data.data)) {
          setWishlist(res.data.data);
        } else {
          setWishlist([]);
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
      setLoading(false);
    };
    fetchWishlist();
  }, [userId]);


  useEffect(() => {
    const fetchBikes = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/bike/getallbikes"); // your API endpoint
        console.log("Bikes response:", res.data);
        
        // ✅ Fix: correctly access the array inside response
        setBikes(Array.isArray(res.data.data) ? res.data.data : []);
      } catch (err) {
        console.error("Failed to fetch bikes", err);
      }
      setLoading(false);
    };
    fetchBikes();
  }, []);

  const handleBikeSelect = (bike) => {
    if (selectedBikes.find((b) => b._id === bike._id)) {
      setSelectedBikes((prev) => prev.filter((b) => b._id !== bike._id));
    } else if (selectedBikes.length < 2) {
      setSelectedBikes((prev) => [...prev, bike]);
    }
  };

  // Remove from wishlist
  const handleRemoveFromWishlist = async (wishlistId) => {
    try {
      await axios.delete(`/wishlist/wishlist/${wishlistId}`);
      setWishlist(prev => prev.filter(item => item._id !== wishlistId));
      toast.success("Removed from wishlist");
    } catch (error) {
      console.error("Remove error", error);
      toast.error("Failed to remove from wishlist");
    }
  };

  if (loading) return <CustomLoader />;
 

  return (
    <div style={{ padding: "30px", background: "#f5f6fa", minHeight: "100vh", fontFamily: "Segoe UI, sans-serif" }}>
        <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide} // ✅ Added slide effect
        theme="colored"></ToastContainer>
      <h1 style={{ textAlign: "center", marginBottom: "30px", color: "#2f3640" }}>User Dashboard</h1>

      {/* Wishlist */}
      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ color: "#2f3640", marginBottom: "20px" }}>Your Wishlist ({wishlist.length})</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {wishlist.length > 0 ? (
            wishlist.map((item) => (
              <div key={item._id} style={{
                width: "300px",
                background: "#fff",
                borderRadius: "10px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                padding: "15px"
              }}>
                <img
                  src={item?.bikeId?.bikeURL || "https://via.placeholder.com/300x180?text=No+Image"}
                  alt={item?.bikeId?.model}
                  style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "10px" }}
                />
                <h3 style={{ margin: "10px 0" }}>{item?.bikeId?.model}</h3>
                <p>Brand: {item?.bikeId?.brand}</p>
                <p>Price: ₹{item?.bikeId?.price}</p>
                <button onClick={() => handleRemoveFromWishlist(item._id)} style={{
                  marginTop: "10px",
                  padding: "10px",
                  background: "#e84118",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  width: "100%"
                }}>
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p style={{ color: "#718093" }}>No items in your wishlist.</p>
          )}
        </div>
      </div>

      {/* Orders */}
      <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", marginBottom: "30px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
        <h2 style={{ marginBottom: "20px", color: "#2f3640" }}>Your Orders</h2>
        {Array.isArray(orders) && orders.length > 0 ? (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f1f2f6", color: "#2f3640" }}>
                <th style={{ padding: "12px", borderBottom: "1px solid #dcdde1" }}>Model</th>
                <th style={{ padding: "12px", borderBottom: "1px solid #dcdde1" }}>Price</th>
                <th style={{ padding: "12px", borderBottom: "1px solid #dcdde1" }}>Status</th>
                <th style={{ padding: "12px", borderBottom: "1px solid #dcdde1" }}>Payment ID</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td style={{ padding: "12px" }}>{order?.bikeId?.model || "N/A"}</td>
                  <td style={{ padding: "12px" }}>₹{order?.bikeId?.price || "N/A"}</td>
                  <td style={{ padding: "12px" }}>
                    <span style={{
                      backgroundColor: order.paymentStatus === "Success" ? "#44bd32" : "#e1b12c",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      color: "#fff",
                      fontWeight: "bold"
                    }}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td style={{ padding: "12px", fontSize: "14px", color: "#718093" }}>{order?._id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ color: "#718093", textAlign: "center" }}>No orders found.</p>
        )}
      </div>

      {/* Change Password */}
      <div style={{ marginTop: "40px", padding: "20px" }}>
      <h2 style={{ marginBottom: "20px", color: "#2f3640" }}>Compare Cars</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
        {bikes.map((bike) => (
          <div
            key={bike._id}
            onClick={() => handleBikeSelect(bike)}
            style={{
              border: selectedBikes.some((b) => b._id === bike._id)
                ? "2px solid #44bd32"
                : "1px solid #dcdde1",
              borderRadius: "10px",
              padding: "10px",
              cursor: "pointer",
              width: "200px",
              textAlign: "center",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
              background: "#fff",
            }}
          >
            <img
              src={bike.bikeURL}
              alt={bike.model}
              style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "8px" }}
            />
            <h4>{bike.brand} {bike.model}</h4>
            <p>₹{bike.price}</p>
          </div>
        ))}
      </div>

      {selectedBikes.length === 2 && (
        <div style={{ marginTop: "30px", background: "#f9f9f9", padding: "20px", borderRadius: "10px" }}>
          <h3 style={{ marginBottom: "20px" }}>Comparison</h3>
          <div style={{ display: "flex", gap: "30px", justifyContent: "center" }}>
            {selectedBikes.map((bike) => (
              <div key={bike._id} style={{ width: "45%" }}>
                <img
                  src={bike.bikeURL}
                  alt={bike.model}
                  style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" }}
                />
                <h4>{bike.brand} {bike.model}</h4>
                <p><strong>Price:</strong> ₹{bike.price}</p>
                <p><strong>Year:</strong> {bike.year}</p>
                <p><strong>Variant:</strong> {bike.variant}</p>
                <p><strong>Mileage:</strong> {bike.mileage} kmpl</p>
                <p><strong>Fuel Type:</strong> {bike.fuelType}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
        </div>
  );
};

export default UserDashboard;
