import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/" onClick={closeMenu}>Medusa</Link>
        </div>
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <ul>
            <li><Link to="/" onClick={closeMenu}>🏠 Inicio</Link></li>
            <li><Link to="/collares" onClick={closeMenu}>📿 Collares</Link></li>
            <li><Link to="/pulseras" onClick={closeMenu}>💍 Pulseras</Link></li>
            <li><Link to="/aros" onClick={closeMenu}>👂 Aros</Link></li>
            <li><Link to="/anillos" onClick={closeMenu}>💎 Anillos</Link></li>
            <li><Link to="/tobilleras" onClick={closeMenu}>🦵 Tobilleras</Link></li>
            <li><Link to="/esclavas" onClick={closeMenu}>⛓️ Esclavas</Link></li>
            <li><Link to="/conjuntos" onClick={closeMenu}>👑 Conjuntos</Link></li>
            <li><Link to="/sets" onClick={closeMenu}>✨ Sets</Link></li>
          </ul>
        </nav>
        <div className={`hamburger ${isMenuOpen ? 'hamburger-open' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
  );
};

export default Header;