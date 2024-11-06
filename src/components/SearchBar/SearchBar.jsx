import React from "react";
import "./SearchBar.css";
import toast, { Toaster } from "react-hot-toast";

export default function SearchBar({ onQuerySet }) {
  const notify = () =>
    toast.error("Please enter text to search for images.", { duration: 3000 });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const query = e.target.elements.query.value.trim();
    if (query === "") {
      notify();
      return;
    }
    onQuerySet(query);
  };

  return (
    <>
      <Toaster />
      <header className="header">
        <form className="search-form" onSubmit={handleFormSubmit}>
          <button type="submit" className="search-btn">
            🔍
          </button>
          <input
            className="search-input"
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    </>
  );
}
