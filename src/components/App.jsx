import Searchbar from './Searchbar/';
import ImageGallery from './ImageGallery/';
import Modal from './Modal/';
import { fetchImages } from 'services/api';
import LoadMore from 'components/Button/';
import Loader from './Loader/';
import { useState } from 'react';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [isImagesShown, setIsImagesShown] = useState(false);
  const [totalHits, setTotalHits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = query => {
    if (query !== searchQuery) {
      setSearchQuery(query);
      setPage(1);
      setImages([]);
      setIsImagesShown(false);
      setIsLoading(true);
    }
  };

  const handleCloseModal = () => {
    setLargeImageURL('');
    setShowModal(false);
  };
  const handleImageClick = largeImageURL => {
    setLargeImageURL(largeImageURL);
    setShowModal(true);
  };

  const fetchImagesAndUpdateState = async (searchQuery, page) => {
    try {
      const { hits, totalHits } = await fetchImages(searchQuery, page);
      setIsLoading(true);
      setImages(state => [...state, ...hits]);
      setPage(state => state + 1);
      setIsImagesShown(true);
      setSearchQuery(searchQuery);
      setTotalHits(totalHits);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMoreClick = () =>
    fetchImagesAndUpdateState(searchQuery, page);

  const shouldShowButton = images.length < totalHits;

  return (
    <div className="app">
      <Searchbar onSubmit={handleFormSubmit} />
      {isLoading && <Loader />}
      <ImageGallery
        images={images}
        searchQuery={searchQuery}
        page={page}
        onImageClick={handleImageClick}
        renderImages={fetchImagesAndUpdateState}
      />
      {isImagesShown && shouldShowButton && (
        <LoadMore onLoadMore={handleLoadMoreClick} />
      )}
      {showModal && (
        <Modal largeImageURL={largeImageURL} onClose={handleCloseModal} />
      )}
    </div>
  );
};
