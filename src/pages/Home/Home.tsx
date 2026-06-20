import React, { useEffect, useState } from 'react';
import { getMovies, getGenres } from '../../services/api';
import type { Movie, FilterType } from '../../types/movie';
import { HomeNavbar } from '../../components/Home/HomeNavbar';
import { Filters } from '../../components/Home/Filters';
import { MovieGrid } from '../../components/Home/MovieGrid';
import { Pagination } from '../../components/Home/Pagination';
import { MESSAGES, PAGINATION } from '../../constants';

export const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [currentFilter, setCurrentFilter] = useState<FilterType>('popular');
  const [currentPage, setCurrentPage] = useState<number>(PAGINATION.DEFAULT_PAGE);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [selectedTerm, setSelectedTerm] = useState<string>('');
  const [searchInput, setSearchInput] = useState<string>('');
  const [activeSearchTerm, setActiveSearchTerm] = useState<string>('');

  const [genreOptions, setGenreOptions] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genres = await getGenres();
        setGenreOptions(genres);
      } catch (err) {
        console.error(MESSAGES.errors.FETCH_GENRES_FAILED, err);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMoviesData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getMovies(
          currentFilter,
          selectedTerm,
          activeSearchTerm,
          currentPage
        );

        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (err) {
        console.error('Erro ao buscar filmes:', err);
        setError(MESSAGES.errors.FETCH_MOVIES_FAILED);
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesData();
  }, [currentFilter, selectedTerm, activeSearchTerm, currentPage]);

  const handleFilterChange = (filter: FilterType) => {
    setCurrentFilter(filter);
    setCurrentPage(PAGINATION.DEFAULT_PAGE);

    if (filter === 'country') {
      setSelectedTerm('pt');
    } else if (filter === 'genre' && genreOptions.length > 0) {
      setSelectedTerm(String(genreOptions[0].id));
    } else if (filter === 'classification') {
      setSelectedTerm('L');
    } else {
      setSelectedTerm('');
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    setActiveSearchTerm(searchInput.trim());
    setCurrentFilter('search');
    setCurrentPage(PAGINATION.DEFAULT_PAGE);
  };

  const handlePreviousPage = () => {
    if (currentPage > PAGINATION.DEFAULT_PAGE) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handleSelectedTermChange = (term: string) => {
    setSelectedTerm(term);
    setCurrentPage(PAGINATION.DEFAULT_PAGE);
  };

  const getPageTitle = (): string => {
    switch (currentFilter) {
      case 'popular':
        return 'Filmes Populares';
      case 'country':
        return 'Filtrar por País';
      case 'genre':
        return 'Filtrar por Gênero';
      case 'classification':
        return 'Filtrar por Classificação';
      case 'search':
        return `Resultados para: "${activeSearchTerm}"`;
      default:
        return 'Filmes';
    }
  };

  return (
    <>
      <HomeNavbar
        currentFilter={currentFilter}
        onFilterChange={handleFilterChange}
        searchInput={searchInput}
        onSearchInputChange={setSearchInput}
        onSearchSubmit={handleSearchSubmit}
      />

      <Filters
        currentFilter={currentFilter}
        selectedTerm={selectedTerm}
        genreOptions={genreOptions}
        onFilterChange={handleSelectedTermChange}
      />

      <main>
        <div className="container-fluid px-4 px-lg-5 mt-5">
          <h1 className="text-center mb-5 text-white">
            {getPageTitle()}
          </h1>

          {error && (
            <div className="error-popup-overlay">
              <div className="error-popup-content">
                <div className="error-popup-icon"></div>
                <h3>Erro</h3>
                <p>{error}</p>
                <button
                  className="error-popup-btn"
                  onClick={() => setError(null)}
                >
                  Fechar
                </button>
              </div>
            </div>
          )}

          <MovieGrid
            movies={movies}
            loading={loading}
            emptyMessage={MESSAGES.empty.NO_MOVIES}
          />
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPreviousClick={handlePreviousPage}
          onNextClick={handleNextPage}
        />
      </main>
    </>
  );
};