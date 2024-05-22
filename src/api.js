import axios from 'axios';

const API_BASE_URL = 'https://openlibrary.org';

export const fetchBooks = async (query = 'the lord of the rings', page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search.json?q=${query}&page=${page}`);
    return response.data.docs.map((doc) => ({
      title: doc.title,
      author_name: doc.author_name || [],
      first_publish_year: doc.first_publish_year,
      subject: doc.subject || [],
      ratings_average: doc.ratings_average || 'N/A',
      author_birth_date: doc.author_birth_date || 'N/A',
      author_top_work: doc.author_top_work || 'N/A',
    }));
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
};
