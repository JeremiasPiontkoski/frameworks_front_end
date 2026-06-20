import React from 'react';
import type { Movie } from '../../types/movie';
import { MovieCard } from '../MovieCard/MovieCard';
import { MovieCardSkeleton } from '../MovieCardSkeleton/MovieCardSkeleton';
import { PAGINATION } from '../../constants';

interface MovieGridProps {
  movies: Movie[];
  loading: boolean;
  emptyMessage?: string;
}

export const MovieGrid: React.FC<MovieGridProps> = ({ 
  movies, 
  loading,
  emptyMessage = 'Nenhum filme encontrado para esta busca'
}) => {
  return (
    <div 
      id="movie-grid" 
      className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4"
    >
      {loading ? (
        Array.from({ length: PAGINATION.ITEMS_PER_PAGE }).map((_, index) => (
          <MovieCardSkeleton key={index} />
        ))
      ) : movies.length === 0 ? (
        <div className="col-12 text-center py-5">
          <div className="empty-state">
            <div className="empty-state-icon" style={{ fontSize: '3rem' }}></div>
            <h3>Ops!</h3>
            <p>{emptyMessage}</p>
          </div>
        </div>
      ) : (
        movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))
      )}
    </div>
  );
};
