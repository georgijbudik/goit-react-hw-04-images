import { useEffect } from 'react';
import PropTypes from 'prop-types';

const Modal = ({ largeImageURL, onClose }) => {
  useEffect(() => {
    const handleEscClick = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscClick);

    return () => {
      window.removeEventListener('keydown', handleEscClick);
    };
  }, [onClose]);

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal">
        <img src={largeImageURL} alt="Large" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
