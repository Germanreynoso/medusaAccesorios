import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import './styles/global.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Home />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
