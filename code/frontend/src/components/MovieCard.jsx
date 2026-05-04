function MovieCard({ movie }) {
  return (
    <article>
      <h3>{movie.title}</h3>
      <p>Жанр: {movie.genre}</p>
      <p>Рейтинг: {movie.rating}</p>
    </article>
  )
}

export default MovieCard