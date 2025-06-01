import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface CertificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CertificationsModal: React.FC<CertificationsModalProps> = ({ isOpen, onClose }) => {
  const certifications = [
    { year: '2024', image: 'https://images.dotmed.com/images/ethics/2024dm100.jpg' },
    { year: '2019', image: 'https://images.dotmed.com/images/ethics/2019dm100.jpg' },
    { year: '2018', image: 'https://images.dotmed.com/images/ethics/2018dm100.jpg' },
    { year: '2017', image: 'https://images.dotmed.com/images/ethics/2017dm100.jpg' },
    { year: '2016', image: 'https://images.dotmed.com/images/ethics/2016dm100.jpg' },
    { year: '2015', image: 'https://images.dotmed.com/images/ethics/2015dm100.jpg' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] overflow-y-auto"
        >
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 transition-opacity"
              onClick={onClose}
            >
              <div className="absolute inset-0 bg-black/50"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">Our Certifications & Awards</h3>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {certifications.map((cert) => (
                    <div key={cert.year} className="bg-gray-50 rounded-lg p-4">
                      <img
                        src={cert.image}
                        alt={`DOTmed Certification ${cert.year}`}
                        className="w-full h-auto rounded-lg shadow-md"
                      />
                      <p className="mt-2 text-center text-gray-600">DOTmed Certification {cert.year}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <a
                    href="https://www.dotmed.com/verify/user/122802"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    Verify our DOTmed profile
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CertificationsModal; 