import React from 'react';

interface DotmedButtonProps {
  onClick: () => void;
  isListingsVisible: boolean;
}

const DotmedButton: React.FC<DotmedButtonProps> = ({ onClick, isListingsVisible }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={onClick}
        className={`bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
          isListingsVisible ? 'ring-2 ring-blue-500' : ''
        }`}
        title={isListingsVisible ? "Hide DOTmed Listings" : "Show DOTmed Listings"}
      >
        <img
          alt="DOTmed Listings"
          title="DOTmed Listings"
          src="https://images.dotmed.com/images/webstore/DOTmedWebStore.gif"
          className="h-12 w-12 rounded-full object-cover"
        />
      </button>
    </div>
  );
};

export default DotmedButton; 