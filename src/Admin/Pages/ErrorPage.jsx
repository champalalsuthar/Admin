import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = ({ error }) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
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
      <h1 style={{ color: "rgb(25, 118, 210)" }}>Oops!</h1>
      <p style={{ color: "#4B5563", insetBlockStart: "1rem" }}>
        Sorry, an unexpected error has occurred.
      </p>
      {/* <p style={{ color: "#4B5563", insetBlockStart: "0.5rem" }}>
        <i>{error.message}</i>
      </p> */}
      <button
        onClick={handleGoHome}
        style={{
          insetBlockStart: "1rem",
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          color: "#ffffff",
          backgroundColor: "rgb(25, 118, 210)",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Go to Home
      </button>
    </div>
  );
};

export default ErrorPage;
