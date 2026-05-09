import React, { useState, useEffect } from 'react';
import { getAllMovies, toggleFavorite, toggleStatus, deleteMovie } from '../services/movieService';
import MovieCard from '../components/MovieCard';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = () => {
    const all = getAllMovies();
    setFavorites(all.filter(m => m.isFavorite === true));
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Удалить фильм?')) {
      deleteMovie(id);
      loadFavorites();
    }
  };

  const handleToggleFavorite = (id) => {
    toggleFavorite(id);
    loadFavorites();
  };

  const handleToggleStatus = (id) => {
    toggleStatus(id);
    loadFavorites();
  };

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