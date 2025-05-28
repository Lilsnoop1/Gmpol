import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheckIcon, TruckIcon, BadgeCheckIcon, HeartPulseIcon, StarIcon, CheckCircleIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  return <div className="w-full">
      {/* Hero Section with Gateway Arch Background */}
      <section className="relative min-h-[85vh] flex items-center">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-contain bg-no-repeat" style={{
            backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/0/00/St_Louis_night_expblend_cropped.jpg')`,
            backgroundPosition: 'right center'
          }}>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-900/70 to-transparent"></div>
          </div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="md:w-1/2">
            <div className="space-y-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
              >
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  Your Trusted Source for Medical Equipment
                </h1>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  Discover high-quality medical equipment and parts, sourced
                  globally and delivered with excellence. Empowering healthcare
                  through reliable solutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    to="/products" 
                    className="inline-block bg-white text-blue-700 font-semibold px-8 py-4 rounded-xl shadow-lg hover:bg-blue-50 transition duration-300 text-center transform hover:-translate-y-1"
                  >
                    Browse Products
                  </Link>
                  <Link 
                    to="/contact" 
                    className="inline-block bg-transparent text-white border-2 border-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition duration-300 text-center transform hover:-translate-y-1"
                  >
                    Contact Us
                  </Link>
                </div>
              </motion.div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <div className="text-3xl font-bold text-white mb-1">8+</div>
                  <div className="text-blue-100 text-sm">Years Experience</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <div className="text-3xl font-bold text-white mb-1">1000+</div>
                  <div className="text-blue-100 text-sm">Products Delivered</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <div className="text-3xl font-bold text-white mb-1">500+</div>
                  <div className="text-blue-100 text-sm">Happy Clients</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <div className="text-3xl font-bold text-white mb-1">20+</div>
                  <div className="text-blue-100 text-sm">Global Partners</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-lg transform hover:-translate-y-1 transition duration-300">
              <div className="text-4xl font-bold text-blue-600 mb-2">8+</div>
              <div className="text-gray-600">Years of Experience</div>
            </div>
            <div className="text-center p-6 rounded-lg transform hover:-translate-y-1 transition duration-300">
              <div className="text-4xl font-bold text-blue-600 mb-2">1000+</div>
              <div className="text-gray-600">Products Delivered</div>
            </div>
            <div className="text-center p-6 rounded-lg transform hover:-translate-y-1 transition duration-300">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
            <div className="text-center p-6 rounded-lg transform hover:-translate-y-1 transition duration-300">
              <div className="text-4xl font-bold text-blue-600 mb-2">20+</div>
              <div className="text-gray-600">Global Partners</div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose GMPOL?
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6 mx-auto">
                <ShieldCheckIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">
                Quality Assurance
              </h3>
              <p className="text-gray-600 text-center">
                All our medical parts undergo rigorous quality checks and
                testing procedures.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6 mx-auto">
                <TruckIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">
                Global Sourcing
              </h3>
              <p className="text-gray-600 text-center">
                Access to a worldwide network of trusted medical equipment
                suppliers.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6 mx-auto">
                <BadgeCheckIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">
                Certified Parts
              </h3>
              <p className="text-gray-600 text-center">
                International standard certifications for all medical equipment.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6 mx-auto">
                <HeartPulseIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">
                Healthcare Focus
              </h3>
              <p className="text-gray-600 text-center">
                Dedicated to supporting healthcare providers with reliable
                solutions.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      {/* <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8"> */}
            {/* Testimonial 1 */}
            {/* <div className="bg-gray-50 p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <StarIcon className="h-5 w-5 text-yellow-400 fill-current" />
                <StarIcon className="h-5 w-5 text-yellow-400 fill-current" />
                <StarIcon className="h-5 w-5 text-yellow-400 fill-current" />
                <StarIcon className="h-5 w-5 text-yellow-400 fill-current" />
                <StarIcon className="h-5 w-5 text-yellow-400 fill-current" />
              </div>
              <p className="text-gray-600 mb-6 italic">
                "Outstanding quality and service. GMPOL has been our trusted
                supplier for medical equipment for over 3 years now."
              </p>
              <div>
                <p className="font-semibold text-gray-900">Dr. Sarah Ahmed</p>
                <p className="text-gray-500">Chief of Surgery, City Hospital</p>
              </div>
            </div> */}
            {/* Testimonial 2 */}
            {/* <div className="bg-gray-50 p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <StarIcon className="h-5 w-5 text-yellow-400 fill-current" />
                <StarIcon className="h-5 w-5 text-yellow-400 fill-current" />
                <StarIcon className="h-5 w-5 text-yellow-400 fill-current" />
                <StarIcon className="h-5 w-5 text-yellow-400 fill-current" />
                <StarIcon className="h-5 w-5 text-yellow-400 fill-current" />
              </div>
              <p className="text-gray-600 mb-6 italic">
                "Reliable equipment and excellent customer support. They
                understand our needs and deliver consistently."
              </p>
              <div>
                <p className="font-semibold text-gray-900">Dr. Khalid Rahman</p>
                <p className="text-gray-500">Medical Director, Care Center</p>
              </div>
            </div> */}
            {/* Testimonial 3 */}
            {/* <div className="bg-gray-50 p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <StarIcon className="h-5 w-5 text-yellow-400 fill-current" />
                <StarIcon className="h-5 w-5 text-yellow-400 fill-current" />
                <StarIcon className="h-5 w-5 text-yellow-400 fill-current" />
                <StarIcon className="h-5 w-5 text-yellow-400 fill-current" />
                <StarIcon className="h-5 w-5 text-yellow-400 fill-current" />
              </div>
              <p className="text-gray-600 mb-6 italic">
                "GMPOL's commitment to quality and timely delivery has made them
                our go-to supplier for medical equipment."
              </p>
              <div>
                <p className="font-semibold text-gray-900">Dr. Fatima Khan</p>
                <p className="text-gray-500">CEO, Health Solutions</p>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* Enhanced Call to Action */}
      <section className="relative py-20 bg-blue-700">
        <div className="absolute inset-0 bg-blue-800 opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Looking for Specific Medical Equipment?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Contact our expert team today. We'll help you find the perfect
            solution for your healthcare facility.
          </p>
          <Link to="/contact" className="inline-block bg-white text-blue-700 font-semibold px-8 py-4 rounded-md shadow-lg hover:bg-blue-50 transition duration-300">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>;
};
export default Home;