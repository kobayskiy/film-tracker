import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addMovie } from '../services/movieService';

const AddMovie = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    genre: '',
    description: '',
    rating: 0,
    status: 'not_watched',
    isFavorite: false
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Название фильма обязательно';
    if (form.rating < 0 || form.rating > 10) newErrors.rating = 'Оценка должна быть от 0 до 10';
    if (form.rating !== undefined && isNaN(form.rating)) newErrors.rating = 'Оценка должна быть числом';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    addMovie(form);
    navigate('/');
  };

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
          <input
            type="text"
            placeholder="Например: Драма, комедия"
            value={form.genre}
            onChange={(e) => setForm({ ...form, genre: e.target.value })}
          />
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
          <button type="submit" className="btn-submit">💾 Сохранить фильм</button>
          <button type="button" className="btn-cancel" onClick={() => navigate('/')}>Отмена</button>
        </div>
      </form>
    </div>
  );
};

export default AddMovie;