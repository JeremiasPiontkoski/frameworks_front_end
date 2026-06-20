import type { User } from '../types/auth';

const LOGGED_USER: User = {
  username: 'admin',
  name: 'Administrador'
};

export const authService = {
  login: async (username: string, password: string): Promise<User | null> => {

    if (username === "admin" && password === "12345678") {
      return LOGGED_USER;
    }
    return null;
  },

  logout: (): void => {
  }
};