import PropTypes from 'prop-types';

const LoadMore = ({ onLoadMore }) => {
  return (
    <button type="button" className="button" onClick={onLoadMore}>
      Load more
    </button>
  );
};

LoadMore.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};

export default LoadMore;
