import React from "react";
import "./LoadMoreBtn.css";

export default function LoadMoreBtn({ onLoadMore }) {
  return (
    <div className="btn-container">
      <button className="loadMore-btn" type="button" onClick={onLoadMore}>
        Load more
      </button>
    </div>
  );
}
