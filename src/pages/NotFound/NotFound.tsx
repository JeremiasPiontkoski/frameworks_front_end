import React from 'react';
import { useNavigate } from 'react-router-dom';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="container d-flex flex-column justify-content-center align-items-center text-white text-center" 
      style={{ minHeight: '100vh' }}
    >
      <div className="card bg-dark border border-secondary p-5 rounded-4 shadow-lg" style={{ maxWidth: '500px' }}>
        <div className="mb-4" style={{ fontSize: '5rem' }}>🍿❌</div>
        
        <h1 className="display-4 fw-bold text-warning mb-2">404</h1>
        <h3 className="fw-semibold mb-3">Página não encontrada</h3>
        
        <p className="text-muted mb-4">
          O filme que você está procurando saiu de cartaz ou o endereço digitado não existe no nosso sistema.
        </p>

        <button 
          className="btn btn-primary fw-bold px-4 py-2 rounded-pill shadow-sm"
          onClick={() => navigate('/home')}
        >
          ← Voltar para a Home
        </button>
      </div>
    </div>
  );
};