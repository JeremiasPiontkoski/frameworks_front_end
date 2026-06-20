import React from 'react';
import type { FilterType } from '../../types/movie';
import { FILTER_OPTIONS } from '../../constants';

interface FiltersProps {
  currentFilter: FilterType;
  selectedTerm: string;
  genreOptions: { id: number; name: string }[];
  onFilterChange: (term: string) => void;
}

export const Filters: React.FC<FiltersProps> = ({
  currentFilter,
  selectedTerm,
  genreOptions,
  onFilterChange
}) => {
  if (!['country', 'genre', 'classification'].includes(currentFilter)) {
    return null;
  }

  return (
    <div id="dynamic-select-wrapper" className="container-fluid px-4 px-lg-5 mt-5">
      <select 
        id="dynamic-select" 
        className="form-select w-auto"
        value={selectedTerm}
        onChange={(e) => onFilterChange(e.target.value)}
      >
        {currentFilter === 'country' && (
          <>
            {FILTER_OPTIONS.countries.map((country) => (
              <option key={country.value} value={country.value}>
                {country.label}
              </option>
            ))}
          </>
        )}

        {currentFilter === 'genre' && (
          <>
            {genreOptions.length === 0 ? (
              <option disabled>Carregando gêneros...</option>
            ) : (
              genreOptions.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))
            )}
          </>
        )}

        {currentFilter === 'classification' && (
          <>
            {FILTER_OPTIONS.classifications.map((classification) => (
              <option key={classification.value} value={classification.value}>
                {classification.label}
              </option>
            ))}
          </>
        )}
      </select>
    </div>
  );
};

