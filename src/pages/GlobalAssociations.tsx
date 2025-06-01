import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Building2Icon, GlobeIcon, AwardIcon, UsersIcon } from 'lucide-react';

const GlobalAssociations: React.FC = () => {
  const associations = [
    {
      name: 'Karl Storz',
      logo: 'https://www.karlstorz.com/static_2x/static/file_img/logo-ks-white-revamp_small%20(1)%20(1).svg',
      description: 'Leading manufacturer of endoscopes and medical imaging equipment',
      bgColor: 'bg-blue-900',
      region: 'Global',
      partnership: 'Strategic Partner'
    },
    {
      name: 'Olympus',
      logo: 'https://www.olympus-global.com/shared/images/ci-logo-01.png',
      description: 'Global leader in medical technology and endoscopy solutions',
      region: 'Global',
      partnership: 'Premium Partner'
    },
    {
      name: 'Stryker',
      logo: 'https://www.stryker.com/etc/designs/stryker/images/header/logo.png',
      description: 'Innovative medical technology company specializing in surgical equipment',
      region: 'Global',
      partnership: 'Technology Partner'
    },
    {
      name: 'Philips',
      logo: 'https://cdn.worldvectorlogo.com/logos/philips.svg',
      description: 'Healthcare technology leader in diagnostic imaging and patient monitoring',
      region: 'Global',
      partnership: 'Healthcare Solutions Partner'
    },
    {
      name: 'Siemens Healthineers',
      logo: 'https://www.dicardiology.com/sites/default/files/X0000_Siemens_Healthineers_logo.jpg',
      description: 'Advanced medical imaging and laboratory diagnostics solutions',
      region: 'Global',
      partnership: 'Diagnostic Partner'
    },
    {
      name: 'GE Healthcare',
      logo: 'https://esraeurope.org/wp-content/uploads/2021/05/GE-healthcare-logo_front.png',
      description: 'Comprehensive medical imaging and monitoring solutions',
      region: 'Global',
      partnership: 'Healthcare Technology Partner'
    },
    {
      name: 'Drager',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Dr%C3%A4ger_Logo.svg',
      description: 'Comprehensive medical imaging and monitoring solutions',
      region: 'Global',
      partnership: 'Healthcare Technology Partner'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Global Associations
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Partnering with world-leading manufacturers to provide the highest quality
              medical equipment and solutions to healthcare facilities worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">350+</div>
              <div className="text-gray-600">Global Accounts</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">5000+</div>
              <div className="text-gray-600">Medical Products in Inventory</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">16+</div>
              <div className="text-gray-600">Years Experience</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Global Customers</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Trusted Partners
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We collaborate with industry leaders to bring you the best medical equipment
              and solutions, ensuring quality and reliability in every product.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {associations.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className={`w-24 h-24 ${partner.bgColor || 'bg-white'} rounded-lg p-3 mb-4`}>
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {partner.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{partner.description}</p>
                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                    <div className="flex items-center">
                      <GlobeIcon className="w-4 h-4 mr-1" />
                      {partner.region}
                    </div>
                    <div className="flex items-center">
                      <AwardIcon className="w-4 h-4 mr-1" />
                      {partner.partnership}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Are you a Retailer?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join our network of trusted partners and expand your reach in the
              global healthcare market.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-white text-blue-700 font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-blue-50 transition duration-300"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default GlobalAssociations; 