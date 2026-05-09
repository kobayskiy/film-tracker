import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieById, updateMovie, deleteMovie, toggleFavorite, toggleStatus } from '../services/movieService';

const MoviePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    loadMovie();
  }, [id]);

  const loadMovie = () => {
    const found = getMovieById(id);
    if (found) {
      setMovie(found);
      setEditForm(found);
    } else {
      navigate('/');
    }
  };

  const handleUpdate = () => {
    updateMovie(id, editForm);
    loadMovie();
    setEditMode(false);
  };

  const handleDelete = () => {
    if (window.confirm('Удалить фильм навсегда?')) {
      deleteMovie(id);
      navigate('/');
    }
  };

  const handleToggleFavorite = () => {
    toggleFavorite(id);
    loadMovie();
  };

  const handleToggleStatus = () => {
    toggleStatus(id);
    loadMovie();
  };

  if (!movie) return <div className="loading">Загрузка...</div>;

  const renderStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(10 - rating);
  };

  return (
    <div className="movie-page">
      {!editMode ? (
        <>
          <div className="movie-header">
            <h2>{movie.title}</h2>
            <div className="movie-actions">
              <button onClick={() => setEditMode(true)} className="btn-edit">✏️ Редактировать</button>
              <button onClick={handleDelete} className="btn-delete">🗑️ Удалить</button>
            </div>
          </div>

          <div className="movie-info">
            <p><strong>Жанр:</strong> {movie.genre || 'Не указан'}</p>
            <p><strong>Оценка:</strong> {renderStars(movie.rating)} ({movie.rating}/10)</p>
            <p>
              <strong>Статус:</strong>
              <button onClick={handleToggleStatus} className="inline-toggle">
                {movie.status === 'watched' ? '✅ Просмотрен' : '⏳ Не просмотрен'}
              </button>
            </p>
            <p>
              <strong>Избранное:</strong>
              <button onClick={handleToggleFavorite} className="inline-toggle">
                {movie.isFavorite ? '❤️ В избранном' : '🤍 Добавить в избранное'}
              </button>
            </p>
            <p><strong>Описание:</strong></p>
            <p className="description">{movie.description || 'Нет описания'}</p>
            <p><strong>Дата добавления:</strong> {new Date(movie.createdAt).toLocaleDateString('ru-RU')}</p>
          </div>
        </>
      ) : (
        <div className="edit-form">
          <h3>Редактирование фильма</h3>
          <div className="form-group">
            <label>Название</label>
            <input
              value={editForm.title}
              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Жанр</label>
            <input
              value={editForm.genre}
              onChange={(e) => setEditForm({ ...editForm, genre: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Описание</label>
            <textarea
              rows="4"
              value={editForm.description}
              onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Оценка (0-10)</label>
            <input
              type="number"
              min="0"
              max="10"
              value={editForm.rating}
              onChange={(e) => setEditForm({ ...editForm, rating: parseInt(e.target.value) || 0 })}
            />
          </div>
          <div className="form-actions">
            <button onClick={handleUpdate} className="btn-submit">💾 Сохранить</button>
            <button onClick={() => setEditMode(false)} className="btn-cancel">Отмена</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviePage;