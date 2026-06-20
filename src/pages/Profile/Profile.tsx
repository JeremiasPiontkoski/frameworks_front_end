import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useFavorites } from '../../context/FavoritesContext';
import { MESSAGES } from '../../constants';
import { Navbar } from '../../components/Navbar/Navbar';

export const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const { favorites, removeFavorite } = useFavorites();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <Navbar />

      <main className="container text-white mt-5">
        <div className="row">
          <div className="col-12 col-md-4 mb-4">
            <div className="card bg-dark border border-secondary text-white p-4 rounded-4 shadow-sm text-center">
              <div className="mb-3" style={{ fontSize: '4rem' }}>👤</div>
              <h3 className="fw-bold text-warning">{user?.name}</h3>
              <p className="text-muted">@ {user?.username}</p>
              <span className="badge bg-success px-3 py-2 rounded-pill">Usuário VIP</span>
              <hr className="bg-secondary my-4" />
              <p className="m-0 text-white-50">
                Filmes Favoritados:{' '}
                <strong className="text-white">{favorites.length}</strong>
              </p>
              
              <button 
                className="btn btn-sm btn-outline-danger w-100 mt-3"
                onClick={handleLogout}
              >
                Sair da Conta
              </button>
            </div>
          </div>

          <div className="col-12 col-md-8">
            <h2 className="fw-bold mb-4">Minha Lista de Favoritos ❤️</h2>

            {favorites.length === 0 ? (
              <div className="card bg-dark border border-secondary p-5 text-center rounded-4 text-white-50">
                <span style={{ fontSize: '3rem' }}>🍿</span>
                <h4 className="mt-3 text-white">Sua lista está vazia</h4>
                <p>{MESSAGES.empty.NO_FAVORITES}</p>
                <button 
                  className="btn btn-primary mt-2" 
                  onClick={() => navigate('/home')}
                >
                  Explorar Filmes
                </button>
              </div>
            ) : (
              <div className="row row-cols-1 row-cols-sm-2 g-4">
                {favorites.map((movie) => (
                  <div className="col" key={movie.id}>
                    <div className="card h-100 bg-dark border border-secondary text-white rounded-3 overflow-hidden d-flex flex-row">
                      {/* Poster */}
                      <img
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt={movie.title}
                        style={{ width: '100px', objectFit: 'cover', cursor: 'pointer' }}
                        onClick={() => navigate(`/movie/${movie.id}`)}
                        title="Clique para ver detalhes"
                      />

                      <div className="card-body d-flex flex-column justify-content-between p-3">
                        <div>
                          <h5
                            className="card-title text-truncate m-0 fw-bold"
                            style={{ cursor: 'pointer' }}
                            onClick={() => navigate(`/movie/${movie.id}`)}
                            title="Clique para ver detalhes"
                          >
                            {movie.title}
                          </h5>
                          <p className="text-warning m-0 mt-1">
                            {movie.vote_average.toFixed(1)}
                          </p>
                        </div>

                        <button
                          className="btn btn-sm btn-outline-danger w-100 mt-2"
                          onClick={() => removeFavorite(movie.id)}
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};