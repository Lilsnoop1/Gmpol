import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SearchIcon, FilterIcon } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { ProductMachines } from '../data/products';
import InstrumentCard from '../components/InstrumentCard';

interface ProductMetadata {
  description: string;
  features: string[];
  specifications: {
    [key: string]: any;
  };
}
interface InstrumentData {
  name?: string;
  url: string;
  size?: number;
  lastModified?: string | Date;
}


interface ProductData {
  name: string;
  url: string;
  metadata: ProductMetadata;
  createdAt: string;
  updatedAt: string;
  slug: string;
}

const prod_url=import.meta.env.VITE_PROD_URL;
const dev_url=import.meta.env.VITE_DEV_URL;

const Products: React.FC = () => {
  const [products, setProducts] = useState<ProductMachines[]>([]);
  const [productDescriptions, setProductDescriptions] = useState<ProductData[]>([]);
  const [instruments,setInstruments] = useState<InstrumentData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'machines' | 'instruments'>('machines');

  const categories = ['All', 'Monitors', 'Surgical', 'Imaging', 'Respiratory', 'Accessories'];

  useEffect(() => {
    const fetchMachines = async () => {
      setLoading(true);
      try {
        if(activeTab=='machines'){
           const response = await axios.get<ProductMachines[]>(`${prod_url}/api/machines`, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const metadataResponse = await axios.get<{ machines: ProductData[] }>(`${prod_url}/api/machines/descriptions`, {
            headers: {
              'Content-Type': 'application/json',
            }
          });
          setProducts(response.data);
          setProductDescriptions(metadataResponse.data.machines || []);
        }else{
           const response = await axios.get<InstrumentData[]>(`${prod_url}/api/instruments`, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          setInstruments(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch machines:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMachines();
  }, [activeTab]);

  useEffect(() => {
    setSearchTerm('');
    setCategoryFilter('');
  }, [activeTab]);

  const filteredProducts = activeTab === 'instruments'
  ? instruments.filter((file) => {
      const matchesSearch =
        (file.name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
        file.url.toLowerCase().includes(searchTerm.toLowerCase());

      // For simplicity, instruments ignore category filtering
      return matchesSearch;
    })
  : productDescriptions.filter((product) => {
      const { name, metadata } = product;

      const matchesSearch =
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        metadata.description.toLowerCase().includes(searchTerm.toLowerCase());

      const categoryValue = metadata.description || metadata.specifications.category;
      const matchesCategory =
        categoryFilter === '' ||
        categoryFilter === 'All' ||
        (typeof categoryValue === 'string' && categoryValue.toLowerCase() === categoryFilter.toLowerCase());

      return matchesSearch && matchesCategory;
    });


  return (
    <div className="bg-gray-50 min-h-screen w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Medical Parts Catalog</h1>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('machines')}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === 'machines'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              Machines
            </button>
            <button
              onClick={() => setActiveTab('instruments')}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === 'instruments'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              Instruments
            </button>
          </nav>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <FilterIcon className="h-5 w-5 text-gray-400 mr-2" />
            <select
              className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Loading Indicator */}
        {loading ? (
          <div className="text-center py-12 text-gray-600 text-lg">Loading {activeTab}...</div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((item) =>
          activeTab === 'machines' ? (
            <ProductCard key={item.name} product={item as ProductData} />
          ) : (
            <InstrumentCard key={item.url} file={item} />
          )
        )}
      </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl text-gray-600">
              No {activeTab} found matching your criteria
            </h3>
            <button
              className="mt-4 text-blue-600 hover:text-blue-800"
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('');
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
