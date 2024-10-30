import React from "react";
import "./ErrorMessage.css";

export default function ErrorMessage({ error }) {
  return (
    <div className="error-container">
      <p className="error-message">Something went wrong error - {error}</p>
    </div>
  );
}
