import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieById } from '../../services/api';
import { useFavorites } from '../../context/FavoritesContext';
import { useDollarRate } from '../../hooks/useDollarRate';
import type { MovieDetailData } from '../../types/movie';
import { MOVIE_CONFIG, MESSAGES } from '../../constants';
import { Navbar } from '../../components/Navbar/Navbar';

export const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { rate: dollarRate, status: wsStatus } = useDollarRate();

  const [movie, setMovie] = useState<MovieDetailData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const priceInBrl = MOVIE_CONFIG.PRICE_USD * dollarRate;
  const favoriteActive = movie ? isFavorite(movie.id) : false;

  useEffect(() => {
    const fetchMovieData = async () => {
      if (!id) {
        setError('ID do filme não encontrado');
        return;
      }

      try {
        setLoading(true);
        const data = await getMovieById(id);
        setMovie(data);
      } catch (err) {
        console.error('Erro ao buscar detalhes do filme:', err);
        setError(MESSAGES.errors.FETCH_MOVIE_DETAIL_FAILED);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);

  const handleFavoriteToggle = () => {
    if (!movie) return;

    if (favoriteActive) {
      removeFavorite(movie.id);
    } else {
      addFavorite({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average
      });
    }
  };

  if (loading) {
    return (
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <div className="text-center text-white">
          <div className="spinner-border text-primary mb-3" role="status"></div>
          <h3>Carregando detalhes do filme...</h3>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <>
        <Navbar />
        <div className="container text-center mt-5 text-white">
          <div className="alert alert-danger">{error || MESSAGES.errors.MOVIE_NOT_FOUND}</div>
          <button 
            className="btn btn-primary" 
            onClick={() => navigate('/home')}
          >
            Voltar para a Home
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div
        style={{
          position: 'relative',
          backgroundImage: `linear-gradient(to bottom, rgba(18, 18, 18, 0.3) 0%, rgba(18, 18, 18, 1) 100%), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '450px',
          width: '100%'
        }}
      >
        <div className="container h-100 d-flex align-items-end pb-4" style={{ minHeight: '450px' }}>
          <button 
            className="btn btn-sm btn-light mb-3 px-3 fw-bold shadow" 
            onClick={() => navigate('/home')}
          >
            Voltar para a Listagem
          </button>
        </div>
      </div>

      <main className="container text-white" style={{ marginTop: '-80px', position: 'relative', zIndex: 2 }}>
        <div className="row g-5">
          {/* Poster */}
          <div className="col-12 col-md-4 text-center text-md-start">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="img-fluid rounded shadow-lg border border-secondary"
              style={{ maxWidth: '300px', borderRadius: '15px' }}
            />
          </div>

          <div className="col-12 col-md-8">
            <h1 className="fw-bold display-5 text-warning">{movie.title}</h1>

            <button
              className={`btn ${favoriteActive ? 'btn-danger' : 'btn-outline-danger'} mb-3 px-4 fw-bold rounded-pill`}
              onClick={handleFavoriteToggle}
            >
              {favoriteActive ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
            </button>

            {movie.tagline && (
              <p className="text-muted fst-italic fs-5">"{movie.tagline}"</p>
            )}

            <div className="d-flex flex-wrap gap-2 my-3">
              {movie.genres.map((genre) => (
                <span 
                  key={genre.id} 
                  className="badge bg-secondary px-3 py-2 rounded-pill fs-6"
                >
                  {genre.name}
                </span>
              ))}
              <span className="badge bg-primary px-3 py-2 rounded-pill fs-6">
                {movie.vote_average.toFixed(1)} / 10
              </span>
              <span className="badge bg-dark border border-secondary px-3 py-2 rounded-pill fs-6">
                {movie.runtime} min
              </span>
            </div>

            <h3 className="mt-4 fw-bold">Sinopse</h3>
            <p className="fs-5 text-white-50" style={{ textAlign: 'justify', lineHeight: '1.6' }}>
              {movie.overview || MESSAGES.empty.NO_MOVIES}
            </p>

            <div className="card bg-dark border border-warning text-white p-4 mt-5 rounded-4 shadow-sm">
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                <div className="d-flex align-items-center gap-3">
                  <span style={{ fontSize: '2rem' }}>⚡</span>
                  <div>
                    <h4 className="m-0 fw-bold text-warning">Disponível para Aluguel Direto</h4>
                    <p className="text-muted m-0 p-0" style={{ fontSize: '0.9rem' }}>
                      Valores atualizados via streaming em tempo real
                    </p>
                  </div>
                </div>

                {/* WebSocket */}
                <span 
                  className={`badge ${wsStatus === 'connected' ? 'bg-success' : 'bg-danger'} px-3 py-1 rounded-pill`}
                >
                  {wsStatus === 'connected' ? 'Conectado' : 'Desconectado'}
                </span>
              </div>

              <hr className="bg-secondary" />

              <div className="row text-center mt-3">
                <div className="col-6 border-end border-secondary">
                  <p className="text-muted m-0">Preço Base (Fixo)</p>
                  <h5 className="fw-bold text-white-50">
                    ${MOVIE_CONFIG.PRICE_USD.toFixed(2)} USD
                  </h5>
                  <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                    Taxa de câmbio: R$ {dollarRate.toFixed(2)}
                  </small>
                </div>
                <div className="col-6 d-flex flex-column justify-content-center">
                  <p className="text-warning m-0 fw-semibold">Valor Convertido (R$)</p>
                  <h3 className="fw-bold text-success m-0">
                    R$ {priceInBrl.toFixed(2)}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};