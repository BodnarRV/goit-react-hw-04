import { useState } from "react";
import axios from "axios";
import "./App.css";
import { DNA } from "react-loader-spinner";

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
  const imagesPerPage = 12;

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setCurrentPage(1);

    try {
      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          headers: {
            Authorization:
              "Client-ID 3FImjmzjTR33XOk3M5wAd94nl6FLOhldWpXN7W2tJpM",
          },
          params: {
            query: query,
            page: currentPage,
            per_page: imagesPerPage,
          },
        }
      );

      setImages(response.data.results);
    } catch (error) {
      setError(error.message || "Щось пішло не так!");
    } finally {
      setLoading(false);
    }
  };

  const loadMoreImages = async () => {
    setError("");
    setCurrentPage((prevPage) => prevPage + 1);

    try {
      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          headers: {
            Authorization:
              "Client-ID 3FImjmzjTR33XOk3M5wAd94nl6FLOhldWpXN7W2tJpM",
          },
          params: {
            query: query,
            page: currentPage + 1,
            per_page: imagesPerPage,
          },
        }
      );

      setImages((prevImages) => [...prevImages, ...response.data.results]);
    } catch (error) {
      setError(error.message || "Щось пішло не так!");
    }
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
          <LoadMoreBtn onLoadMore={loadMoreImages} />
        </>
      )}
      {loading && (
        <div className="loader-container">
          <DNA
            visible={true}
            height="180"
            width="180"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
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
