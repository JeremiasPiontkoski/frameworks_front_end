import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NavbarUserMenu } from '../Auth/NavBarUserMenu';

interface NavbarProps {
  showSearch?: boolean;
  onSearchSubmit?: (searchTerm: string) => void;
  currentFilter?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  showSearch = false,
  onSearchSubmit,
  currentFilter = 'popular'
}) => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = React.useState('');

  const handleGoHome = () => {
    navigate('/home');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    if (onSearchSubmit) {
      onSearchSubmit(searchInput.trim());
    }
    setSearchInput('');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top" style={{ backgroundColor: '#1a1a1a' }}>
      <div className="container-fluid">
        <div
          className="navbar-brand fw-bold"
          style={{ cursor: 'pointer', fontSize: '1.3rem' }}
          onClick={handleGoHome}
        >
          Cinema
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-2">
            {showSearch && onSearchSubmit && (
              <li className="nav-item ms-lg-2">
                <form onSubmit={handleSearchSubmit} className="d-flex gap-2 align-items-center">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Pesquisar por título"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    style={{ minWidth: '200px' }}
                  />
                  <button type="submit" className="btn btn-sm btn-primary px-3 rounded-pill">
                    Pesquisar
                  </button>
                </form>
              </li>
            )}

            <NavbarUserMenu />
          </ul>
        </div>
      </div>
    </nav>
  );
};