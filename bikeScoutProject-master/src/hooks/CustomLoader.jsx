import React from "react";

// Custom Loader Component
const CustomLoader = () => {
  return (
    <div style={loaderContainerStyle}>
      <div style={loaderStyle}></div>
    </div>
  );
};

// Loader Styles
const loaderContainerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: "linear-gradient(135deg, #4e54c8, #8f94fb)",
};

const loaderStyle = {
  width: "50px",
  height: "50px",
  border: "5px solid rgba(0, 0, 0, 0.1)",
  borderLeftColor: "#fff",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};

// Inject keyframes dynamically
const addLoaderAnimation = () => {
  const styleTag = document.createElement("style");
  styleTag.innerHTML = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(styleTag);
};

addLoaderAnimation();

export default CustomLoader;
