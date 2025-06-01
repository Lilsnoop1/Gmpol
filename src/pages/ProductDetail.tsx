import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, TruckIcon, ScaleIcon, RulerIcon, InfoIcon } from 'lucide-react';
import axios from 'axios';

const machineurl = import.meta.env.VITE_R2_PUBLIC_URL_MACHINE;
const instrumenturl = import.meta.env.VITE_R2_PUBLIC_URL_INSTRUMENT;
const partsurl = import.meta.env.VITE_R2_PUBLIC_URL_PARTS;

const prod_url=import.meta.env.VITE_PROD_URL;
const dev_url=import.meta.env.VITE_DEV_URL;

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
  extension:string;
}

interface InstrumentData {
  name?: string;
  url: string;
  size?: number;
  lastModified?: string | Date;
}
interface PartsData {
  name?: string;
  url: string;
}
interface ApiResponse {
  data: ProductData;
}

const ProductDetail: React.FC = () => {
  const { id, comesfrom, ext } = useParams<{ id: string; comesfrom?: string; ext?: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [instrument, setInstrument] = useState<InstrumentData | null>(null);
   const [parts, setParts] = useState<PartsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    if (comesfrom === 'instrument') {
      // For instruments, we don't need to fetch additional data
      setInstrument({
        name: decodeURIComponent(id),
        url: `${instrumenturl}/${id}`,
        lastModified: new Date().toISOString()
      });
      setLoading(false);
    }else if(comesfrom==='part'){
      setParts({
        name: decodeURIComponent(id),
        url: `${partsurl}/${id}`,
      });
      setLoading(false);
    } else {
      // For machines, fetch the product data
      const cleanId = id.replace(/\.[^/.]+$/, '');
      setLoading(true);
      axios
        .get<ApiResponse>(`${prod_url}/api/machines/singledesc/${cleanId}`)
        .then(res => {
          setProduct(res.data.data || null);
          setLoading(false);
        })
        .catch(() => {
          setProduct(null);
          setLoading(false);
        });
    }
  }, [id, comesfrom]);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  if (!product && !instrument && !parts) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-6">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/products" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Products
        </Link>
      </div>
    );
  }

  const renderSpecifications = (specs: { [key: string]: any }, level = 0) => {
    return (
      <ul className={`pl-${level * 4} space-y-2`}>
        {Object.entries(specs).map(([key, value]) => (
          <li key={key} className="flex flex-col">
            <span className="text-gray-700 font-medium">{key}</span>
            {typeof value === 'string' || typeof value === 'number' ? (
              <span className="text-gray-900">{value}</span>
            ) : (
              renderSpecifications(value, level + 1)
            )}
          </li>
        ))}
      </ul>
    );
  };

  const renderInstrumentDetails = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={`${instrumenturl}/${encodeURIComponent(id || '')}`}
          alt={instrument?.name || 'Instrument'}
          className="w-full h-auto object-cover"
          loading="lazy"
        />
      </div>

      <div>
        <div className="mb-6">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-2">
            Instrument
          </span>
          <h1 className="text-3xl font-bold text-gray-900">
            Instrument {instrument?.name || 'Unnamed'}
          </h1>
        </div>

        <div className="border-t border-b border-gray-200 py-4 my-6">
          <h2 className="text-lg font-semibold mb-2">Details</h2>
          <div className="space-y-2">
            {instrument?.lastModified && (
              <p className="text-gray-700">
                Last Modified: {new Date(instrument.lastModified).toLocaleDateString()}
              </p>
            )}
            {instrument?.size && (
              <p className="text-gray-700">
                Size: {(instrument.size / 1024).toFixed(2)} KB
              </p>
            )}
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={() => navigate('/checkout', { state: { product: instrument,type:'instrument' } })}
            className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition duration-200"
          >
            Request Information
          </button>
        </div>
      </div>
    </div>
  );
  const renderPartsDetails = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={`${partsurl}/${encodeURIComponent(id || '')}`}
          alt={parts?.name || 'Instrument'}
          className="w-full h-auto object-cover"
          loading="lazy"
        />
      </div>

      <div>
        <div className="mb-6">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-2">
            Instrument
          </span>
          <h1 className="text-3xl font-bold text-gray-900">
            Instrument {parts?.name || 'Unnamed'}
          </h1>
        </div>
        <div className="mt-8">
          <button
            onClick={() => navigate('/checkout', { state: { product: parts,type:'part' } })}
            className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition duration-200"
          >
            Request Information
          </button>
        </div>
      </div>
    </div>
  );

  const renderProductDetails = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={`${machineurl}/${id}${ext?ext:".png"}`}
          alt={product?.name}
          className="w-full h-auto object-cover"
          loading="lazy"
          key={ext}
        />
      </div>

      <div>
        <div className="mb-6">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-2">
            {product?.name}
          </span>
          <h1 className="text-3xl font-bold text-gray-900">{product?.name}</h1>
        </div>

        <div className="border-t border-b border-gray-200 py-4 my-6">
          <h2 className="text-lg font-semibold mb-2">Description</h2>
          <p className="text-gray-700">{product?.metadata.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {'Dimensions' in (product?.metadata.specifications || {}) && typeof product?.metadata.specifications['Dimensions'] === 'string' && (
            <div className="flex items-start">
              <RulerIcon className="h-5 w-5 text-gray-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900">Dimensions</h3>
                <p className="text-sm text-gray-500">{product?.metadata.specifications['Dimensions']}</p>
              </div>
            </div>
          )}

          {'Weight' in (product?.metadata.specifications || {}) && typeof product?.metadata.specifications['Weight'] === 'string' && (
            <div className="flex items-start">
              <ScaleIcon className="h-5 w-5 text-gray-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900">Weight</h3>
                <p className="text-sm text-gray-500">{product?.metadata.specifications['Weight']}</p>
              </div>
            </div>
          )}

          {'Condition' in (product?.metadata.specifications || {}) && typeof product?.metadata.specifications['Condition'] === 'string' && (
            <div className="flex items-start">
              <InfoIcon className="h-5 w-5 text-gray-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900">Condition</h3>
                <p className="text-sm text-gray-500">{product?.metadata.specifications['Condition']}</p>
              </div>
            </div>
          )}

          {'Availability' in (product?.metadata.specifications || {}) && typeof product?.metadata.specifications['Availability'] === 'string' && (
            <div className="flex items-start">
              <TruckIcon className="h-5 w-5 text-gray-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900">Availability</h3>
                <p className="text-sm text-gray-500">{product?.metadata.specifications['Availability']}</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Technical Specifications</h2>
          <div className="bg-gray-50 rounded-lg p-4">
            {product?.metadata.specifications && renderSpecifications(product.metadata.specifications)}
          </div>
        </div>

        <div className="mt-8">
          <button
          onClick={() => navigate('/checkout', { state: { product, type: 'machine' } })}
          className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition duration-200"
        >
          Request Information
        </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <Link to="/products" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
        </div>

        {comesfrom === 'instrument' ? renderInstrumentDetails() : comesfrom==="part"? renderPartsDetails() : renderProductDetails()}

        <div className="mt-12 border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Information</h2>
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Compatibility</h3>
            <p className="text-gray-700 mb-4">Contact us for detailed compatibility information.</p>
            <h3 className="text-lg font-semibold mb-4">Shipping & Handling</h3>
            <p className="text-gray-700">
              All products are carefully packaged to ensure safe delivery. For international shipping or special handling
              requirements, please contact our sales team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
