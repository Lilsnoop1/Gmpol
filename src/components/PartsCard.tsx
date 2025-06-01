import React from 'react';
import { Link } from 'react-router-dom';

interface PartsData {
  name?: string;
  url: string;
}

interface PartsCardProps {
  file: PartsData;
}

const partsurl = import.meta.env.VITE_R2_PUBLIC_URL_PARTS;

// Helper function to format product name as URL-friendly string
const formatName = (name: string) => `${encodeURIComponent(name)}`;

const PartsCard: React.FC<PartsCardProps> = ({ file}) => {
  const formattedName = file.name ? formatName(file.name) : file.url;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/products/${encodeURIComponent(file.name || 'unnamed')}/part`}>
        <img
          src={`${partsurl}/${formattedName}`}
          alt={file.name || 'Instrument'}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">
            <Link
              to={`/products/${encodeURIComponent(file.name || 'unnamed')}/part`}
              className="text-gray-900 hover:text-blue-700"
            >
              {file.name || formattedName.replace(/\.[^/.]+$/, '')}
            </Link>
          </h3>
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
            Parts
          </span>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <Link
            to={`/products/${encodeURIComponent(file.name || 'unnamed')}/part`}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PartsCard;
