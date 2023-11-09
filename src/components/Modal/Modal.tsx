import React, { useEffect, KeyboardEvent } from 'react';

interface ModalProps {
  largeImageURL: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ largeImageURL, onClose }) => {
  useEffect(() => {
    const handleEscClick = (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscClick as any);

    return () => {
      window.removeEventListener('keydown', handleEscClick as any);
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

export default Modal;
