import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="container header__inner">
        <h1 className="logo">🎬 Movie Tracker</h1>
        <nav>
          <Link to="/">Главная</Link>
          <Link to="/add">➕ Добавить фильм</Link>
          <Link to="/favorites">⭐ Избранное</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;