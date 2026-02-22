import React, { useState, useEffect } from 'react';
import ProductCarousel from '../components/ProductCarousel';
import { supabase } from '../lib/supabase';
import logoImg from '../assets/Logo.jpeg';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState({ destacados: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSupabaseProducts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data) {
          const categorized = { destacados: [] };

          data.forEach(item => {
            const category = item.category.toLowerCase();
            const productWithImage = {
              ...item,
              image: item.image_url
            };

            if (!categorized[category]) {
              categorized[category] = [];
            }
            categorized[category].push(productWithImage);
          });

          // Definir destacados (últimos 8 productos añadidos)
          categorized.destacados = data.slice(0, 8).map(i => ({ ...i, image: i.image_url }));

          setProducts(categorized);
        }
      } catch (err) {
        console.error("Error cargando productos de Supabase:", err);
      } finally {
        setLoading(false);
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

  if (loading) {
    return (
      <div className="home-loading" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', gap: '20px' }}>
        <img src={logoImg} alt="Cargando..." style={{ width: '100px', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
        <p style={{ color: '#666', fontWeight: '500' }}>Cargando elegancia...</p>
        <style>{`
          @keyframes pulse {
            0% { transform: scale(0.95); opacity: 0.5; }
            50% { transform: scale(1.05); opacity: 1; }
            100% { transform: scale(0.95); opacity: 0.5; }
          }
        `}</style>
      </div>
    );
  }

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
