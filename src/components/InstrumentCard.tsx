import React from 'react';
import { Link } from 'react-router-dom';

interface InstrumentData {
  name?: string;
  url: string;
  size?: number;
  lastModified?: string | Date;
}

interface InstrumentCardProps {
  file: InstrumentData;
}

const instrumenturl = import.meta.env.VITE_R2_PUBLIC_URL_INSTRUMENT;

// Helper function to format product name as URL-friendly string
const formatName = (name: string) => `${encodeURIComponent(name)}`;

const InstrumentCard: React.FC<InstrumentCardProps> = ({ file }) => {
  const formattedName = file.name ? formatName(file.name) : file.url;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/products/${encodeURIComponent(file.name || 'unnamed')}/instrument`}>
        <img
          src={`${instrumenturl}/${formattedName}`}
          alt={file.name || 'Instrument'}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">
            <Link
              to={`/products/${encodeURIComponent(file.name || 'unnamed')}/instrument`}
              className="text-gray-900 hover:text-blue-700"
            >
              {file.name || formattedName.replace(/\.[^/.]+$/, '')}
            </Link>
          </h3>
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
            Instrument
          </span>
        </div>
        <div className="mt-2 text-gray-600 text-sm">
          {file.lastModified && (
            <p>Last modified: {new Date(file.lastModified).toLocaleDateString()}</p>
          )}
          {file.size && (
            <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
          )}
        </div>
        <div className="mt-4 flex justify-between items-center">
          <Link
            to={`/products/${encodeURIComponent(file.name || 'unnamed')}/instrument`}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InstrumentCard;
