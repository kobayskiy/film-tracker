const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

app.get("/movies", (req, res) => {
  res.json([
    { id: 1, title: "Inception", genre: "Sci-Fi", rating: 9 },
    { id: 2, title: "Interstellar", genre: "Sci-Fi", rating: 10 }
  ])
})

app.listen(3000, () => {
  console.log("Server started on port 3000")
})