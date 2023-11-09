import { FC } from 'react';

interface LoadMoreProps {
  onLoadMore: () => void;
}

const LoadMore: FC<LoadMoreProps> = ({ onLoadMore }) => {
  return (
    <button type="button" className="button" onClick={onLoadMore}>
      Load more
    </button>
  );
};

export default LoadMore;
