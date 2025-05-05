import React, { useEffect, useState } from "react";
import axios from "axios";
import { Slide, toast, ToastContainer } from "react-toastify"; // Import toast
import CustomLoader from "../../hooks/CustomLoader";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const userId = localStorage.getItem("id");
        if (!userId) {
          setError("User ID not found in localStorage");
          setLoading(false);
          return;
        }

        console.log("Fetching wishlist for User ID:", userId);
        const response = await axios.get(`/wishlist/user/${userId}`);

        console.log("Wishlist Response:", response.data);

        if (response.data.success && Array.isArray(response.data.data)) {
          setWishlist(response.data.data);
        } else {
          setError("No wishlist data found");
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        setError("Failed to fetch wishlist");
      }
      setLoading(false);
    };

    fetchWishlist();
  }, []);

  const handleRemove = async (id) => {
    try {
      console.log(`Removing wishlist item with ID: ${id}`);

      const response = await axios.delete(`/wishlist/wishlist/${id}`);

      console.log("Remove Response:", response.data);

      if (response.data.success) {
        setWishlist(wishlist.filter((item) => item._id !== id));
        toast.success("Removed from wishlist!");
      } else {
        toast.error("Failed to remove item.");
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error("Error removing item.");
    }
  };

  if (loading) return <CustomLoader />;
  if (error) return <p>{error}</p>;

  return (
    <>
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
        theme="colored"
      ></ToastContainer>
      <div
        style={{
          padding: "20px",
          backgroundColor: "#f9f9f9",
          borderRadius: "10px",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#ff6200" }}>My Wishlist</h2>
        {wishlist.length === 0 ? (
          <p style={{ textAlign: "center", color: "#666" }}>
            No items in wishlist.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "20px",
            }}
          >
            {wishlist.map((item) => (
              <div
                key={item._id}
                style={{
                  padding: "15px",
                  borderRadius: "10px",
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}
              >
                {item.bikeId ? (
                  <>
                    <img
                      src={item.bikeId.bikeURL}
                      alt={item.bikeId.model}
                      style={{
                        width: "100%",
                        borderRadius: "8px",
                        height: "150px",
                        objectFit: "cover",
                      }}
                    />
                    <h3
                      style={{
                        color: "#ff6200",
                        fontSize: "18px",
                        marginTop: "10px",
                      }}
                    >
                      {item.bikeId.model}
                    </h3>
                    <p style={{ fontSize: "14px", color: "#666" }}>
                      Brand: {item.bikeId.brand}
                    </p>
                    <p style={{ fontSize: "16px", fontWeight: "bold" }}>
                      Price: ₹{item.bikeId.price}
                    </p>
                    <button
                      onClick={() => handleRemove(item._id)}
                      style={{
                        marginTop: "10px",
                        padding: "8px 12px",
                        borderRadius: "8px",
                        border: "none",
                        backgroundColor: "#ff4d4d",
                        color: "#fff",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      Remove
                    </button>
                  </>
                ) : (
                  <p style={{ color: "red" }}>Car details not available</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Wishlist;
