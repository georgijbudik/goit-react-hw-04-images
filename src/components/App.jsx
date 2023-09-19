import Searchbar from './Searchbar/';
import ImageGallery from './ImageGallery/';
import Modal from './Modal/';
import { fetchImages } from 'services/api';
import LoadMore from 'components/Button/';
import Loader from './Loader/';
import { useEffect, useState } from 'react';

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
  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    const fetchImagesAndUpdateState = async () => {
      try {
        const { hits, totalHits } = await fetchImages(searchQuery, page);
        setIsLoading(true);
        setImages(prevImages => [...prevImages, ...hits]);
        setIsImagesShown(true);
        setTotalHits(totalHits);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchImagesAndUpdateState();
  }, [page, searchQuery]);

  const handleLoadMoreClick = () => setPage(prevPage => prevPage + 1);

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
