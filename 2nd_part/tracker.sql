--Таблица жанров
CREATE TABLE genres (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
);

--Таблица фильмов
CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    genre_id INTEGER REFERENCES genres(id) ON DELETE SET NULL,
    description TEXT,
    rating INTEGER CHECK (rating >= 0 AND rating <= 10),
    status VARCHAR(20) DEFAULT 'not_watched' CHECK (status IN ('watched', 'not_watched')),
    is_favorite BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--Заполнение таблицы жанров
INSERT INTO genres (name, description) VALUES
('Боевик', 'Динамичные фильмы с погонями и драками'),
('Комедия', 'Фильмы для хорошего настроения и смеха'),
('Драма', 'Серьёзные фильмы о жизни и эмоциях'),
('Фантастика', 'Фильмы о будущем, космосе и технологиях'),
('Ужасы', 'Фильмы, которые заставляют бояться'),
('Триллер', 'Напряжённые фильмы с неожиданными поворотами'),
('Романтика', 'Истории о любви и отношениях'),
('Детектив', 'Расследования и загадочные преступления');

--Заполнение таблицы фильмов
INSERT INTO movies (title, genre_id, description, rating, status, is_favorite) VALUES
('Начало', (SELECT id FROM genres WHERE name = 'Фантастика'), 'Кобб — талантливый вор, крадущий ценные секреты из подсознания людей во время сна.', 9, 'watched', true),
('Зеленая книга', (SELECT id FROM genres WHERE name = 'Драма'), 'Итальянский вышибала нанимается водителем к темнокожему пианисту для турне по югу США.', 8, 'watched', false),
('Дюна: Часть вторая', (SELECT id FROM genres WHERE name = 'Фантастика'), 'Пол Атрейдес объединяется с фременами и мстит заговорщикам.', 7, 'not_watched', true),
('Джокер', (SELECT id FROM genres WHERE name = 'Драма'), 'История становления культового злодея из Готэма.', 9, 'watched', false),
('Отель "Гранд Будапешт"', (SELECT id FROM genres WHERE name = 'Комедия'), 'Приключения легендарного консьержа в вымышленной европейской стране.', 8, 'watched', false),
('Тихое место', (SELECT id FROM genres WHERE name = 'Ужасы'), 'Семья выживает в мире, где звук может убить.', 8, 'watched', false),
('Безумный Макс: Дорога ярости', (SELECT id FROM genres WHERE name = 'Боевик'), 'Погоня в постапокалиптической пустыне.', 9, 'watched', false),
('Паразиты', (SELECT id FROM genres WHERE name = 'Драма'), 'Семья бедняков проникает в дом богатых под видом разных специалистов.', 10, 'watched', true);
