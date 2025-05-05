import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import CustomLoader from "../../hooks/CustomLoader";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #dfe6e9",
          padding: "10px 14px",
          borderRadius: "12px",
          boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)",
          fontSize: "14px",
        }}
      >
        <p style={{ margin: 0, fontWeight: "bold", color: "#2d3436" }}>
          {label}
        </p>
        {payload.map((item, idx) => (
          <p key={idx} style={{ color: item.color, margin: "4px 0" }}>
            {item.name}: {item.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const AdminDashboard = () => {
  const [overview, setOverview] = useState({
    totalUsers: 0,
    totalBikes: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  const [monthlyUsers, setMonthlyUsers] = useState([]);
  const [monthlyBikes, setMonthlyBikes] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get("/api/admin/dashboard/overview").then((res) => {
      setOverview(res.data);
      setLoading(false);
    });
    setLoading(true);
    axios.get("/api/admin/dashboard/monthly-users").then((res) => {
      setMonthlyUsers(res.data);
      setLoading(false);
    });
    setLoading(true);
    axios.get("/api/admin/dashboard/monthly-bikes").then((res) => {
      setMonthlyBikes(res.data);
      setLoading(false);
    });
    setLoading(true);
    axios.get("/api/admin/dashboard/monthly-revenue").then((res) => {
      setMonthlyRevenue(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <CustomLoader />;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🚀 Admin Dashboard</h1>

      {/* Overview Cards */}
      <div style={styles.cardsContainer}>
        <OverviewCard
          label="Total Users"
          value={overview.totalUsers}
          color="#6c5ce7"
        />
        <OverviewCard
          label="Total Bikes"
          value={overview.totalBikes}
          color="#00cec9"
        />
        <OverviewCard
          label="Total Orders"
          value={overview.totalOrders}
          color="#fdcb6e"
        />
        <OverviewCard
          label="Revenue"
          value={`₹${overview.totalRevenue}`}
          color="#e17055"
        />
      </div>

      {/* Charts */}
      <div style={styles.chartsSection}>
        <ChartBox title="📈 Monthly New Users">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyUsers}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" />
              <Line
                type="monotone"
                dataKey="count"
                name="New Users"
                stroke="#6c5ce7"
                strokeWidth={3}
                dot={{ r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartBox>

        <ChartBox title="🚲 Bikes Listed per Month">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyBikes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" />
              <Bar
                dataKey="count"
                name="Bikes Listed"
                fill="#00cec9"
                barSize={40}
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>

        <ChartBox title="💰 Revenue per Month">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" />
              <Line
                type="monotone"
                dataKey="revenue"
                name="Revenue (₹)"
                stroke="#e17055"
                strokeWidth={3}
                dot={{ r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartBox>
      </div>
    </div>
  );
};

// Overview Card Component
const OverviewCard = ({ label, value, color }) => (
  <div style={{ ...styles.card, borderTop: `5px solid ${color}` }}>
    <h3 style={{ fontSize: "16px", color: "#636e72", marginBottom: "10px" }}>
      {label}
    </h3>
    <p style={{ fontSize: "28px", fontWeight: "700", color }}>{value}</p>
  </div>
);

// Chart Card Container
const ChartBox = ({ title, children }) => (
  <div style={styles.chartBox}>
    <h3 style={styles.chartTitle}>{title}</h3>
    {children}
  </div>
);

const styles = {
  container: {
    padding: "40px",
    background: "linear-gradient(to bottom right, #f8f9fa, #dfe6e9)",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', sans-serif",
  },
  title: {
    fontSize: "40px",
    fontWeight: "700",
    marginBottom: "40px",
    color: "#2c3e50",
    textAlign: "center",
  },
  cardsContainer: {
    display: "flex",
    gap: "24px",
    marginBottom: "50px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    flex: "1 1 240px",
    background: "#ffffff",
    padding: "24px 28px",
    borderRadius: "20px",
    boxShadow: "0 12px 24px rgba(0,0,0,0.07)",
    textAlign: "center",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  chartsSection: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
    gap: "40px",
  },
  chartBox: {
    background: "#ffffff",
    padding: "28px",
    borderRadius: "20px",
    boxShadow: "0 10px 28px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",
  },
  chartTitle: {
    marginBottom: "20px",
    fontSize: "20px",
    fontWeight: "600",
    color: "#2c3e50",
    borderBottom: "1px solid #dfe6e9",
    paddingBottom: "8px",
  },
};

export default AdminDashboard;
