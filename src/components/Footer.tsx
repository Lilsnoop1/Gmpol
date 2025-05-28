import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import DotmedButton from './DotmedButton';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">GMPOL</h3>
            <p className="text-gray-400 mb-4">
              Your trusted source for high-quality medical equipment and parts.
            </p>
            <div className="flex flex-col space-y-4">
              <div className="flex space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#1877F2] hover:text-[#1877F2]/80 transition-colors">
                  <FaFacebookF className="w-7 h-7" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#1DA1F2] hover:text-[#1DA1F2]/80 transition-colors">
                  <FaTwitter className="w-7 h-7" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[#0A66C2] hover:text-[#0A66C2]/80 transition-colors">
                  <FaLinkedinIn className="w-7 h-7" />
                </a>
              </div>
              <a href="https://wa.me/13145838759" target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:text-[#25D366]/80 transition-colors flex items-center gap-2">
                <FaWhatsapp className="w-7 h-7" />
                <span className="text-gray-400 hover:text-white">+1(314) 583-8759</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Pakistan Office:</li>
              <li>18-C 24th Commercial Street,</li>
              <li>Phase-II, (EXT) DHA,</li>
              <li>Karachi, Pakistan</li>
              <li className="mt-4">USA Office:</li>
              <li>1047 Dutch Mill Drive</li>
              <li>Ballwin, Missouri</li>
              <li>USA 63011</li>
            </ul>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Payment Methods</h3>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-4">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/2560px-American_Express_logo_%282018%29.svg.png" 
                  alt="American Express" 
                  className="h-8 object-contain"
                />
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" 
                  alt="Visa" 
                  className="h-8 object-contain"
                />
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/2560px-Mastercard-logo.svg.png" 
                  alt="Mastercard" 
                  className="h-8 object-contain"
                />
              </div>
              <p className="text-gray-400 text-sm">
                Secure payments through trusted payment processors
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} GMPOL. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
      <DotmedButton />
    </footer>
  );
};

export default Footer;