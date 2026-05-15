import React, { useState, useEffect } from 'react';
import { getMovies, updateMovie, deleteMovie } from '../services/api';
import MovieCard from '../components/MovieCard';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = async () => {
    setLoading(true);
    const all = await getMovies();
    setFavorites(all.filter(m => m.isFavorite === true));
    setLoading(false);
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Удалить фильм?')) {
      await deleteMovie(id);
      await loadFavorites();
    }
  };

  const handleToggleFavorite = async (id) => {
    const movie = favorites.find(m => m.id === id);
    if (movie) {
      await updateMovie(id, { ...movie, isFavorite: false });
      await loadFavorites();
    }
  };

  const handleToggleStatus = async (id) => {
    const movie = favorites.find(m => m.id === id);
    if (movie) {
      const newStatus = movie.status === 'watched' ? 'not_watched' : 'watched';
      await updateMovie(id, { ...movie, status: newStatus });
      await loadFavorites();
    }
  };

  if (loading) return <div className="loading">Загрузка...</div>;

  return (
    <div>
      <h2>⭐ Избранные фильмы</h2>
      {favorites.length === 0 ? (
        <div className="empty-state">
          <p>😕 У вас пока нет избранных фильмов</p>
          <p>Перейдите на главную и нажмите 🤍, чтобы добавить фильм в избранное</p>
        </div>
      ) : (
        <div className="movies-grid">
          {favorites.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onDelete={handleDelete}
              onToggleFavorite={handleToggleFavorite}
              onToggleStatus={handleToggleStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;