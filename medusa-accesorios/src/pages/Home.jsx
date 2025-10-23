import React from 'react';
import ProductCarousel from '../components/ProductCarousel';
import products from '../data/products';
import './Home.css';

const Home = () => {
  const categories = [
    { key: 'collares', name: 'Collares' },
    { key: 'pulseras', name: 'Pulseras' },
    { key: 'aros', name: 'Aros' },
    { key: 'anillos', name: 'Anillos' },
    { key: 'tobilleras', name: 'Tobilleras' },
    { key: 'esclavas', name: 'Esclavas' },
    { key: 'conjuntos', name: 'Conjuntos' },
    { key: 'sets', name: 'Sets' }
  ];

  return (
    <div className="home">
      <section id="hero" className="hero">
        <div className="container">
          <h1>Medusa Accesorios</h1>
          <p className="slogan">Bienvenidos a Medusa accesorios, en donde la elegancia y el estilo se transforman en poder 💎🐍</p>
        </div>
      </section>
      <section className="featured">
        <div className="container">
          <h2>Productos Destacados</h2>
          <ProductCarousel products={products.destacados} />
        </div>
      </section>
      {categories.map(category => (
        <section key={category.key} id={category.key} className="category-section">
          <div className="container">
            <h2>{category.name}</h2>
            <ProductCarousel products={products[category.key]} />
          </div>
        </section>
      ))}
    </div>
  );
};

export default Home;