import ImageGalleryItem from 'components/ImageGalleryItem/';

interface ImageGalleryProps {
  images: {
    id: number;
    webformatURL: string;
    largeImageURL: string;
  }[];
  onImageClick: (url: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  onImageClick,
}) => {
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

export default ImageGallery;
