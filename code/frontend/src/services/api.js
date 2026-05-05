const API_URL = "http://localhost:3000"

export const getMovies = async () => {
  const res = await fetch(`${API_URL}/movies`)
  return res.json()
}