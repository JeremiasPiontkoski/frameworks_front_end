import React, { useState } from 'react';
import { FormInput } from '../Form/FormInput';
import { FormError } from '../Form/FormError';

interface LoginFormProps {
  onSubmit: (username: string, password: string) => Promise<void>;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username.trim() || !password.trim()) {
      setError('Usuário e senha são obrigatórios');
      return;
    }

    try {
      await onSubmit(username, password);
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormError message={error} />
      
      <FormInput
        id="username"
        label="Usuário"
        type="text"
        placeholder="Digite seu usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <FormInput
        id="password"
        label="Senha"
        type="password"
        placeholder="Digite sua senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit" className="btn btn-primary w-100 fw-bold py-2 shadow"
      style={{ borderRadius: '8px' }}>
        Entrar
      </button>
    </form>
  );
};