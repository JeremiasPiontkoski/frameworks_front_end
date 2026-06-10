import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNzZkZDNlM2E4YjFmNzYzYzk4NDlkYWE5MDk5YTMxNCIsIm5iZiI6MTc1OTM1Nzg5MS4xNTY5OTk4LCJzdWIiOiI2OGRkYWJjM2ZkMWI5YzgyZWZiZGY5OTIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.h3gUtRKQ41-iYUQo64VApg93BMDlCezgGdXcZScNNH8',
  },
});

export const getPopularMovies = async (page = 1) => {
  const response = await api.get('/discover/movie', {
    params: {
      include_video: false,
      language: 'pt-BR',
      page: page,
      sort_by: 'popularity.desc',
    },
  });
  return response.data;
};