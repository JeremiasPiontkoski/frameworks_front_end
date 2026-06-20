import React, { createContext, useContext, useState, type ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface FavoriteMovie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

interface FavoritesContextType {
  favorites: FavoriteMovie[];
  addFavorite: (movie: FavoriteMovie) => void;
  removeFavorite: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const STORAGE_KEY = 'favorites_list';

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([]);
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem(STORAGE_KEY);
      
      if (storedFavorites) {
        const parsed = JSON.parse(storedFavorites);
        setFavorites(parsed);
      }
    } catch (error) {
      console.error('Erro ao recuperar favoritos: ', error);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!isAuthenticated) {
      console.log("Caiu aqui")
      setFavorites([]);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [isAuthenticated]);

  const addFavorite = (movie: FavoriteMovie) => {
    setFavorites((prev) => {
      if (prev.some((item) => item.id === movie.id)) {
        return prev;
      }
      
      const newFavorites = [...prev, movie];
      
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
      } catch (error) {
        console.error('Erro ao salvar favorito: ', error);
      }
      
      return newFavorites;
    });
  };

  const removeFavorite = (movieId: number) => {
    setFavorites((prev) => {
      const newFavorites = prev.filter((item) => item.id !== movieId);
      
      try {
        if (newFavorites.length === 0) {
          localStorage.removeItem(STORAGE_KEY);
        } else {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
        }
      } catch (error) {
        console.error('Erro ao remover favorito: ', error);
      }
      
      return newFavorites;
    });
  };

  const isFavorite = (movieId: number) => {
    return favorites.some((item) => item.id === movieId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites deve ser usado dentro de um FavoritesProvider');
  }
  return context;
};