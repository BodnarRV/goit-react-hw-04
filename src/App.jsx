import { useState, useEffect } from "react";
import { fetchImages } from "./api";
import { DNA } from "react-loader-spinner";
import "./App.css";

// Components
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const imagesPerPage = 12;

  useEffect(() => {
    if (!query) return;

    const getImages = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await fetchImages(query, currentPage, imagesPerPage);
        setImages((prevImages) =>
          currentPage === 1 ? data.results : [...prevImages, ...data.results]
        );
        setTotalPages(data.total_pages);
      } catch (error) {
        setError(error.message || "Щось пішло не так!");
      } finally {
        setLoading(false);
      }
    };

    getImages();
  }, [query, currentPage]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const loadMoreImages = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} onQuerySet={setQuery} />
      {images.length > 0 && (
        <>
          <ImageGallery images={images} onImageClick={openModal} />
          {currentPage < totalPages && <LoadMoreBtn onLoadMore={loadMoreImages} />}
        </>
      )}
      {loading && (
        <div className="loader-container">
          <DNA visible={true} height="180" width="180" ariaLabel="dna-loading" />
        </div>
      )}
      {error && <ErrorMessage error={error} />}

      <ImageModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        image={selectedImage}
      />
    </>
  );
}

export default App;
