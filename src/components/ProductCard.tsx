import React from 'react';
import { Link } from 'react-router-dom';

interface ProductMetadata {
  description: string;
  features: string[];
  specifications: {
    [key: string]: any;
  };
}

interface ProductData {
  name: string;
  url: string;
  metadata: ProductMetadata;
  createdAt: string;
  updatedAt: string;
  slug: string;
  extension: string;
}

interface InstrumentData {
  name?: string;
  url: string;
  size?: number;
  lastModified?: string | Date;
}
interface ProductCardProps {
  product: ProductData;
}

const machineurl = import.meta.env.VITE_R2_PUBLIC_URL_MACHINE;

// Helper function to format product name as URL-friendly string
const formatName = (name: string) =>
  name.toLowerCase().replace(/\s+/g, '_');

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const formattedName = formatName(product.name)+product.extension;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/products/${formattedName}`} className="block aspect-[4/3]">
        <img
          src={`${machineurl}/${formattedName}`}
          alt={product.name}
          className="w-full h-full object-contain p-4"
        />
      </Link>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">
            <Link
              to={`/products/${formattedName}`}
              className="text-gray-900 hover:text-blue-700"
            >
              {product.name}
            </Link>
          </h3>
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
            {product.name}
          </span>
        </div>
        <p className="mt-2 text-gray-600 text-sm line-clamp-2">
          {product.metadata.description}
        </p>
        <div className="mt-4 flex justify-between items-center">
          <Link
            to={`/products/${formattedName}`}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
