import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Movie } from '../../types/movie';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <div className="col">
      <div 
        className="card h-100 movie-card-clickable" 
        onClick={() => navigate(`/movie/${movie.id}`)}
        style={{ cursor: 'pointer' }}
      >
        <img 
          src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'placeholder.jpg'} 
          className="card-img-top" 
          alt={movie.title} 
        />
        <div className="card-body">
          <h5 className="card-title text-truncate">{movie.title}</h5>
          <p className="card-text text-warning"> {movie.vote_average}</p>
        </div>
      </div>
    </div>
  );
};