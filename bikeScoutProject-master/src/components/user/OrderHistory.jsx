import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomLoader from '../../hooks/CustomLoader';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem('id');
   const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`/order/user/${userId}`);
        setOrders(res.data.orders);
      } catch (err) {
        toast.error("Failed to load order history");
        console.error(err);
      }
      setLoading(false);
    };

    fetchOrders();
  }, [userId]);

  if (loading) return <CustomLoader />;


  return (
    <div style={{ padding: "20px", minHeight: "100vh", backgroundColor: "#f1f2f6" }}>
      <ToastContainer />
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#2f3640" }}>Your Order History</h2>
      {orders.length === 0 ? (
        <p style={{ textAlign: "center", color: "#718093" }}>No orders found.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
          {orders.map(order => (
            <div key={order._id} style={{ backgroundColor: "#fff", padding: "15px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
              <img src={order.bikeId?.bikeURL} alt={order.bikeId?.model} style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px" }} />
              <h3 style={{ color: "#f39c12", marginTop: "10px" }}>{order.bikeId?.model}</h3>
              <p><strong>Brand:</strong> {order.bikeId?.brand}</p>
              <p><strong>Price:</strong> ₹{order.amount }</p>
              <p><strong>Razorpay ID:</strong> {order.razorpayOrderId}</p>
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Status:</strong> Paid</p>
              <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
