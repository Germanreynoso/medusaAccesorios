import React, { useState, useEffect } from 'react';
import ProductCarousel from '../components/ProductCarousel';
import staticProducts from '../data/products';
import { supabase } from '../lib/supabase';
import logoImg from '../assets/Logo.jpeg';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState(staticProducts);

  useEffect(() => {
    const fetchSupabaseProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*');

        if (error) throw error;

        if (data && data.length > 0) {
          // Crear una copia de los productos estáticos para no perderlos
          const merged = { ...staticProducts };

          // Añadir productos de Supabase a sus categorías correspondientes
          data.forEach(item => {
            const category = item.category.toLowerCase();
            // Asegurarse de que el objeto tenga la propiedad 'image'
            const productWithImage = {
              ...item,
              image: item.image_url || item.image
            };

            if (!merged[category]) {
              merged[category] = [];
            }
            // Añadir al principio de la lista
            merged[category] = [productWithImage, ...merged[category]];
          });

          // Actualizar destacados combinando ambos
          const allSupabase = data.map(i => ({ ...i, image: i.image_url }));
          merged.destacados = [...allSupabase.slice(0, 4), ...staticProducts.destacados.slice(0, 4)];

          setProducts(merged);
        }
      } catch (err) {
        console.log("Error cargando Supabase, usando solo locales:", err);
      }
    };

    fetchSupabaseProducts();
  }, []);

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
          <img src={logoImg} alt="Medusa Logo" className="hero-logo-img" />
          <h1>Medusa Accesorios</h1>
          <p className="slogan">Bienvenidos a Medusa accesorios, en donde la elegancia y el estilo se transforman en poder 💎🐍</p>
        </div>
      </section>

      {products.destacados && products.destacados.length > 0 && (
        <section className="featured">
          <div className="container">
            <h2>Productos Destacados</h2>
            <ProductCarousel products={products.destacados} />
          </div>
        </section>
      )}

      {categories.map(category => (
        products[category.key] && products[category.key].length > 0 && (
          <section key={category.key} id={category.key} className="category-section">
            <div className="container">
              <h2>{category.name}</h2>
              <ProductCarousel products={products[category.key]} />
            </div>
          </section>
        )
      ))}
    </div>
  );
};

export default Home;
