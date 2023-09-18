import axios from 'axios';
import Notiflix from 'notiflix';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '38391590-35126e002ec20a67588ba6d67';

export const fetchImages = async (searchQuery, page) => {
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
      throw new Error(
        Notiflix.Notify.failure('No images found with this word')
      );
    }
    return { hits, totalHits };
  } catch (error) {}
};
