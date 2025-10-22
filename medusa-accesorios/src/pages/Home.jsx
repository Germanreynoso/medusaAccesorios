import React from 'react';
import ProductCarousel from '../components/ProductCarousel';
import products from '../data/products';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
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
    </div>
  );
};

export default Home;