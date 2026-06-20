import React from 'react';
import type { FilterType } from '../../types/movie';
import { NavbarUserMenu } from '../Auth/NavBarUserMenu';

interface HomeNavbarProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  searchInput: string;
  onSearchInputChange: (value: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
}

export const HomeNavbar: React.FC<HomeNavbarProps> = ({
  currentFilter,
  onFilterChange,
  searchInput,
  onSearchInputChange,
  onSearchSubmit
}) => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark sticky-top"
      style={{ backgroundColor: '#1a1a1a', borderBottom: '1px solid #333' }}
    >
      <div className="container-fluid">
        <div
          className="navbar-brand fw-bold"
          style={{ cursor: 'pointer', fontSize: '1.3rem' }}
          onClick={() => onFilterChange('popular')}
        >
          Cinema
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarHome"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarHome">
          <ul className="navbar-nav me-auto align-items-center gap-1">
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link border-0 ${currentFilter === 'popular' ? 'active' : ''}`}
                onClick={() => onFilterChange('popular')}
              >
                Populares
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link border-0 ${currentFilter === 'country' ? 'active' : ''}`}
                onClick={() => onFilterChange('country')}
              >
                Por País
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link border-0 ${currentFilter === 'genre' ? 'active' : ''}`}
                onClick={() => onFilterChange('genre')}
              >
                Por Gênero
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link border-0 ${currentFilter === 'classification' ? 'active' : ''}`}
                onClick={() => onFilterChange('classification')}
              >
                Por Classificação
              </button>
            </li>
            <li className="nav-item ms-lg-3">
              <form onSubmit={onSearchSubmit} className="d-flex gap-2 align-items-center">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Pesquisar por título"
                  value={searchInput}
                  onChange={(e) => onSearchInputChange(e.target.value)}
                  style={{ minWidth: '200px' }}
                />
                <button type="submit" className="btn btn-sm btn-primary px-3 rounded-pill">
                  Pesquisar
                </button>
              </form>
            </li>

            <NavbarUserMenu />
          </ul>
        </div>
      </div>
    </nav>
  );
};