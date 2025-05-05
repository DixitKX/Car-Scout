import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

const SellerDashboard = () => {
  const userId = localStorage.getItem("id");
  const [stats, setStats] = useState({
    totalListed: 0,
    totalSold: 0,
    ordersPending: 0,
  });

  const [orders, setOrders] = useState([]);
  const [topSelling, setTopSelling] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("id");
        const res = await axios.get(`/api/dashboard/seller/stats/${userId}`);
        setStats(res.data);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`/api/seller/orders/${userId}`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setOrders(res.data);
        } else if (Array.isArray(res.data.orders)) {
          setOrders(res.data.orders);
        } else {
          console.warn("Unexpected orders response format", res.data);
        }
      })
      .catch((err) => console.error("Dashboard orders fetch error:", err));

    axios
      .get(`/api/dashboard/seller/top-selling/${userId}`)
      .then((res) => setTopSelling(res.data))
      .catch((err) => console.error("Top selling fetch error:", err));
  }, [userId]);

  const barData = [
    { name: "Listed", count: stats.totalListed },
    { name: "Sold", count: stats.totalSold },
  ];

  const pieData = [
    { name: "Pending", value: stats.ordersPending },
    { name: "Completed", value: stats.totalSold },
  ];

  const COLORS = ["#ff7675", "#55efc4"];

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Seller Dashboard</h1>

      <div className="stats-section" style={styles.statsContainer}>
        <div style={styles.statCard}>
          <h3 style={styles.cardTitle}>Total Cars Listed</h3>
          <p style={styles.cardValue}>{stats.totalListed}</p>
        </div>
        <div style={styles.statCard}>
          <h3 style={styles.cardTitle}>Cars Sold</h3>
          <p style={styles.cardValue}>{stats.totalSold}</p>
        </div>
        <div style={styles.statCard}>
          <h3 style={styles.cardTitle}>Orders Pending</h3>
          <p style={styles.cardValue}>{stats.ordersPending}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div
        style={{
          display: "flex",
          gap: "40px",
          flexWrap: "wrap",
          marginTop: "40px",
        }}
      >
        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>Listings vs Sold</h3>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#0984e3" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>Order Status</h3>
          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ marginTop: "40px" }}>
        <h2 style={styles.subHeading}>Top Selling Cars</h2>
        <div style={styles.topSellingContainer}>
          {topSelling.length > 0 ? (
            topSelling.map((bike, idx) => (
              <div key={idx} style={styles.topBikeCard}>
                <img
                  src={bike.bikeURL}
                  alt={bike.model}
                  style={styles.bikeImage}
                />
                <p
                  style={{
                    fontWeight: "600",
                    fontSize: "16px",
                    margin: "5px 0",
                  }}
                >
                  {bike.model}
                </p>
                <p style={{ color: "#636e72" }}>Sold: {bike.soldCount}</p>
              </div>
            ))
          ) : (
            <p>No bikes sold yet.</p>
          )}
        </div>
      </div>

      <div style={{ marginTop: "40px" }}>
        <h2 style={styles.subHeading}>Recent Orders</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Buyer</th>
              <th>Bike</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(orders) && orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{order.buyer?.name || "N/A"}</td>
                  <td>{order.bike?.model || "N/A"}</td>
                  <td>₹{order.bike?.price}</td>
                  <td>{order.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No recent orders yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: "40px" }}>
        <h2 style={styles.subHeading}>Quick Actions</h2>
        <div style={styles.actionsContainer}>
          <button
            style={styles.actionBtn}
            onClick={() => (window.location.href = "/seller/addbikes")}
          >
            Add New Car
          </button>
          <button
            style={styles.actionBtn}
            onClick={() => (window.location.href = "/seller/mybikes")}
          >
            View Cars
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    fontFamily: "'Segoe UI', sans-serif",
    background: "#f0f2f5",
    minHeight: "100vh",
  },
  heading: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#2d3436",
    marginBottom: "30px",
  },
  subHeading: {
    fontSize: "22px",
    fontWeight: "600",
    color: "#2d3436",
    marginBottom: "10px",
  },
  statsContainer: {
    display: "flex",
    gap: "25px",
    flexWrap: "wrap",
  },
  statCard: {
    background: "#fff",
    padding: "25px",
    borderRadius: "14px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    flex: "1 1 250px",
    textAlign: "center",
    transition: "transform 0.3s ease",
  },
  cardTitle: {
    fontSize: "18px",
    marginBottom: "8px",
    color: "#2d3436",
  },
  cardValue: {
    fontSize: "26px",
    fontWeight: "bold",
    color: "#0984e3",
  },
  chartCard: {
    flex: "1 1 300px",
    minWidth: "300px",
    height: "300px",
    background: "#fff",
    borderRadius: "14px",
    padding: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
  chartTitle: {
    fontWeight: "600",
    fontSize: "18px",
    color: "#2d3436",
    marginBottom: "10px",
  },
  topSellingContainer: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    marginTop: "15px",
  },
  topBikeCard: {
    background: "#fff",
    padding: "18px",
    borderRadius: "12px",
    width: "200px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
    transition: "all 0.3s ease-in-out",
  },
  bikeImage: {
    width: "100%",
    height: "120px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "10px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    overflow: "hidden",
  },
  actionsContainer: {
    display: "flex",
    gap: "20px",
    marginTop: "15px",
  },
  actionBtn: {
    background: "#0984e3",
    color: "#fff",
    padding: "12px 22px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "15px",
    transition: "background 0.3s",
  },
};

export default SellerDashboard;
