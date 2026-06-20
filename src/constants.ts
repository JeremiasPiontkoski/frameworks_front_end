
export const API_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p',
  IMAGE_SIZES: {
    POSTER: '/w500',
    BACKDROP: '/original',
    THUMBNAIL: '/w200',
  },
};

export const MOVIE_CONFIG = {
  PRICE_USD: 3.99,
  DEFAULT_RATING: 0,
  NO_IMAGE_PLACEHOLDER: '/placeholder.jpg',
};

export const CURRENCY_CONFIG = {
  WEBSOCKET_URL: 'wss://ws-feed.exchange.coinbase.com',
  PRODUCT_ID: 'BTC-USD',
  INITIAL_RATE: 5.20,
};

export const FILTER_OPTIONS = {
  countries: [
    { value: 'pt', label: 'Brasil / Portugal' },
    { value: 'en', label: 'Estados Unidos' },
    { value: 'es', label: 'Espanha / Am. Latina' },
    { value: 'de', label: 'Alemanha' },
    { value: 'it', label: 'Itália' },
    { value: 'fr', label: 'França' },
  ],
  classifications: [
    { value: 'L', label: 'Livre (L)' },
    { value: '10', label: '10 anos' },
    { value: '12', label: '12 anos' },
    { value: '14', label: '14 anos' },
    { value: '16', label: '16 anos' },
    { value: '18', label: '18 anos' },
  ],
};

export const MESSAGES = {
  errors: {
    FETCH_MOVIES_FAILED: 'Erro ao buscar dados na API! Por favor, tente novamente mais tarde.',
    FETCH_GENRES_FAILED: 'Erro ao carregar os gêneros.',
    FETCH_MOVIE_DETAIL_FAILED: 'Não foi possível carregar os detalhes deste filme.',
    MOVIE_NOT_FOUND: 'Filme não encontrado.',
  },
  empty: {
    NO_MOVIES: 'Nenhum filme encontrado para esta busca.',
    NO_FAVORITES: 'Sua lista está vazia',
  },
  ws: {
    CONNECTING: 'Conectando ao câmbio...',
    CONNECTED: 'Conectado',
    DISCONNECTED: 'Desconectado',
  },
};

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  MAX_PAGES: 100,
  ITEMS_PER_PAGE: 8,
};
