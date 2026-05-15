import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovie, updateMovie, deleteMovie, getGenres } from '../services/api';

const MoviePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const genresList = await getGenres();
      setGenres(genresList);
      await loadMovie();
    };
    loadData();
  }, [id]);

  const loadMovie = async () => {
    setLoading(true);
    try {
      const data = await getMovie(id);
      setMovie(data);
      setEditForm(data);
    } catch (error) {
      console.error('Фильм не найден', error);
      navigate('/');
    }
    setLoading(false);
  };

  const handleUpdate = async () => {
    await updateMovie(id, editForm);
    await loadMovie();
    setEditMode(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Удалить фильм навсегда?')) {
      await deleteMovie(id);
      navigate('/');
    }
  };

  const handleToggleFavorite = async () => {
    await updateMovie(id, { ...movie, isFavorite: !movie.isFavorite });
    await loadMovie();
  };

  const handleToggleStatus = async () => {
    const newStatus = movie.status === 'watched' ? 'not_watched' : 'watched';
    await updateMovie(id, { ...movie, status: newStatus });
    await loadMovie();
  };

  if (loading) return <div className="loading">Загрузка...</div>;
  if (!movie) return <div className="loading">Фильм не найден</div>;

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
            <select
              value={editForm.genre || ''}
              onChange={(e) => setEditForm({ ...editForm, genre: e.target.value })}
            >
              <option value="">-- Выберите жанр --</option>
              {genres.map(genre => (
                <option key={genre.id} value={genre.name}>
                  {genre.name}
                </option>
              ))}
            </select>
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
          <div className="form-group">
            <label>Статус</label>
            <select
              value={editForm.status}
              onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
            >
              <option value="not_watched">⏳ Не просмотрен</option>
              <option value="watched">✅ Просмотрен</option>
            </select>
          </div>
          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                checked={editForm.isFavorite}
                onChange={(e) => setEditForm({ ...editForm, isFavorite: e.target.checked })}
              />
              В избранном
            </label>
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