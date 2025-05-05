import { useEffect, useState } from "react";
import axios from "axios";

const ReviewList = ({ bikeId }) => {
  const [reviews, setReviews] = useState([]); // Default empty array
  const [visibleCount, setVisibleCount] = useState(2); // Initially show 2 reviews
  const [expanded, setExpanded] = useState(false); // Track if expanded

  useEffect(() => {
    axios
      .get(`/review/getReviewByBikeid/${bikeId}`)
      .then((res) => {
        console.log("✅ Fetched Reviews:", res.data); // Debugging API response
        if (Array.isArray(res.data.data)) {
          setReviews(res.data.data); // Ensure it's an array
        } else {
          setReviews([]); // Fallback to empty array
        }
      })
      .catch((err) => {
        console.error("❌ Error fetching reviews:", err);
        setReviews([]); // Set empty array on error
      });
  }, [bikeId]);

  const handleToggleView = () => {
    if (expanded) {
      setVisibleCount(2); // Collapse to show only 2 reviews
    } else {
      setVisibleCount(reviews.length); // Expand to show all reviews
    }
    setExpanded(!expanded); // Toggle state
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🌟 User Reviews</h2>

      {reviews.length > 0 ? (
        <>
          {reviews.slice(0, visibleCount).map((review) => (
            <div key={review._id} style={styles.reviewCard}>
              <div style={styles.userInfo}>
                <div style={styles.avatar}>
                  {review.userId?.Username?.charAt(0).toUpperCase() || "U"}
                </div>
                <p style={styles.userName}>
                  {review.userId?.Username || "Unknown User"}
                </p>
              </div>

              <div style={styles.starRating}>
                {[...Array(5)].map((_, index) => (
                  <span
                    key={index}
                    style={{
                      ...styles.star,
                      color: index < review.rating ? "#ffcc00" : "#ddd",
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>

              <p style={styles.comment}>
                📝 {review.comment || "No comment provided"}
              </p>
            </div>
          ))}

          {reviews.length > 2 && (
            <button style={styles.viewMoreButton} onClick={handleToggleView}>
              {expanded ? "View Less" : "View More"}
            </button>
          )}
        </>
      ) : (
        <p style={styles.noReviews}>⚠ No reviews available for this bike.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "700px",
    margin: "40px auto",
    fontFamily: "'Inter', sans-serif",
    padding: "10px",
  },
  heading: {
    textAlign: "center",
    fontSize: "26px",
    color: "#222",
    fontWeight: "bold",
    marginBottom: "25px",
  },
  reviewCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
    border: "1px solid #f1f1f1",
    transition: "transform 0.3s ease-in-out",
    cursor: "pointer",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  avatar: {
    width: "40px",
    height: "40px",
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "18px",
    fontWeight: "bold",
    marginRight: "10px",
  },
  userName: {
    fontWeight: "bold",
    fontSize: "16px",
    color: "#222",
  },
  starRating: {
    display: "flex",
    marginBottom: "8px",
  },
  star: {
    fontSize: "20px",
    transition: "color 0.3s",
  },
  comment: {
    fontSize: "15px",
    color: "#333",
    lineHeight: "1.6",
    marginTop: "5px",
    textAlign: "left",
  },
  noReviews: {
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "20px",
    fontSize: "16px",
  },
  viewMoreButton: {
    display: "block",
    width: "180px",
    margin: "20px auto",
    padding: "12px 20px",
    background: "linear-gradient(135deg, #6e8efb, #a777e3)", // Gradient background
    color: "white",
    border: "none",
    borderRadius: "30px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
    textTransform: "uppercase",
  },
};

export default ReviewList;
