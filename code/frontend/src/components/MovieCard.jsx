import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie, onDelete, onToggleFavorite, onToggleStatus }) => {
  const renderStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(10 - rating);
  };

  return (
    <div className="movie-card">
      <h3>{movie.title}</h3>
      <p className="genre">{movie.genre}</p>
      <p className="rating">{renderStars(movie.rating)} ({movie.rating}/10)</p>
      <p className="status">
        Статус: 
        <button 
          className="status-toggle"
          onClick={() => onToggleStatus(movie.id)}
        >
          {movie.status === 'watched' ? '✅ Просмотрен' : '⏳ Не просмотрен'}
        </button>
      </p>
      <div className="card-actions">
        <Link to={`/movie/${movie.id}`} className="btn-details">Подробнее</Link>
        <button 
          className="btn-favorite"
          onClick={() => onToggleFavorite(movie.id)}
        >
          {movie.isFavorite ? '❤️ В избранном' : '🤍 В избранное'}
        </button>
        <button 
          className="btn-delete"
          onClick={() => onDelete(movie.id)}
        >
          🗑️ Удалить
        </button>
      </div>
    </div>
  );
};

export default MovieCard;