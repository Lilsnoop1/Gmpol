import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheckIcon, TruckIcon, BadgeCheckIcon, HeartPulseIcon, StarIcon, CheckCircleIcon, GlobeIcon, Building2Icon, GraduationCapIcon, HeartHandshakeIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ManufacturersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ManufacturersModal: React.FC<ManufacturersModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate('/contact', { 
      state: { 
        message: 'Information for all Manufacturers',
        subject: 'Manufacturers List Request'
      } 
    });
    onClose();
  };

  const manufacturers = [
    {
      name: 'Karl Storz',
      logo: 'https://www.karlstorz.com/static_2x/static/file_img/logo-ks-white-revamp_small%20(1)%20(1).svg',
      description: 'Leading manufacturer of endoscopes and medical imaging equipment',
      bgColor: 'bg-blue-900'
    },
    {
      name: 'Olympus',
      logo: 'https://www.olympus-global.com/shared/images/ci-logo-01.png',
      description: 'Global leader in medical technology and endoscopy solutions'
    },
    {
      name: 'Stryker',
      logo: 'https://www.stryker.com/etc/designs/stryker/images/header/logo.png',
      description: 'Innovative medical technology company specializing in surgical equipment'
    },
    {
      name: 'Philips',
      logo: 'https://cdn.worldvectorlogo.com/logos/philips.svg',
      description: 'Healthcare technology leader in diagnostic imaging and patient monitoring'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Our Global Manufacturing Partners</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {manufacturers.map((manufacturer, index) => (
                <motion.div
                  key={manufacturer.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 rounded-xl p-6 flex items-center space-x-4 hover:shadow-lg transition-shadow"
                >
                  <div className={`w-24 h-24 flex items-center justify-center ${manufacturer.bgColor || 'bg-white'} rounded-lg p-3`}>
                    <img
                      src={manufacturer.logo}
                      alt={manufacturer.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{manufacturer.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{manufacturer.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 text-center space-y-4">
              <p className="text-gray-600">
                And many more trusted manufacturers...
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleContactClick}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <HeartHandshakeIcon className="w-5 h-5" />
                  Contact for Complete List
                </button>
                <button
                  onClick={onClose}
                  className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
                  <div className="text-3xl font-bold text-white mb-1">16+</div>
                  <div className="text-blue-100 text-sm">Years Experience</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <div className="text-3xl font-bold text-white mb-1">5000+</div>
                  <div className="text-blue-100 text-sm">Medical Products in Inventory</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <div className="text-3xl font-bold text-white mb-1">500+</div>
                  <div className="text-blue-100 text-sm">Global Customers</div>
                </div>
                <div 
                  className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 cursor-pointer hover:bg-white/20 transition-colors"
                  onClick={() => setIsModalOpen(true)}
                >
                  <div className="text-3xl font-bold text-white mb-1">350+</div>
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
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold text-gray-900">Our Shipping Partners</h2>
            <p className="mt-2 text-gray-600">Reliable worldwide shipping through trusted carriers</p>
          </div>
          <div className="relative">
            <div className="flex animate-slide space-x-12">
              <div className="p-6 hover:scale-105 transition-transform duration-300 flex-shrink-0">
                <img 
                  src="https://cdn.worldvectorlogo.com/logos/dhl-express.svg" 
                  alt="DHL Express" 
                  className="h-16 object-contain"
                />
              </div>
              <div className="p-6 hover:scale-105 transition-transform duration-300 flex-shrink-0">
                <img 
                  src="https://cdn.worldvectorlogo.com/logos/united-states-postal-service-logo.svg" 
                  alt="USPS" 
                  className="h-16 object-contain"
                />
              </div>
              <div className="p-6 hover:scale-105 transition-transform duration-300 flex-shrink-0">
                <img 
                  src="https://cdn.worldvectorlogo.com/logos/fedex-express-6.svg" 
                  alt="FedEx" 
                  className="h-16 object-contain"
                />
              </div>
              <div className="p-6 hover:scale-105 transition-transform duration-300 flex-shrink-0">
                <img 
                  src="https://cdn.worldvectorlogo.com/logos/ups-logo-1.svg" 
                  alt="UPS" 
                  className="h-16 object-contain"
                />
              </div>
              <div className="p-6 hover:scale-105 transition-transform duration-300 flex-shrink-0">
                <img 
                  src="https://leopardscourier.com//leopardcourier_dubai/images/c-logo.png" 
                  alt="Leopard Courier" 
                  className="h-16 object-contain"
                />
              </div>
              <div className="p-6 hover:scale-105 transition-transform duration-300 flex-shrink-0 bg-red-600 rounded-lg">
                <img 
                  src="https://www.tcsexpress.com/TCS.svg" 
                  alt="TCS" 
                  className="h-16 object-contain"
                />
              </div>
              {/* Duplicate logos for continuous sliding effect */}
              <div className="p-6 hover:scale-105 transition-transform duration-300 flex-shrink-0">
                <img 
                  src="https://cdn.worldvectorlogo.com/logos/dhl-express.svg" 
                  alt="DHL Express" 
                  className="h-16 object-contain"
                />
              </div>
              <div className="p-6 hover:scale-105 transition-transform duration-300 flex-shrink-0">
                <img 
                  src="https://cdn.worldvectorlogo.com/logos/united-states-postal-service-logo.svg" 
                  alt="USPS" 
                  className="h-16 object-contain"
                />
              </div>
              <div className="p-6 hover:scale-105 transition-transform duration-300 flex-shrink-0">
                <img 
                  src="https://cdn.worldvectorlogo.com/logos/fedex-express-6.svg" 
                  alt="FedEx" 
                  className="h-16 object-contain"
                />
              </div>
              <div className="p-6 hover:scale-105 transition-transform duration-300 flex-shrink-0">
                <img 
                  src="https://cdn.worldvectorlogo.com/logos/ups-logo-1.svg" 
                  alt="UPS" 
                  className="h-16 object-contain"
                />
              </div>
              <div className="p-6 hover:scale-105 transition-transform duration-300 flex-shrink-0">
                <img 
                  src="https://leopardscourier.com//leopardcourier_dubai/images/c-logo.png" 
                  alt="Leopard Courier" 
                  className="h-16 object-contain"
                />
              </div>
              <div className="p-6 hover:scale-105 transition-transform duration-300 flex-shrink-0 bg-red-600 rounded-lg">
                <img 
                  src="https://www.tcsexpress.com/TCS.svg" 
                  alt="TCS" 
                  className="h-16 object-contain"
                />
              </div>
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

      <ManufacturersModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>;
};
export default Home;