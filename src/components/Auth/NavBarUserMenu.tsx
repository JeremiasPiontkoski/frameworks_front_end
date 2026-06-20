import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const NavbarUserMenu: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <li className="nav-item ms-lg-3">
      {isAuthenticated ? (
        <div className="d-flex align-items-center gap-2 flex-wrap">
          <span
            className="text-white bg-dark px-3 py-1 rounded-pill"
            style={{ fontSize: '0.85rem', cursor: 'pointer' }}
            onClick={() => navigate('/profile')}
            title="Clique para ir ao seu perfil"
          >
            {user?.name}
          </span>
          <button
            className="btn btn-sm btn-outline-light px-3 rounded-pill"
            onClick={handleLogout}
          >
            Sair
          </button>
        </div>
      ) : (
        <button
          className="btn btn-sm btn-primary px-4 rounded-pill"
          onClick={() => navigate('/login')}
        >
          Entrar
        </button>
      )}
    </li>
  );
};