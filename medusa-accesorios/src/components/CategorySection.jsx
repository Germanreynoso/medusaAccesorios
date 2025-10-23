import React, { useState } from 'react';
import './CategorySection.css';

const CategorySection = ({ category, products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const nextSlide = () => {
    setCurrentIndex(prevIndex => 
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex(prevIndex => 
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Si no hay productos, no mostramos la categoría
  if (!products || products.length === 0) return null;

  // La imagen principal es la primera de la lista
  const mainProduct = products[0];
  // Las imágenes adicionales son las restantes
  const additionalProducts = products.slice(1);

  return (
    <section className="category-section">
      <h2 className="category-title">{category.name}</h2>
      
      <div className="category-content">
        {/* Imagen principal */}
        <div className="main-product">
          <img 
            src={mainProduct.image} 
            alt={mainProduct.name} 
            className="main-product-image"
          />
          <div className="product-info">
            <h3>{mainProduct.name}</h3>
            <p className="price">{mainProduct.price}</p>
          </div>
        </div>

        {/* Carrusel de imágenes adicionales */}
        {additionalProducts.length > 0 && (
          <div className="additional-products">
            <h4>Más opciones</h4>
            <div 
              className="carousel-container"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <button className="carousel-btn prev" onClick={prevSlide}>‹</button>
              
              <div className="carousel-track">
                <div 
                  className="carousel-slide" 
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {additionalProducts.map((product, index) => (
                    <div key={product.id} className="carousel-item">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="additional-product-image"
                      />
                      <div className="product-info">
                        <p className="product-name">{product.name}</p>
                        <p className="price">{product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <button className="carousel-btn next" onClick={nextSlide}>›</button>
            </div>
            
            {/* Indicadores */}
            {additionalProducts.length > 1 && (
              <div className="carousel-indicators">
                {additionalProducts.map((_, index) => (
                  <button
                    key={index}
                    className={`indicator ${index === currentIndex ? 'active' : ''}`}
                    onClick={() => setCurrentIndex(index)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default CategorySection;
