const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/movies', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                m.*,
                g.name as genre_name
            FROM movies m
            LEFT JOIN genres g ON m.genre_id = g.id
            ORDER BY m.created_at DESC
        `);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка при получении фильмов' });
    }
});

app.get('/api/movies/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(`
            SELECT 
                m.*,
                g.name as genre_name
            FROM movies m
            LEFT JOIN genres g ON m.genre_id = g.id
            WHERE m.id = $1
        `, [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Фильм не найден' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка при получении фильма' });
    }
});

app.post('/api/movies', async (req, res) => {
    try {
        const { title, genre, description, rating, status, isFavorite } = req.body;
        
        let genreId = null;
        if (genre && genre.trim() !== '') {
            const genreResult = await pool.query(
                'SELECT id FROM genres WHERE name = $1',
                [genre]
            );
            if (genreResult.rows.length > 0) {
                genreId = genreResult.rows[0].id;
            }
        }
        
        const result = await pool.query(
            `INSERT INTO movies (title, genre_id, description, rating, status, is_favorite)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [title, genreId, description || '', rating || 0, status || 'not_watched', isFavorite || false]
        );
        
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка при добавлении фильма' });
    }
});

app.put('/api/movies/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, genre, description, rating, status, isFavorite } = req.body;
        
        let genreId = null;
        if (genre && genre.trim() !== '') {
            const genreResult = await pool.query(
                'SELECT id FROM genres WHERE name = $1',
                [genre]
            );
            if (genreResult.rows.length > 0) {
                genreId = genreResult.rows[0].id;
            }
        }
        
        const result = await pool.query(
            `UPDATE movies 
             SET title = $1, genre_id = $2, description = $3, rating = $4, status = $5, is_favorite = $6
             WHERE id = $7 RETURNING *`,
            [title, genreId, description, rating, status, isFavorite, id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Фильм не найден' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка при обновлении фильма' });
    }
});

app.delete('/api/movies/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            'DELETE FROM movies WHERE id = $1 RETURNING *',
            [id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Фильм не найден' });
        }
        res.json({ message: 'Фильм удалён' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка при удалении фильма' });
    }
});

app.get('/api/genres', async (req, res) => {
    try {
        const result = await pool.query('SELECT id, name FROM genres ORDER BY name');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка при получении жанров' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
    console.log(`API доступно по адресу: http://localhost:${PORT}/api/movies`);
});