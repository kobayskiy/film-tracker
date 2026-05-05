import { useEffect, useState } from "react"
import { getMovies } from "../services/api"
import MovieCard from "../components/MovieCard"

function Home() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    getMovies().then(data => setMovies(data))
  }, [])

  return (
    <main>
      <h1>Список фильмов</h1>

      {movies.length === 0 ? (
        <p>Фильмы не найдены</p>
      ) : (
        movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))
      )}
    </main>
  )
}

export default Home