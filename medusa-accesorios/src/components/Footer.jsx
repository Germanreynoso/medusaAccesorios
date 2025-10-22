import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Medusa Accesorios</h3>
            <p>Donde la elegancia y el estilo se transforman en poder 💎🐍</p>
          </div>
          <div className="footer-section">
            <h4>Contacto</h4>
            <p>Teléfono: 3816383652</p>
            <p>Instagram: <a href="https://instagram.com/medusa_accesorios.1" target="_blank" rel="noopener noreferrer">@medusa_accesorios.1</a></p>
          </div>
          <div className="footer-section">
            <h4>Categorías</h4>
            <ul>
              <li><a href="/collares">Collares</a></li>
              <li><a href="/pulseras">Pulseras</a></li>
              <li><a href="/aros">Aros</a></li>
              <li><a href="/anillos">Anillos</a></li>
              <li><a href="/tobilleras">Tobilleras</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Medusa Accesorios. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;