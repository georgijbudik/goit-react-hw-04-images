import Searchbar from './Searchbar/';
import ImageGallery from './ImageGallery/';
import Modal from './Modal/';
import { fetchImages } from 'services/api';
import LoadMore from 'components/Button/';
import Loader from './Loader/';
import React, { Component } from 'react';

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    showModal: false,
    largeImageURL: '',
    isImagesShown: false,
    totalHits: 0,
    isLoading: false,
  };

  handleFormSubmit = searchQuery => {
    if (searchQuery !== this.state.searchQuery) {
      this.setState({
        searchQuery,
        page: 1,
        images: [],
        isImagesShown: false,
        isLoading: true,
      });
    }
  };

  handleCloseModal = () => {
    this.setState({
      largeImageURL: '',
      showModal: false,
    });
  };
  handleImageClick = largeImageURL => {
    this.setState({ largeImageURL, showModal: true });
  };
  fetchImagesAndUpdateState = async (searchQuery, page) => {
    try {
      const { hits, totalHits } = await fetchImages(searchQuery, page);
      this.setState({ isLoading: true });
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        page: prevState.page + 1,
        isImagesShown: true,
        searchQuery,
        totalHits,
      }));
    } catch (error) {
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleLoadMoreClick = () => {
    const { searchQuery, page } = this.state;

    this.fetchImagesAndUpdateState(searchQuery, page);
  };

  render() {
    const {
      searchQuery,
      page,
      images,
      showModal,
      largeImageURL,
      isImagesShown,
      totalHits,
      isLoading,
    } = this.state;
    const shouldShowButton = images.length < totalHits;

    return (
      <div className="app">
        <Searchbar onSubmit={this.handleFormSubmit} />
        {isLoading && <Loader />}
        <ImageGallery
          images={images}
          searchQuery={searchQuery}
          page={page}
          onImageClick={this.handleImageClick}
          renderImages={this.fetchImagesAndUpdateState}
        />
        {isImagesShown && shouldShowButton && (
          <LoadMore onLoadMore={this.handleLoadMoreClick} />
        )}
        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            onClose={this.handleCloseModal}
          />
        )}
      </div>
    );
  }
}
