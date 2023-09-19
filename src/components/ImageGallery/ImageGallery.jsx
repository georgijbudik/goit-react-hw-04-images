import ImageGalleryItem from 'components/ImageGalleryItem/';
import PropTypes from 'prop-types';

const ImageGallery = ({ images, onImageClick }) => {
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
};
ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGallery;
