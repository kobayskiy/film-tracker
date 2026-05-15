import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export const getMovies = async () => {
    try {
        const response = await axios.get(`${API_BASE}/movies`);
        return response.data.map(movie => ({
            id: movie.id,
            title: movie.title,
            genre: movie.genre_name || movie.genre || '',
            description: movie.description || '',
            rating: movie.rating || 0,
            status: movie.status,
            isFavorite: movie.is_favorite,
            createdAt: movie.created_at
        }));
    } catch (error) {
        console.error('Ошибка при получении фильмов:', error);
        return [];
    }
};

export const getMovie = async (id) => {
    try {
        const response = await axios.get(`${API_BASE}/movies/${id}`);
        return {
            id: response.data.id,
            title: response.data.title,
            genre: response.data.genre_name || '',
            description: response.data.description || '',
            rating: response.data.rating || 0,
            status: response.data.status,
            isFavorite: response.data.is_favorite,
            createdAt: response.data.created_at
        };
    } catch (error) {
        console.error('Ошибка при получении фильма:', error);
        throw error;
    }
};

export const createMovie = async (movieData) => {
    try {
        const response = await axios.post(`${API_BASE}/movies`, movieData);
        return response.data;
    } catch (error) {
        console.error('Ошибка при добавлении фильма:', error);
        throw error;
    }
};

export const updateMovie = async (id, movieData) => {
    try {
        const response = await axios.put(`${API_BASE}/movies/${id}`, movieData);
        return response.data;
    } catch (error) {
        console.error('Ошибка при обновлении фильма:', error);
        throw error;
    }
};

export const deleteMovie = async (id) => {
    try {
        await axios.delete(`${API_BASE}/movies/${id}`);
    } catch (error) {
        console.error('Ошибка при удалении фильма:', error);
        throw error;
    }
};

export const getGenres = async () => {
    try {
        const response = await axios.get(`${API_BASE}/genres`);
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении жанров:', error);
        return [];
    }
};