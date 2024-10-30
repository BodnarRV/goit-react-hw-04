import React from "react";
import "./ImageCard.css";

export default function ImageCard({ src, alt, onClick }) {
  return (
    <div className="img-container" onClick={onClick}>
      <img className="img" src={src} alt={alt} />
    </div>
  );
}
