import ImageGalleryItem from 'components/ImageGalleryItem/';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ImageGallery extends Component {
  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page, renderImages } = this.props;
    if (prevProps.searchQuery !== searchQuery) {
      renderImages(searchQuery, page);
    }
  }

  render() {
    const { images, onImageClick } = this.props;

    return (
      <div>
        <ul className="imageGallery">
          {images.map(({ id, webformatURL, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              imageUrl={webformatURL}
              alt={`Image ${id}`}
              onImageClick={() => onImageClick(largeImageURL)}
            />
          ))}
        </ul>
      </div>
    );
  }
}
ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  searchQuery: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  onImageClick: PropTypes.func.isRequired,
  renderImages: PropTypes.func.isRequired,
};

export default ImageGallery;
