import React from 'react';
import { PhoneIcon, MapPinIcon, MailIcon } from 'lucide-react';
const Footer: React.FC = () => {
  return <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">GMPOL</h2>
            <p className="text-gray-300">
              Global Medical Parts Online - Your trusted source for quality used
              medical equipment and parts.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/products" className="text-gray-300 hover:text-white">
                  Products
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-300 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPinIcon className="h-5 w-5 mr-2 text-blue-400" />
                <span>DHA, Karachi, Pakistan</span>
              </div>
              <div className="flex items-center">
                <PhoneIcon className="h-5 w-5 mr-2 text-blue-400" />
                <span>033621434690</span>
              </div>
              <div className="flex items-center">
                <MailIcon className="h-5 w-5 mr-2 text-blue-400" />
                <span>info@gmpol.com</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-center text-gray-400">
            &copy; {new Date().getFullYear()} GMPOL. All rights reserved.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;