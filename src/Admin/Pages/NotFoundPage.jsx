import React from "react";
import { useNavigate } from "react-router";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate("/crm/login");
  };

  return (
    <div
      style={{
        blockSize: "90vh",
        inlineSize: "94vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      id="error-page"
    >
      <h1 style={{ color: "rgb(25, 118, 210)" }}>404 - Page Not Found!</h1>
      <p style={{ color: "#4B5563", insetBlockStart: "1rem" }}>
        The page you are looking for does not exist
      </p>
      <button
        onClick={goToHomePage}
        style={{
          insetBlockStart: "1rem",
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          color: "#fff",
          backgroundColor: "rgb(25, 118, 210)",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Go to Home Page
      </button>
    </div>
  );
};

export default NotFoundPage;
