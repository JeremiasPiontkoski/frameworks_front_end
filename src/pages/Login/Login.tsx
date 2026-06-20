import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LoginForm } from '../../components/Auth/LoginForm';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home', { replace: true });
    }
  }, [isAuthenticated]);

  const handleLogin = async (username: string, password: string) => {
    const success = await login(username, password);
    if (success) {
      navigate('/home');
    } else {
      throw new Error('Usuário ou senha incorretos!');
    }
  };

  return (
    <div 
      className="container d-flex justify-content-center align-items-center" 
      style={{ minHeight: '100vh' }}
    >
      <div 
        className="card p-4 shadow-lg text-dark" 
        style={{ width: '100%', maxWidth: '400px', borderRadius: '15px' }}
      >
        <div className="text-center mb-4">
          <span style={{ fontSize: '3rem' }}></span>
          <h2 className="fw-bold mt-2 text-primary">Cinema</h2>
          <p className="text-muted">Faça login para acessar mais recursos</p>
        </div>

        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  );
};