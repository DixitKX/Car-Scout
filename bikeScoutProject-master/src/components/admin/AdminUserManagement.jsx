import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomLoader from "../../hooks/CustomLoader";

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/users", {
        params: {
          search,
          role: filterRole,
          page: currentPage,
          limit: usersPerPage,
        },
      });
      setUsers(res.data.users);
    } catch (err) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search, filterRole, currentPage]);

  const toggleBlock = async (id) => {
    setLoading(true);
    try {
      await axios.put(`/api/users/block/${id}`);
      toast.success("User status updated");
      fetchUsers();
    } catch (err) {
      toast.error("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async () => {
    setLoading(true);
    try {
      await axios.delete(`/api/users/${selectedUser._id}`);
      toast.success("User deleted");
      setShowDeleteModal(false);
      fetchUsers();
    } catch (err) {
      toast.error("Failed to delete user");
    } finally {
      setLoading(false);
    }
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  if (loading) return <CustomLoader />;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <ToastContainer />

      <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>
        User Management
      </h2>

      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            flex: 1,
          }}
        />
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        >
          <option value="">All Roles</option>
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "20px",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={styles.th}>Username</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Role</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user._id}>
              <td style={styles.td}>{user.Username}</td>
              <td style={styles.td}>{user.email}</td>
              <td style={styles.td}>{user.roleId?.name || "N/A"}</td>
              <td style={styles.td}>
                <button
                  style={styles.actionBtn}
                  onClick={() => handleView(user)}
                >
                  View
                </button>
                <button
                  style={styles.actionBtn}
                  onClick={() => toggleBlock(user._id)}
                >
                  {user.isBlocked ? "Unblock" : "Block"}
                </button>
                <button
                  style={{ ...styles.actionBtn, backgroundColor: "#dc3545" }}
                  onClick={() => handleDeleteClick(user)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx + 1)}
            style={{
              margin: "0 5px",
              padding: "6px 12px",
              backgroundColor: idx + 1 === currentPage ? "#007bff" : "#f0f0f0",
              color: idx + 1 === currentPage ? "#fff" : "#000",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {idx + 1}
          </button>
        ))}
      </div>

      {/* View Modal */}
      {showViewModal && selectedUser && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>User Details</h3>
            <p>
              <strong>Username:</strong> {selectedUser.Username}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>Role:</strong> {selectedUser.roleId?.name || "N/A"}
            </p>
            <button
              onClick={() => setShowViewModal(false)}
              style={styles.actionBtn}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedUser && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>Confirm Delete</h3>
            <p>
              Are you sure you want to delete user{" "}
              <strong>{selectedUser.Username}</strong>?
            </p>
            <button
              onClick={deleteUser}
              style={{ ...styles.actionBtn, backgroundColor: "#dc3545" }}
            >
              Yes, Delete
            </button>
            <button
              onClick={() => setShowDeleteModal(false)}
              style={styles.actionBtn}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  th: {
    textAlign: "left",
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
  actionBtn: {
    marginRight: "8px",
    padding: "6px 10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    minWidth: "300px",
    boxShadow: "0 0 10px rgba(0,0,0,0.3)",
  },
};

export default AdminUserManagement;
