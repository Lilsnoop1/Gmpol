import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, TruckIcon, ScaleIcon, RulerIcon, InfoIcon } from 'lucide-react';
import axios from 'axios';
import { useTranslate } from '@tolgee/react';

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
  const { t } = useTranslate();

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

  if (loading) return <div className="text-center py-10">{t('loading', 'Loading...')}</div>;

  if (!product && !instrument && !parts) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('product_not_found', 'Product Not Found')}</h2>
        <p className="text-gray-600 mb-6">
          {t('product_not_found_description', 'The product you\'re looking for doesn\'t exist or has been removed.')}
        </p>
        <Link to="/products" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          {t('back_to_products', 'Back to Products')}
        </Link>
      </div>
    );
  }

  const renderSpecifications = (specs: { [key: string]: any }, level = 0): JSX.Element => {
  const indent = `pl-${Math.min(level * 4, 12)}`;

  return (
    <ul className={`${indent} space-y-2`}>
      {Object.entries(specs).map(([key, value]) => {
        // Case: value is an object with `name` and `value` fields
        if (typeof value === 'object' && value !== null && 'name' in value && 'value' in value) {
          return (
            <li key={key} className="flex flex-col">
              <span className="text-gray-700 font-medium">{value.name}</span>
              <span className="text-gray-900">{value.value}</span>
            </li>
          );
        }

        // Case: value is a simple string or number
        if (typeof value === 'string' || typeof value === 'number') {
          return (
            <li key={key} className="flex flex-col">
              <span className="text-gray-700 font-medium">{t(`spec_${key.toLowerCase()}`, key)}</span>
              <span className="text-gray-900">{t(`spec_value_${key.toLowerCase()}`, value.toString())}</span>
            </li>
          );
        }

        // Case: nested object (recursive)
        if (typeof value === 'object' && value !== null) {
          return (
            <li key={key} className="flex flex-col">
              <span className="text-gray-700 font-medium">{t(`spec_${key.toLowerCase()}`, key)}</span>
              {renderSpecifications(value, level + 1)}
            </li>
          );
        }

        return null;
      })}
    </ul>
  );
};

  const renderInstrumentDetails = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={`${instrumenturl}/${encodeURIComponent(id || '')}`}
          alt={instrument?.name || t('instrument', 'Instrument')}
          className="w-full h-auto object-cover"
          loading="lazy"
        />
      </div>

      <div>
        <div className="mb-6">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-2">
            {t('instrument', 'Instrument')}
          </span>
          <h1 className="text-3xl font-bold text-gray-900">
            {t('instrument_title', 'Instrument {name}', { name: instrument?.name || t('unnamed', 'Unnamed') })}
          </h1>
        </div>

        <div className="border-t border-b border-gray-200 py-4 my-6">
          <h2 className="text-lg font-semibold mb-2">{t('details', 'Details')}</h2>
          <div className="space-y-2">
            {instrument?.lastModified && (
              <p className="text-gray-700">
                {t('last_modified', 'Last Modified')}: {new Date(instrument.lastModified).toLocaleDateString()}
              </p>
            )}
            {instrument?.size && (
              <p className="text-gray-700">
                {t('size', 'Size')}: {(instrument.size / 1024).toFixed(2)} KB
              </p>
            )}
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={() => navigate('/checkout', { state: { product: instrument,type:'instrument' } })}
            className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition duration-200"
          >
            {t('request_information', 'Request Information')}
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
          alt={parts?.name || t('part', 'Part')}
          className="w-full h-auto object-cover"
          loading="lazy"
        />
      </div>

      <div>
        <div className="mb-6">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-2">
            {t('part', 'Part')}
          </span>
          <h1 className="text-3xl font-bold text-gray-900">
            {t('part_title', 'Part {name}', { name: parts?.name || t('unnamed', 'Unnamed') })}
          </h1>
        </div>
        <div className="mt-8">
          <button
            onClick={() => navigate('/checkout', { state: { product: parts,type:'part' } })}
            className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition duration-200"
          >
            {t('request_information', 'Request Information')}
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
          alt={t('product_image_alt', 'Product image for {name}', { name: product?.name || t('product', 'Product') })}
          className="w-full h-auto object-cover"
          loading="lazy"
          key={ext}
        />
      </div>

      <div>
        <div className="mb-6">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-2">
            {t('product_name', product?.name || t('product', 'Product'))}
          </span>
          <h1 className="text-3xl font-bold text-gray-900">{t('product_title', product?.name || t('product', 'Product'))}</h1>
        </div>

        <div className="border-t border-b border-gray-200 py-4 my-6">
          <h2 className="text-lg font-semibold mb-2">{t('description', 'Description')}</h2>
          <p className="text-gray-700">{t('product_description', product?.metadata.description || t('no_description_available', 'No description available'))}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {'Dimensions' in (product?.metadata.specifications || {}) && typeof product?.metadata.specifications['Dimensions'] === 'string' && (
            <div className="flex items-start">
              <RulerIcon className="h-5 w-5 text-gray-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900">{t('dimensions', 'Dimensions')}</h3>
                <p className="text-sm text-gray-500">{t('dimensions_value', product?.metadata.specifications['Dimensions'] || t('not_specified', 'Not specified'))}</p>
              </div>
            </div>
          )}

          {'Weight' in (product?.metadata.specifications || {}) && typeof product?.metadata.specifications['Weight'] === 'string' && (
            <div className="flex items-start">
              <ScaleIcon className="h-5 w-5 text-gray-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900">{t('weight', 'Weight')}</h3>
                <p className="text-sm text-gray-500">{t('weight_value', product?.metadata.specifications['Weight'] || t('not_specified', 'Not specified'))}</p>
              </div>
            </div>
          )}

          {'Condition' in (product?.metadata.specifications || {}) && typeof product?.metadata.specifications['Condition'] === 'string' && (
            <div className="flex items-start">
              <InfoIcon className="h-5 w-5 text-gray-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900">{t('condition', 'Condition')}</h3>
                <p className="text-sm text-gray-500">{t('condition_value', product?.metadata.specifications['Condition'] || t('not_specified', 'Not specified'))}</p>
              </div>
            </div>
          )}

          {'Availability' in (product?.metadata.specifications || {}) && typeof product?.metadata.specifications['Availability'] === 'string' && (
            <div className="flex items-start">
              <TruckIcon className="h-5 w-5 text-gray-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900">{t('availability', 'Availability')}</h3>
                <p className="text-sm text-gray-500">{t('availability_value', product?.metadata.specifications['Availability'] || t('not_specified', 'Not specified'))}</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">{t('technical_specifications', 'Technical Specifications')}</h2>
          <div className="bg-gray-50 rounded-lg p-4">
            {product?.metadata.specifications && renderSpecifications(product.metadata.specifications)}
          </div>
        </div>

        <div className="mt-8">
          <button
          onClick={() => navigate('/checkout', { state: { product: product, type: 'machine' } })}
          className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition duration-200"
        >
          {t('request_information', 'Request Information')}
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
            {t('back_to_products', 'Back to Products')}
          </Link>
        </div>

        {comesfrom === 'instrument' ? renderInstrumentDetails() : comesfrom==="part"? renderPartsDetails() : renderProductDetails()}

        <div className="mt-12 border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('additional_information', 'Additional Information')}</h2>
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">{t('compatibility', 'Compatibility')}</h3>
            <p className="text-gray-700 mb-4">{t('contact_for_compatibility', 'Contact us for detailed compatibility information.')}</p>
            <h3 className="text-lg font-semibold mb-4">{t('shipping_handling', 'Shipping & Handling')}</h3>
            <p className="text-gray-700">
              {t('shipping_description', 'All products are carefully packaged to ensure safe delivery. For international shipping or special handling requirements, please contact our sales team.')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
