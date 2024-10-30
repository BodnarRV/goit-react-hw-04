import React from "react";
import "./ImageGallery.css";
import ImageCard from "../ImageCard/ImageCard";

export default function ImageGallery({ images, onImageClick }) {
  return (
    <ul className="images-list">
      {images.map((img) => (
        <li className="image-item" key={img.id}>
          <ImageCard
            src={img.urls.small}
            alt={img.alt_description}
            onClick={() => onImageClick(img)}
          />
        </li>
      ))}
    </ul>
  );
}
