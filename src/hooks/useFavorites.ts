import { useEffect, useState } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: number) => {
    setFavorites(favorites => 
      favorites.includes(id)
        ? favorites.filter(favId => +favId !== +id)
        : [...favorites, id]
    );
  };

  return { favorites, toggleFavorite };
};
