import axios from 'axios';
import Notiflix from 'notiflix';
import { FetchImagesResponse } from 'components/App';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '38391590-35126e002ec20a67588ba6d67';

export const fetchImages = async (
  searchQuery: string,
  page: number
): Promise<FetchImagesResponse> => {
  const params = {
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
    page: page,
  };
  try {
    const response = await axios({ params });
    const { hits, totalHits } = response.data;
    if (hits.length === 0) {
      Notiflix.Notify.failure('No images found with this word');
      throw new Error();
    }
    return { hits, totalHits };
  } catch (error) {
    return { hits: [], totalHits: 0 };
  }
};
