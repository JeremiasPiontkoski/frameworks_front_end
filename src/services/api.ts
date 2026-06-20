import axios from 'axios';
import { API_CONFIG } from '../constants';
const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${apiKey}`
  },
});

export const getGenres = async () => {
  try {
    const response = await api.get('/genre/movie/list', {
      params: { language: 'pt-BR' }
    });
    return response.data.genres;
  } catch (error) {
    console.error('Erro ao buscar gêneros:', error);
    throw error;
  }
};

export const getMovies = async (
  filterType: string,
  selectedValue: string,
  searchTerm: string,
  page = 1
) => {
  try {
    let endpoint = '/discover/movie';
    let params: any = {
      include_video: false,
      language: 'pt-BR',
      page: page,
      sort_by: 'popularity.desc',
    };

    switch (filterType) {
      case 'country':
        params.with_original_language = selectedValue;
        break;
      case 'genre':
        params.with_genres = selectedValue;
        break;
      case 'classification':
        endpoint = '/discover/movie';
        params.certification_country = 'BR';
        params.certification = selectedValue;
        break;
      case 'search':
        endpoint = '/search/movie';
        params.query = searchTerm;
        break;
      default:
        break;
    }

    const response = await api.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar filmes: ', error);
    throw error;
  }
};

export const getMovieById = async (id: string) => {
  try {
    const response = await api.get(`/movie/${id}`, {
      params: { language: 'pt-BR' }
    });
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar filme ${id}:`, error);
    throw error;
  }
};