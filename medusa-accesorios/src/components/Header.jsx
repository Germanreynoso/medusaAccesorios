import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    closeMenu();
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <button onClick={() => scrollToSection('hero')}>Medusa</button>
        </div>
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <ul>
            <li><button onClick={() => scrollToSection('hero')}>🏠 Inicio</button></li>
            <li><button onClick={() => scrollToSection('collares')}>📿 Collares</button></li>
            <li><button onClick={() => scrollToSection('pulseras')}>💍 Pulseras</button></li>
            <li><button onClick={() => scrollToSection('aros')}>👂 Aros</button></li>
            <li><button onClick={() => scrollToSection('anillos')}>💎 Anillos</button></li>
            <li><button onClick={() => scrollToSection('tobilleras')}>🦵 Tobilleras</button></li>
            <li><button onClick={() => scrollToSection('esclavas')}>⛓️ Esclavas</button></li>
            <li><button onClick={() => scrollToSection('conjuntos')}>👑 Conjuntos</button></li>
            <li><button onClick={() => scrollToSection('sets')}>✨ Sets</button></li>
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