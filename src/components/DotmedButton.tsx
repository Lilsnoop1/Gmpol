import React from 'react';

const DotmedButton: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        target="_blank"
        href="https://www.dotmed.com/users/my/listings.html"
        rel="noopener noreferrer"
        className="block transition-transform hover:scale-105"
      >
        <div className="bg-white rounded-full p-2 shadow-lg">
          <img
            alt="See my DOTmed Webstore"
            title="My Webstore: Global Medical Parts on Line"
            src="https://images.dotmed.com/images/webstore/DOTmedWebStore.gif"
            className="h-14 w-14 rounded-full object-cover"
          />
        </div>
      </a>
    </div>
  );
};

export default DotmedButton; 