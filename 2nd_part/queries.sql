--SELECT с WHERE
SELECT 
    m.title,
    g.name AS genre,
    m.rating,
    m.status
FROM movies m
JOIN genres g ON m.genre_id = g.id
WHERE m.status = 'watched' AND m.rating > 7
ORDER BY m.rating DESC;

--INSERT
INSERT INTO movies (title, genre_id, description, rating, status, is_favorite)
VALUES (
    'Оппенгеймер',
    (SELECT id FROM genres WHERE name = 'Драма'),
    'История создателя атомной бомбы Роберта Оппенгеймера.',
    9,
    'watched',
    false
);

--UPDATE
UPDATE movies 
SET status = 'watched', rating = 8
WHERE title = 'Дюна: Часть вторая';

--DELETE
DELETE FROM movies WHERE title = 'Оппенгеймер';

--SELECT с JOIN
SELECT 
    g.name AS genre,
    COUNT(m.id) AS total_movies,
    ROUND(AVG(m.rating), 2) AS avg_rating
FROM genres g
LEFT JOIN movies m ON g.id = m.genre_id
GROUP BY g.id, g.name
ORDER BY total_movies DESC;