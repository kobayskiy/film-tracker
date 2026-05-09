const STORAGE_KEY = 'movie_tracker_data';

const defaultMovies = [];

export const loadMovies = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultMovies));
    return defaultMovies;
  }
  return JSON.parse(stored);
};

const saveMovies = (movies) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
};

export const getAllMovies = () => {
  return loadMovies();
};

export const getMovieById = (id) => {
  const movies = loadMovies();
  return movies.find(m => m.id === Number(id));
};

export const addMovie = (movieData) => {
  const movies = loadMovies();
  const newMovie = {
    ...movieData,
    id: Date.now(),
    createdAt: new Date().toISOString()
  };
  movies.push(newMovie);
  saveMovies(movies);
  return newMovie;
};

export const updateMovie = (id, updatedData) => {
  const movies = loadMovies();
  const index = movies.findIndex(m => m.id === Number(id));
  if (index !== -1) {
    movies[index] = { ...movies[index], ...updatedData };
    saveMovies(movies);
    return movies[index];
  }
  return null;
};

export const deleteMovie = (id) => {
  const movies = loadMovies();
  const filtered = movies.filter(m => m.id !== Number(id));
  saveMovies(filtered);
};

export const toggleFavorite = (id) => {
  const movies = loadMovies();
  const movie = movies.find(m => m.id === Number(id));
  if (movie) {
    movie.isFavorite = !movie.isFavorite;
    saveMovies(movies);
  }
};

export const toggleStatus = (id) => {
  const movies = loadMovies();
  const movie = movies.find(m => m.id === Number(id));
  if (movie) {
    movie.status = movie.status === 'watched' ? 'not_watched' : 'watched';
    saveMovies(movies);
  }
};