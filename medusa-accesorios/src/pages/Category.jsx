import React from 'react';
import { useParams } from 'react-router-dom';
import ProductCarousel from '../components/ProductCarousel';
import products from '../data/products';
import './Category.css';

const Category = () => {
  const { category } = useParams();
  const categoryProducts = products[category] || [];

  const categoryNames = {
    collares: 'Collares',
    pulseras: 'Pulseras',
    aros: 'Aros',
    anillos: 'Anillos',
    tobilleras: 'Tobilleras',
    esclavas: 'Esclavas',
    conjuntos: 'Conjuntos',
    sets: 'Sets'
  };

  return (
    <div className="category">
      <div className="container">
        <h1>{categoryNames[category] || 'Categoría'}</h1>
        <ProductCarousel products={categoryProducts} />
      </div>
    </div>
  );
};

export default Category;