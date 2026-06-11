import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPopularMovies } from '../../services/api';
import type { Movie } from '../../types/movie';
import { MovieCard } from '../../components/MovieCard/MovieCard';
import { useAuth } from '../../context/AuthContext';

export const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data = await getPopularMovies(1);
        setMovies(data.results);
      } catch (err) {
        setError('Erro ao buscar dados na API! Por favor, tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark sticky-top">
        <div className="container-fluid container-lg">
          <div className="navbar-brand" style={{ cursor: 'pointer' }} onClick={() => navigate('/home')}>
            🎬 Explorador de Filmes
          </div>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item"><a className="nav-link active" href="#">Populares</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Por País</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Por Gênero</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Por Classificação</a></li>
              
              {/* BOTÃO DE LOGIN / PERFIL DINÂMICO */}
              <li className="nav-item ms-lg-3">
                {isAuthenticated ? (
                  <div className="d-flex align-items-center gap-2">
                    <span className="text-white bg-dark px-3 py-1 rounded-pill" style={{ fontSize: '0.85rem' }}>
                      Olá, {user?.name}
                    </span>
                    <button className="btn btn-sm btn-outline-danger px-3 rounded-pill" onClick={logout}>
                      Sair
                    </button>
                  </div>
                ) : (
                  <button className="btn btn-sm btn-primary px-4 rounded-pill" onClick={() => navigate('/')}>
                    Entrar
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* CONTEÚDO PRINCIPAL */}
      <main>
        <div className="container mt-5">
          <h1 className="text-center mb-5" id="page-title">Filmes Populares</h1>

          {loading && (
            <div className="text-center text-white">
              <h3>Carregando filmes...</h3>
            </div>
          )}

          {error && (
            <div className="error-popup-overlay">
              <div className="error-popup-content">
                <div className="error-popup-icon">⚠️</div>
                <h3>Erro</h3>
                <p>{error}</p>
                <button className="error-popup-btn" onClick={() => setError(null)}>Fechar</button>
              </div>
            </div>
          )}

          {!loading && !error && (
            <div id="movie-grid" className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}

          <div className="container text-center my-5 pagination-section">
          <div className="d-flex justify-content-center align-items-center gap-3">
            <button id="prev-btn" className="btn btn-outline-primary" disabled>
              &lt; Anterior
            </button>
            <p className="pagination-info m-0">
              Página <span id="current-page">1</span> de <span id="total-pages">1</span>
            </p>
            <button id="next-btn" className="btn btn-outline-primary" disabled>
              Próximo &gt;
            </button>
          </div>
        </div>
        </div>
      </main>
    </>
  );
};