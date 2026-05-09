import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllMovies, deleteMovie, toggleFavorite, toggleStatus } from '../services/movieService';
import MovieCard from '../components/MovieCard';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const loadMovies = () => {
    const allMovies = getAllMovies();
    setMovies(allMovies);
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Удалить фильм?')) {
      deleteMovie(id);
      loadMovies();
    }
  };

  const handleToggleFavorite = (id) => {
    toggleFavorite(id);
    loadMovies();
  };

  const handleToggleStatus = (id) => {
    toggleStatus(id);
    loadMovies();
  };

  
  const filteredMovies = movies.filter(movie => {
    if (filter === 'watched') return movie.status === 'watched';
    if (filter === 'not_watched') return movie.status === 'not_watched';
    if (filter === 'favorites') return movie.isFavorite === true;
    return true;
  }).filter(movie => 
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalMovies = movies.length;
  const watchedCount = movies.filter(m => m.status === 'watched').length;
  const notWatchedCount = totalMovies - watchedCount;
  const favoritesCount = movies.filter(m => m.isFavorite).length;

  return (
    <div>
      <div className="stats">
        <div className="stat-card">📊 Всего: {totalMovies}</div>
        <div className="stat-card">✅ Просмотрено: {watchedCount}</div>
        <div className="stat-card">⏳ Не просмотрено: {notWatchedCount}</div>
        <div className="stat-card">⭐ В избранном: {favoritesCount}</div>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="🔍 Поиск по названию..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">Все фильмы</option>
          <option value="watched">✅ Просмотренные</option>
          <option value="not_watched">⏳ Не просмотренные</option>
          <option value="favorites">⭐ Избранное</option>
        </select>
      </div>

      {filteredMovies.length === 0 ? (
        <div className="empty-state">
          <p>😕 Фильмы не найдены</p>
          <Link to="/add" className="btn-add-first">➕ Добавить первый фильм</Link>
        </div>
      ) : (
        <div className="movies-grid">
          {filteredMovies.map(movie => (
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

export default Home;