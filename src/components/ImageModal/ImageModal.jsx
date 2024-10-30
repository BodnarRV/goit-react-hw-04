import React from "react";
import Modal from "react-modal";
import "./ImageModal.css";

Modal.setAppElement("#root");

export default function ImageModal({ isOpen, onRequestClose, image }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      {image && (
        <div className="modal-image-container">
          <img src={image.urls.regular} alt={image.alt_description} />
        </div>
      )}
    </Modal>
  );
}
