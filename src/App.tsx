import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';

import { AuthProvider } from './context/AuthContext';
import { Login } from './pages/Login/Login';
import { Home } from './pages/Home/Home';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rota inicial / aponta para a tela de Login */}
          <Route path="/" element={<Login />} />
          
          {/* Rota pública da Home */}
          <Route path="/home" element={<Home />} />

          {/* Fallback para qualquer rota não mapeada redirecionar para o Login */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;