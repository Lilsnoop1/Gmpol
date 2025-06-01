import React, { useState } from 'react';
import { AwardIcon } from 'lucide-react';
import CertificationsModal from './CertificationsModal';

interface DotmedButtonProps {
  onClick: () => void;
  isListingsVisible: boolean;
}

const DotmedButton: React.FC<DotmedButtonProps> = ({ onClick, isListingsVisible }) => {
  const [isCertificationsOpen, setIsCertificationsOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        <button
          onClick={onClick}
          className={`bg-white rounded-full p-1 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
            isListingsVisible ? 'ring-2 ring-blue-500' : ''
          } border-2 border-gradient-to-r from-blue-500 via-purple-500 to-pink-500`}
          title={isListingsVisible ? "Hide DOTmed Listings" : "Show DOTmed Listings"}
        >
          <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-[2px] rounded-full">
            <img
              alt="DOTmed Listings"
              title="DOTmed Listings"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy4bj5pu7abAHyFRyWPSYniBzG2VvwEHgr5w&s"
              className="h-20 w-20 rounded-full object-cover"
            />
          </div>
        </button>
        <button
          onClick={() => setIsCertificationsOpen(true)}
          className="bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2 text-sm font-medium text-gray-700 border-2 border-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
        >
          <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-[2px] rounded-full">
            <div className="bg-white rounded-full p-1">
              <AwardIcon className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text font-semibold">Certifications</span>
        </button>
      </div>
      <CertificationsModal
        isOpen={isCertificationsOpen}
        onClose={() => setIsCertificationsOpen(false)}
      />
    </>
  );
};

export default DotmedButton; 