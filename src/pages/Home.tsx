import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheckIcon, TruckIcon, BadgeCheckIcon, HeartPulseIcon, StarIcon, CheckCircleIcon, GlobeIcon, Building2Icon, GraduationCapIcon, HeartHandshakeIcon } from 'lucide-react';
import { motion } from 'framer-motion';

// Declare DOTmed types
declare global {
  interface Window {
    DotmedEmbed?: {
      init: () => void;
    };
  }
}

const Home: React.FC = () => {
  useEffect(() => {
    // Load DOTmed script
    const script = document.createElement('script');
    script.src = 'https://www.dotmed.com/js/embedListings.js?tkn=8842137ca13a6e67db4d97517c98bcda';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on component unmount
      document.body.removeChild(script);
    };
  }, []);

  const handleDotmedClick = () => {
    // Trigger DOTmed embed
    if (window.DotmedEmbed) {
      window.DotmedEmbed.init();
    }
  };

  return <div className="w-full">
      {/* Hero Section with Split Layout */}
      <section className="min-h-[85vh] flex items-center">
        <div className="w-full flex flex-col md:flex-row">
          {/* Left side - Content */}
          <div className="w-full md:w-1/2 bg-blue-900 p-12 md:p-16 flex items-center">
            <div className="max-w-xl mx-auto space-y-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  Your Trusted Source for Medical Equipment
                </h1>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  Discover high-quality medical equipment and parts, sourced
                  globally and delivered with excellence. Empowering healthcare
                  through reliable solutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    to="/products" 
                    className="inline-block bg-white text-blue-700 font-semibold px-8 py-4 rounded-xl shadow-lg hover:bg-blue-50 transition duration-300 text-center transform hover:-translate-y-1"
                  >
                    Browse Products
                  </Link>
                  <Link 
                    to="/contact" 
                    className="inline-block bg-transparent text-white border-2 border-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition duration-300 text-center transform hover:-translate-y-1"
                  >
                    Contact Us
                  </Link>
                </div>
              </motion.div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <div className="text-3xl font-bold text-white mb-1">8+</div>
                  <div className="text-blue-100 text-sm">Years Experience</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <div className="text-3xl font-bold text-white mb-1">1000+</div>
                  <div className="text-blue-100 text-sm">Products Delivered</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <div className="text-3xl font-bold text-white mb-1">500+</div>
                  <div className="text-blue-100 text-sm">Happy Clients</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <div className="text-3xl font-bold text-white mb-1">20+</div>
                  <div className="text-blue-100 text-sm">Global Partners</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side - Image */}
          <div className="w-full md:w-1/2 relative min-h-[400px] md:min-h-[85vh]">
            <div className="absolute inset-0 bg-cover bg-center" style={{
              backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/0/00/St_Louis_night_expblend_cropped.jpg')`
            }}>
              <div className="absolute inset-0 bg-gradient-to-l from-blue-900/30 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>
      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose GMPOL?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine global expertise with local knowledge to provide the best medical equipment solutions
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6 mx-auto">
                <Building2Icon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">Dual Presence</h3>
              <p className="text-gray-600 text-center">
                Strategic locations in both Pakistan and USA for efficient global distribution
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6 mx-auto">
                <GraduationCapIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">Expert Knowledge</h3>
              <p className="text-gray-600 text-center">
                Deep understanding of medical equipment requirements and specifications
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6 mx-auto">
                <CheckCircleIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">Quality Verified</h3>
              <p className="text-gray-600 text-center">
                All equipment undergoes thorough inspection and meets international standards
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6 mx-auto">
                <HeartHandshakeIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">Dedicated Support</h3>
              <p className="text-gray-600 text-center">
                Personalized assistance and after-sales support for all our clients
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Shipping Partners Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold text-gray-900">Our Shipping Partners</h2>
            <p className="mt-2 text-gray-600">Reliable worldwide shipping through trusted carriers</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center justify-items-center">
            <div className="p-6 hover:scale-105 transition-transform duration-300">
              <img 
                src="https://cdn.worldvectorlogo.com/logos/dhl-express.svg" 
                alt="DHL Express" 
                className="h-16 object-contain"
              />
            </div>
            <div className="p-6 hover:scale-105 transition-transform duration-300">
              <img 
                src="https://cdn.worldvectorlogo.com/logos/united-states-postal-service-logo.svg" 
                alt="USPS" 
                className="h-16 object-contain"
              />
            </div>
            <div className="p-6 hover:scale-105 transition-transform duration-300">
              <img 
                src="https://cdn.worldvectorlogo.com/logos/fedex-express-6.svg" 
                alt="FedEx" 
                className="h-16 object-contain"
              />
            </div>
            <div className="p-6 hover:scale-105 transition-transform duration-300">
              <img 
                src="https://cdn.worldvectorlogo.com/logos/ups-logo-1.svg" 
                alt="UPS" 
                className="h-16 object-contain"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Enhanced Call to Action */}
      <section className="relative py-20 bg-blue-700">
        <div className="absolute inset-0 bg-blue-800 opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Looking for Specific Medical Equipment?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Contact our expert team today. We'll help you find the perfect
            solution for your healthcare facility.
          </p>
          <Link to="/contact" className="inline-block bg-white text-blue-700 font-semibold px-8 py-4 rounded-md shadow-lg hover:bg-blue-50 transition duration-300">
            Get in Touch
          </Link>
        </div>
      </section>

      {/* DOTmed Floating Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={handleDotmedClick}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          title="DOTmed"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </button>
      </div>
    </div>;
};
export default Home;