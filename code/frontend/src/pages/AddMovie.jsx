import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createMovie, getGenres } from '../services/api';

const AddMovie = () => {
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);
  const [loadingGenres, setLoadingGenres] = useState(true);
  const [form, setForm] = useState({
    title: '',
    genre: '',
    description: '',
    rating: 0,
    status: 'not_watched',
    isFavorite: false
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadGenres = async () => {
      const genresList = await getGenres();
      setGenres(genresList);
      setLoadingGenres(false);
    };
    loadGenres();
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Название фильма обязательно';
    if (form.rating < 0 || form.rating > 10) newErrors.rating = 'Оценка должна быть от 0 до 10';
    if (form.rating !== undefined && isNaN(form.rating)) newErrors.rating = 'Оценка должна быть числом';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setSaving(true);
    await createMovie(form);
    setSaving(false);
    navigate('/');
  };

  if (loadingGenres) {
    return <div className="loading">Загрузка списка жанров...</div>;
  }

  return (
    <div className="add-movie-page">
      <h2>➕ Добавление фильма</h2>
      <form className="movie-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Название *</label>
          <input
            type="text"
            placeholder="Например: Побег из Шоушенка"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className={errors.title ? 'error-input' : ''}
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label>Жанр</label>
          <select
            value={form.genre}
            onChange={(e) => setForm({ ...form, genre: e.target.value })}
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
            placeholder="Краткое описание фильма..."
            rows="4"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Оценка (0-10)</label>
          <input
            type="number"
            min="0"
            max="10"
            step="1"
            value={form.rating}
            onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) || 0 })}
            className={errors.rating ? 'error-input' : ''}
          />
          {errors.rating && <span className="error">{errors.rating}</span>}
        </div>

        <div className="form-group">
          <label>Статус просмотра</label>
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="not_watched">⏳ Не просмотрен</option>
            <option value="watched">✅ Просмотрен</option>
          </select>
        </div>

        <div className="form-group checkbox">
          <label>
            <input
              type="checkbox"
              checked={form.isFavorite}
              onChange={(e) => setForm({ ...form, isFavorite: e.target.checked })}
            />
            Добавить в избранное
          </label>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit" disabled={saving}>
            {saving ? 'Сохранение...' : '💾 Сохранить фильм'}
          </button>
          <button type="button" className="btn-cancel" onClick={() => navigate('/')}>
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMovie;