import React, { useState, useEffect } from 'react';
import './CategorySection.css';

const CategorySection = ({ category, products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Actualizar el estado de isMobile cuando cambie el tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex(prevIndex => {
      // En móviles, avanzamos de uno en uno
      if (isMobile) {
        return prevIndex >= additionalProducts.length - 1 ? 0 : prevIndex + 1;
      }
      // En escritorio, avanzamos según el número de elementos visibles
      const itemsToShow = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 480 ? 2 : 1;
      return prevIndex >= additionalProducts.length - itemsToShow ? 0 : prevIndex + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex(prevIndex => {
      // En móviles, retrocedemos de uno en uno
      if (isMobile) {
        return prevIndex <= 0 ? additionalProducts.length - 1 : prevIndex - 1;
      }
      // En escritorio, retrocedemos según el número de elementos visibles
      const itemsToShow = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 480 ? 2 : 1;
      return prevIndex <= 0 ? additionalProducts.length - itemsToShow : prevIndex - 1;
    });
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
    const isLeftSwipe = distance > 30; // Reducido el umbral para mayor sensibilidad
    const isRightSwipe = distance < -30; // Reducido el umbral para mayor sensibilidad

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
    
    // Reiniciar los valores de touch
    setTouchStart(null);
    setTouchEnd(null);
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
                  style={{ 
                    transform: `translateX(-${currentIndex * (isMobile ? 100 : 50)}%)`,
                    transition: 'transform 0.3s ease-out'
                  }}
                >
                  {additionalProducts.map((product, index) => (
                    <div 
                      key={`${product.id}-${index}`} 
                      className="carousel-item"
                      style={{
                        flex: isMobile ? '0 0 100%' : window.innerWidth >= 1024 ? '0 0 33.333%' : '0 0 50%',
                        padding: '0 0.5rem',
                        boxSizing: 'border-box',
                        textAlign: 'center'
                      }}
                    >
                      <div className="carousel-item-content">
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
