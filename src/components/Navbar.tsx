import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { useTranslate, useTolgee } from '@tolgee/react';

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslate();
  const tolgee = useTolgee();
  const currentLanguage = tolgee.getLanguage();
  const isRTL = currentLanguage === 'ar-SA';

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es-ES', name: 'Español', flag: '🇪🇸' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ar-SA', name: 'العربية', flag: '🇸🇦' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
  ];

  const navLinks = [
    { name: t('home', 'Home'), path: '/' },
    { name: t('products', 'Products'), path: '/products' },
    { name: t('global_accounts', 'Global Accounts'), path: '/global-associations' },
    { name: t('about', 'About'), path: '/about' },
    { name: t('contact', 'Contact'), path: '/contact' },
  ];

  const handleLanguageChange = (languageCode: string) => {
    tolgee.changeLanguage(languageCode);
    setIsLanguageDropdownOpen(false);
  };

  const getCurrentLanguageInfo = () => {
    return languages.find(lang => lang.code === currentLanguage) || languages[0];
  };

  return (
    <nav className={`fixed w-full z-50 bg-white/95 backdrop-blur-sm shadow-lg ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center h-20 ${isRTL ? 'flex-row-reverse' : 'justify-between'}`}>
          {/* Logo */}
          <Link to="/" className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
            <img src="/logo.png" alt="GMPOL" className="h-10 w-auto" />
            <span className="text-2xl font-bold text-blue-600">
              GMPOL
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center space-x-8 ${isRTL ? 'space-x-reverse' : ''}`}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative group font-medium text-gray-800"
              >
                <span className="relative">
                  {link.name}
                  <span className={`absolute h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full ${
                    isRTL 
                      ? '-bottom-1 right-0 w-0 group-hover:right-0' 
                      : '-bottom-1 left-0 w-0 group-hover:w-full'
                  }`}></span>
                </span>
                {location.pathname === link.path && (
                  <span className={`absolute h-0.5 bg-blue-600 ${
                    isRTL ? '-bottom-1 right-0 w-full' : '-bottom-1 left-0 w-full'
                  }`}></span>
                )}
              </Link>
            ))}
            
            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200 ${isRTL ? 'space-x-reverse' : ''}`}
              >
                <Globe className="h-4 w-4" />
                <span className="text-sm font-medium">{getCurrentLanguageInfo().flag}</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isLanguageDropdownOpen && (
                <div className={`absolute mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50 ${
                  isRTL ? 'left-0' : 'right-0'
                }`}>
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageChange(language.code)}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-3 ${
                        currentLanguage === language.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                      } ${isRTL ? 'space-x-reverse' : ''}`}
                    >
                      <span className="text-lg">{language.flag}</span>
                      <span>{language.name}</span>
                      {currentLanguage === language.code && (
                        <span className={`text-blue-600 ${isRTL ? 'ml-0 mr-auto' : 'ml-auto'}`}>✓</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/contact"
              className="px-6 py-2 rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              {t('get_started', 'Get Started')}
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-800 hover:bg-gray-100/10 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? 'max-h-screen opacity-100'
            : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-sm shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === link.path
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-800 hover:bg-gray-50 hover:text-blue-600'
              } transition-colors duration-200`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          
          {/* Mobile Language Dropdown */}
          <div className="border-t border-gray-200 pt-2 mt-2">
            <div className="px-3 py-2 text-sm font-medium text-gray-500">
              {t('language', 'Language')}
            </div>
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => {
                  handleLanguageChange(language.code);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-base font-medium transition-colors duration-200 flex items-center space-x-3 ${
                  currentLanguage === language.code 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-800 hover:bg-gray-50 hover:text-blue-600'
                } ${isRTL ? 'space-x-reverse' : ''}`}
              >
                <span className="text-lg">{language.flag}</span>
                <span>{language.name}</span>
                {currentLanguage === language.code && (
                  <span className={`text-blue-600 ${isRTL ? 'ml-0 mr-auto' : 'ml-auto'}`}>✓</span>
                )}
              </button>
            ))}
          </div>

          <Link
            to="/contact"
            className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
            onClick={() => setIsOpen(false)}
          >
            {t('get_started', 'Get Started')}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;