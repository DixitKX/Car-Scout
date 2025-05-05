import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Slide, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomLoader from '../../hooks/CustomLoader';
import ReviewForm from '../reviews/ReviewForm';
import ReviewList from '../reviews/ReviewList';

const ExploreBikes = (bikeId) => {
   
    const [bikes, setBikes] = useState([]);
    const [allBikes, setAllBikes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("");
    const [selectedBike, setSelectedBike] = useState(null);
    const [wishlist, setWishlist] = useState([]);
    const [RefreshReviews, setRefreshReviews] = useState(false);

    useEffect(() => {
        const fetchBikes = async () => {
            try {
                const response = await axios.get("/bike/getallbikes");
                if (response.data && Array.isArray(response.data.data)) {
                    setBikes(response.data.data);
                    setAllBikes(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching bikes:", error);
            }
            setLoading(false);
        };
        fetchBikes();
    }, []);

    const handleSearch = () => {
        const filtered = allBikes.filter(bike => (bike.model || "").toLowerCase().includes(filter.toLowerCase()));
        setBikes(filtered);
    };

    const handleWishlist = async (bike) => {
        try {
            const userId = localStorage.getItem("id");
            if (!userId) {
                toast.error("Please login to add to wishlist");
                return;
            }

            await axios.post("/wishlist/add", { 
                bikeId: bike._id,
                userId: userId
            });
            setWishlist([...wishlist, bike]);
            toast.success("Added to Wishlist");
        } catch (error) {
            console.error("Error adding to wishlist:", error.response?.data || error.message);
            toast.error("Failed to add to Wishlist");
        }
    };

   

    const handleBuyNow = async (bike) => {
      try {
        const userId = localStorage.getItem("id");
    
        const response = await axios.post("/order/create-order", {
          amount: bike.price,
          userId,
          bikeId: bike._id
        });
    
        const { order, user } = response.data;
    
        const options = {
          key: "rzp_test_A00Xot9pYdQcbk",
          amount: order.amount,
          currency: "INR",
          name: "BikeScout",
          description: "Bike Purchase",
          image: "/logo.png",
          order_id: order.id,
          handler: async function (response) {
            toast.success("Payment successful!");
    
          
        
    
            toast.success("Order saved successfully!");
          },
          prefill: {
            name: user.Username,
            email: user.email,
            contact: user.Phonenumber
          },
          theme: {
            color: "#fbc531"
          }
        };
    
        const rzp = new window.Razorpay(options);
        rzp.open();
    
      } catch (err) {
        console.error("Razorpay error: ", err);
        toast.error("Something went wrong during the payment process.");
      }
    };
    
      
    const closeModal = () => {
        setSelectedBike(null);
    };

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
            transition={Slide} 
            theme="colored"
          />
        <div style={{ padding: "20px", background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)", minHeight: "100vh" }}>
            <h1 style={{ textAlign: "center", color: "#fbc531", fontSize: "32px", fontWeight: "bold", marginBottom: "20px" }}>Explore Cars</h1>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                <input 
                    type="text" 
                    placeholder="Search cars..." 
                    value={filter} 
                    onChange={(e) => setFilter(e.target.value)}
                    style={{ padding: "10px", borderRadius: "8px", border: "2px solid #fbc531", width: "300px", fontSize: "16px", backgroundColor: "#1e272e", color: "#fff", outline: "none" }}
                />
                <button 
                    onClick={handleSearch} 
                    style={{ marginLeft: "10px", padding: "10px 15px", borderRadius: "8px", border: "none", backgroundColor: "#fbc531", color: "#000", fontSize: "16px", fontWeight: "bold", cursor: "pointer", transition: "background 0.3s" }}
                    onMouseOver={(e) => e.target.style.backgroundColor = "#e1b12c"}
                    onMouseOut={(e) => e.target.style.backgroundColor = "#fbc531"}
                >
                    Search
                </button>
            </div>
            {loading ? (
               <CustomLoader />
            ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
                    {bikes.map(bike => (
                        <div key={bike._id} 
                            style={{ padding: "15px", borderRadius: "12px", backgroundColor: "#1e272e", transition: "transform 0.3s, box-shadow 0.3s", cursor: "pointer", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)", color: "#fff" }}
                            onMouseOver={(e) => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.3)"; }}
                            onMouseOut={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)"; }}
                        >
                            <img src={bike.bikeURL} alt={bike.model} style={{ width: "100%", borderRadius: "10px", height: "200px", objectFit: "cover" }} />
                            <h3 style={{ color: "#fbc531", fontSize: "20px", marginTop: "10px" }}>{bike.model}</h3>
                            <p style={{ fontSize: "14px", color: "#dcdde1" }}>Brand: {bike.brand}</p>
                            <p style={{ fontSize: "16px", fontWeight: "bold", color: "#fbc531" }}>PRICE: ₹{bike.price}</p>
                        
                            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                                <button onClick={() => setSelectedBike(bike)} 
                                    style={{ padding: "8px 12px", borderRadius: "8px", backgroundColor: "#00a8ff", color: "#fff", fontWeight: "bold", cursor: "pointer", fontSize: "14px", transition: "background 0.3s" }}>View Details</button>
                              
                              <button
  onClick={() => handleBuyNow(bike)}
  style={{
    padding: "8px 12px",
    borderRadius: "8px",
    backgroundColor: "#44bd32",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background 0.3s",
    border: "none",
  }}
  onMouseOver={(e) => (e.target.style.backgroundColor = "#2ecc71")}
  onMouseOut={(e) => (e.target.style.backgroundColor = "#44bd32")}
>
  Buy Now
</button>
                           </div>
                        </div>
                    ))}
                </div>
            )}

{selectedBike && (
  <div
    style={{
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "90%",
      maxWidth: "800px",
      background: "#fff",
      padding: "25px",
      borderRadius: "16px",
      textAlign: "center",
      color: "#333",
      boxShadow: "0px 12px 40px rgba(0, 0, 0, 0.3)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      overflowY: "auto",
      maxHeight: "85vh",
      zIndex: 9999,
    }}
  >
    {/* Bike Image */}
    <img
      src={selectedBike.bikeURL}
      alt={selectedBike.model}
      style={{
        width: "100%",
        maxHeight: "400px",
        objectFit: "cover",
        borderRadius: "12px",
        marginBottom: "20px",
      }}
    />

    {/* Bike Main Info */}
    <h2 style={{ fontSize: "30px", fontWeight: "bold", margin: "10px 0", color: "#2f3640" }}>
      {selectedBike.model}
    </h2>
    <p style={{ fontSize: "18px", marginBottom: "5px" }}>
      <strong>Brand:</strong> {selectedBike.brand}
    </p>
    <p style={{ fontSize: "22px", fontWeight: "bold", color: "#44bd32", marginBottom: "10px" }}>
      ₹{selectedBike.price}
    </p>

    {/* Extra Bike Details */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "10px",
        width: "100%",
        textAlign: "left",
        background: "#f1f2f6",
        padding: "20px",
        borderRadius: "12px",
        marginTop: "10px",
      }}
    >
      <p><strong>Color:</strong> {selectedBike.color || "N/A"}</p>
      <p><strong>Variant:</strong> {selectedBike.variant || "N/A"}</p>
      <p><strong>Fuel Type:</strong> {selectedBike.fuelType || "N/A"}</p>
      <p><strong>Mileage:</strong> {selectedBike.mileage ? `${selectedBike.mileage} km/l` : "N/A"}</p>
    </div>

    {/* Description Section */}
    {selectedBike.descripiton && (
      <div
        style={{
          width: "100%",
          backgroundColor: "#f5f6fa",
          padding: "15px",
          borderRadius: "10px",
          marginTop: "15px",
          textAlign: "left",
          color: "#2f3542",
        }}
      >
        <strong>Description:</strong>
        <p style={{ marginTop: "5px", fontSize: "15px" }}>{selectedBike.descripiton}</p>
      </div>
    )}

    {/* Action Buttons */}
    <div style={{ display: "flex", gap: "12px", marginTop: "20px", justifyContent: "center" }}>
      <button
        onClick={closeModal}
        style={{
          background: "#ff4757",
          color: "#fff",
          border: "none",
          padding: "12px 20px",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Close
      </button>
      <button
        onClick={() => handleWishlist(selectedBike)}
        style={{
          background: "#e84118",
          color: "#fff",
          border: "none",
          padding: "12px 20px",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Add to Wishlist
      </button>
    </div>

    {/* Reviews */}
    <div style={{ width: "100%", marginTop: "20px" }}>
      <ReviewForm bikeId={selectedBike._id} />
      <ReviewList bikeId={selectedBike._id} />
    </div>
  </div>
)}

        </div>
        </>
    );
};

export default ExploreBikes;
