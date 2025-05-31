import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import DotmedButton from './components/DotmedButton';
import Checkout from './pages/Checkout';

declare global {
  interface Window {
    DotmedEmbed?: {
      init: () => void;
    };
  }
}

const App: React.FC = () => {
  const [showListings, setShowListings] = useState(false);
  
  // Re-initialize DOTmed when the modal is shown
  useEffect(() => {
    if (showListings && window.DotmedEmbed && document.getElementById('dm-top-container')) {
      window.DotmedEmbed.init();
    }
  }, [showListings]);

  const handleDotmedClick = () => {
    setShowListings(!showListings);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        {/* DOTmed Listings Modal */}
        <div
          className={`fixed inset-0 z-50 overflow-y-auto transition-opacity duration-300 ${
            showListings ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Blur Background */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleDotmedClick}
          ></div>

          {/* Modal Content */}
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-hidden">
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">DOTmed Listings</h2>
                <button
                  onClick={handleDotmedClick}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                <div id="dm-top-container" className="w-full"></div>
              </div>
            </div>
          </div>
        </div>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id/:comesfrom?" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </main>

        <Footer />
        <DotmedButton onClick={handleDotmedClick} isListingsVisible={showListings} />
      </div>
    </Router>
  );
};

export default App;
