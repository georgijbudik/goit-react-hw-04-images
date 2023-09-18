import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Modal extends Component {
  static propTypes = {
    largeImageURL: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleEscClick);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscClick);
  }

  handleEscClick = e => {
    const { onClose } = this.props;
    if (e.code === 'Escape') {
      onClose();
    }
  };

  render() {
    const { largeImageURL, onClose } = this.props;

    return (
      <div className="overlay" onClick={onClose}>
        <div className="modal">
          <img src={largeImageURL} alt="Large" />
        </div>
      </div>
    );
  }
}

export default Modal;
