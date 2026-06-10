import React from 'react';
import type { Movie } from '../../types/movie';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://placehold.co/500x750?text=Sem+Cartaz';

  return (
    <div className="col">
      <div className="movie-card h-100">
        <img
          src={posterUrl}
          className="card-img-top movie-poster"
          alt={movie.title}
        />
        <div className="card-body">
          <h5 className="card-title">{movie.title}</h5>
          <p className="card-text">
            <small className="text-muted">
              ⭐ {movie.vote_average.toFixed(1)} | {movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'}
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};