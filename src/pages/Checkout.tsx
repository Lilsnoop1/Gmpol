import React, { useState, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowLeftIcon, ShoppingBagIcon} from 'lucide-react';
import emailjs from '@emailjs/browser';

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
}

interface InstrumentData {
  name?: string;
  url: string;
  size?: number;
  lastModified?: string | Date;
}

interface LocationState {
  product: ProductData | InstrumentData;
  type?: 'instrument' | 'machine';
}

const machineurl = import.meta.env.VITE_R2_PUBLIC_URL_MACHINE;
const instrumenturl = import.meta.env.VITE_R2_PUBLIC_URL_INSTRUMENT;
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const CHECKOUT_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CHECKOUT_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const CONTACT_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID;

const Checkout: React.FC = () => {
  const location = useLocation();
  const { product, type='machine'  } = location.state as LocationState || {};
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    city: '',
    country: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">No Product Selected</h2>
        <p className="text-gray-600 mb-6">Please select a product before proceeding to checkout.</p>
        <Link to="/products" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Browse Products
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const templateParams = {
        to_email: 'info@gmpol.com',
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        phone: formData.phone,
        company: formData.company,
        address: formData.address,
        city: formData.city,
        country: formData.country,
        message: formData.message,
        product_name: type === 'instrument' ? `Instrument ${(product as InstrumentData).name || 'Unnamed'}` : (product as ProductData).name,
        product_description: type === 'instrument' ? 'Instrument Inquiry' : (product as ProductData).metadata.description,
        product_features: type === 'instrument' ? 'N/A' : (product as ProductData).metadata.features.join('\n'),
        product_specifications: type === 'instrument' ? 'N/A' : JSON.stringify((product as ProductData).metadata.specifications, null, 2)
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        CHECKOUT_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      setSubmitStatus({
        type: 'success',
        message: 'Your inquiry has been sent successfully! We will contact you soon.'
      });
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        address: '',
        city: '',
        country: '',
        message: ''
      });
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send your inquiry. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatKey = (key: string): string => {
    return key
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const renderSpecifications = (specs: { [key: string]: any }, level = 0) => {
    return (
      <div className={`space-y-2 ${level > 0 ? 'ml-4 border-l-2 border-gray-200 pl-4' : ''}`}>
        {Object.entries(specs).map(([key, value]) => (
          <div key={key} className="specification-group">
            <h4 className={`font-medium text-gray-900 ${level === 0 ? 'text-sm' : 'text-xs'}`}>
              {formatKey(key)}
            </h4>
            {typeof value === 'string' || typeof value === 'number' ? (
              <p className="text-gray-600 text-sm mt-1">{value}</p>
            ) : Array.isArray(value) ? (
              <ul className="list-disc list-inside mt-1 space-y-1 text-sm text-gray-600">
                {value.map((item, index) => (
                  <li key={index}>{typeof item === 'object' ? JSON.stringify(item) : item}</li>
                ))}
              </ul>
            ) : (
              <div className="mt-1">{renderSpecifications(value, level + 1)}</div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderProductInfo = () => {
    if (type === 'instrument') {
      const instrument = product as InstrumentData;
      return (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Instrument Information</h2>
          
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <img
                src={`${instrumenturl}/${encodeURIComponent(instrument.name || '')}`}
                alt={instrument.name || 'Instrument'}
                className="w-24 h-24 object-cover rounded-lg"
                onError={e => {
                  (e.target as HTMLImageElement).src = '/fallback-image.png';
                }}
              />
            </div>
            <div className="flex-grow">
              <h3 className="text-lg font-semibold text-gray-900">
                Instrument {instrument.name || 'Unnamed'}
              </h3>
              {instrument.lastModified && (
                <p className="text-gray-500 text-sm mb-2">
                  Last Modified: {new Date(instrument.lastModified).toLocaleDateString()}
                </p>
              )}
              {instrument.size && (
                <p className="text-gray-500 text-sm">
                  Size: {(instrument.size / 1024).toFixed(2)} KB
                </p>
              )}
            </div>
          </div>
        </div>
      );
    }

    const machine = product as ProductData;
    if (!machine || !machine.metadata) {
      return (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Information</h2>
          <p className="text-gray-600">No product information available.</p>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Information</h2>
        
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <img
              src={`${machineurl}/${machine.slug}.jpg`}
              alt={machine.name}
              className="w-24 h-24 object-cover rounded-lg"
              onError={e => {
                (e.target as HTMLImageElement).src = '/fallback-image.png';
              }}
            />
          </div>
          <div className="flex-grow">
            <h3 className="text-lg font-semibold text-gray-900">{machine.name}</h3>
            <p className="text-gray-500 text-sm mb-2">Part Number: {machine.slug}</p>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-6">
          {machine.metadata.description && (
            <>
              <h4 className="text-sm font-medium text-gray-900 mb-4">Description</h4>
              <p className="text-sm text-gray-600 mb-6">{machine.metadata.description}</p>
            </>
          )}

          {machine.metadata.features && machine.metadata.features.length > 0 && (
            <>
              <h4 className="text-sm font-medium text-gray-900 mb-4">Key Features</h4>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 mb-6">
                {machine.metadata.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </>
          )}

          {machine.metadata.specifications && Object.keys(machine.metadata.specifications).length > 0 && (
            <>
              <h4 className="text-sm font-medium text-gray-900 mb-4">Technical Specifications</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                {renderSpecifications(machine.metadata.specifications)}
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen w-full py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link 
            to={`/products/${type === 'instrument' ? encodeURIComponent((product as InstrumentData).name || '') + '/instrument' : (product as ProductData).slug}`} 
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to {type === 'instrument' ? 'Instrument' : 'Product'}
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product/Instrument Summary */}
          {renderProductInfo()}

          {/* Customer Information Form */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Information</h2>
              {submitStatus.type && (
                <div
                  className={`mb-6 p-4 rounded-md ${
                    submitStatus.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={formData.firstName}
                      onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      value={formData.lastName}
                      onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                    Company Name (Optional)
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      value={formData.city}
                      onChange={e => setFormData({ ...formData, city: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                      Country
                    </label>
                    <input
                      type="text"
                      id="country"
                      value={formData.country}
                      onChange={e => setFormData({ ...formData, country: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Additional Message (Optional)
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
                    isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                >
                  <ShoppingBagIcon className="h-5 w-5 mr-2" />
                  {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;