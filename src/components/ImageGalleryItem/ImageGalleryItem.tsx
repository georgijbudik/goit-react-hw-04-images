import React from 'react';

interface ImageGalleryItemProps {
  imageUrl: string;
  alt: string;
  onImageClick: () => void;
}

const ImageGalleryItem: React.FC<ImageGalleryItemProps> = ({
  imageUrl,
  alt,
  onImageClick,
}) => {
  return (
    <li className="imageGalleryItem" onClick={onImageClick}>
      <img src={imageUrl} alt={alt} className="imageGalleryItem-image" />
    </li>
  );
};

export default ImageGalleryItem;
