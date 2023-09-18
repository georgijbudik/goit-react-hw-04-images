import React from 'react';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ imageUrl, alt, onImageClick }) => {
  return (
    <li className="imageGalleryItem" onClick={onImageClick}>
      <img src={imageUrl} alt={alt} className="imageGalleryItem-image" />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
