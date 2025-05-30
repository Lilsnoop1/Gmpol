import React from 'react';
import { motion } from 'framer-motion';
import { GlobeIcon, AwardIcon, UsersIcon, ShieldCheckIcon, ClipboardCheckIcon, Building2Icon, GraduationCapIcon, HeartHandshakeIcon, TargetIcon, CheckCircle2Icon } from 'lucide-react';
import { Link } from 'react-router-dom';
const About: React.FC = () => {
  const fadeIn = {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0
    },
    transition: {
      duration: 0.6
    }
  };
  const teamMembers = [{
    name: 'Anwar Syed',
    role: 'Founder & CEO',
    image: 'https://placehold.co/400x400/e2e8f0/1e40af?text=AS',
    bio: '20+ years experience in medical equipment distribution'
  }, {
    name: 'Sarah Ahmed',
    role: 'Technical Director',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    bio: 'Biomedical engineer with expertise in equipment maintenance'
  }, {
    name: 'Dr. Malik Rahman',
    role: 'Quality Assurance Head',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    bio: 'Former hospital director with focus on equipment standards'
  }];
  const timeline = [{
    year: '2009',
    title: 'Company Founded',
    description: 'GMPOL LLC was established and registered in the state of Missouri on July 10, 2009 under the Missouri Limited Liability Company Act.'
  }, {
    year: '2009',
    title: 'Our Mission',
    description: 'To provide New and Refurbished Medical Equipment for Hospitals, Clinics & Doctors Offices around the globe. We also Support Parts & Supplies after sale.'
  }, {
    year: '2019',
    title: 'ISO Certification',
    description: 'Achieved ISO 13485 certification for medical device quality management'
  }, {
    year: '2021',
    title: 'Regional Leadership',
    description: "Became one of Pakistan's leading medical equipment suppliers"
  }, {
    year: '2023',
    title: 'Digital Transformation',
    description: 'Launched online platform for improved customer service and product access'
  }];
  return <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{
            backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/0/00/St_Louis_night_expblend_cropped.jpg')`,
            backgroundPosition: 'center 30%'
          }}>
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/95 via-blue-900/80 to-blue-900/70"></div>
          </div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="inline-block">
                <span className="text-blue-300 font-semibold tracking-wider uppercase text-sm mb-2 block">Our Story</span>
                <div className="w-20 h-1 bg-blue-400 mx-auto"></div>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                About <span className="text-blue-300">GMPOL</span>
              </h1>
              <p className="text-2xl text-blue-100 leading-relaxed max-w-3xl mx-auto">
                Your trusted partner in global medical equipment solutions, 
                connecting healthcare providers with quality equipment worldwide.
              </p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="pt-8"
              >
                <Link 
                  to="/contact" 
                  className="inline-flex items-center px-8 py-4 bg-white text-blue-700 font-semibold rounded-xl shadow-lg hover:bg-blue-50 transition duration-300 transform hover:-translate-y-1"
                >
                  Get in Touch
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Mission & Vision Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div className="bg-white p-8 rounded-xl shadow-lg" initial={{
            opacity: 0,
            x: -50
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6
          }}>
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <TargetIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Our Mission
              </h2>
              <p className="text-gray-600 leading-relaxed">
                To provide healthcare facilities with reliable, high-quality
                medical equipment through innovative distribution solutions and
                exceptional service, contributing to better healthcare outcomes
                across Pakistan and beyond.
              </p>
            </motion.div>
            <motion.div className="bg-white p-8 rounded-xl shadow-lg" initial={{
            opacity: 0,
            x: 50
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6
          }}>
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <HeartHandshakeIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Our Vision
              </h2>
              <p className="text-gray-600 leading-relaxed">
                To become the most trusted and innovative medical equipment
                solutions provider in the region, setting new standards in
                quality, reliability, and customer service while making advanced
                healthcare technology accessible to all.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </motion.div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>
            {timeline.map((item, index) => <motion.div key={item.year} className={`relative mb-12 ${index % 2 === 0 ? 'md:ml-auto md:pl-8' : 'md:mr-auto md:pr-8'} md:w-1/2`} initial={{
            opacity: 0,
            x: index % 2 === 0 ? 50 : -50
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6
          }}>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="absolute top-6 -left-3 md:left-auto md:right-0 w-6 h-6 bg-blue-600 rounded-full transform md:translate-x-1/2"></div>
                  <span className="text-blue-600 font-bold text-xl mb-2 block">
                    {item.year}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </motion.div>)}
          </div>
        </div>
      </section>
      {/* Team Section */}
      {/* <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Leadership Team
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => <motion.div key={member.name} className="bg-white rounded-xl shadow-lg overflow-hidden" initial={{
            opacity: 0,
            y: 50
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            delay: index * 0.2
          }}>
                <img src={member.image} alt={member.name} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </motion.div>)}
          </div>
        </div>
      </section> */}
      {/* Enhanced Stats Section */}
      <section className="py-20 bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div className="text-center" initial={{
            opacity: 0,
            scale: 0.5
          }} whileInView={{
            opacity: 1,
            scale: 1
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6
          }}>
              <div className="text-5xl font-bold mb-2">14+</div>
              <div className="text-blue-200">Years Experience</div>
            </motion.div>
            <motion.div className="text-center" initial={{
            opacity: 0,
            scale: 0.5
          }} whileInView={{
            opacity: 1,
            scale: 1
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            delay: 0.2
          }}>
              <div className="text-5xl font-bold mb-2">5000+</div>
              <div className="text-blue-200">Products Delivered</div>
            </motion.div>
            <motion.div className="text-center" initial={{
            opacity: 0,
            scale: 0.5
          }} whileInView={{
            opacity: 1,
            scale: 1
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            delay: 0.4
          }}>
              <div className="text-5xl font-bold mb-2">350+</div>
              <div className="text-blue-200">Global Manufacturers</div>
            </motion.div>
            <motion.div className="text-center" initial={{
            opacity: 0,
            scale: 0.5
          }} whileInView={{
            opacity: 1,
            scale: 1
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            delay: 0.6
          }}>
              <div className="text-5xl font-bold mb-2">20+</div>
              <div className="text-blue-200">Global Partners</div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Certifications Section with Animation */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Certifications
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We maintain the highest standards of quality and compliance in the
              medical equipment industry, ensuring our clients receive only the
              best products and services.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[{
            icon: AwardIcon,
            title: 'ISO 13485',
            desc: 'Medical Devices Quality Management'
          }, {
            icon: ClipboardCheckIcon,
            title: 'CE Marking',
            desc: 'European Conformity Standards'
          }, {
            icon: ShieldCheckIcon,
            title: 'FDA Registered',
            desc: 'US Quality Standards'
          }, {
            icon: GlobeIcon,
            title: 'PMDA Certified',
            desc: 'Pakistan Medical Devices Authority'
          }].map((cert, index) => <motion.div key={cert.title} className="bg-gray-50 p-6 rounded-xl border border-gray-200" initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            delay: index * 0.1
          }}>
                <cert.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
                  {cert.title}
                </h3>
                <p className="text-gray-600 text-sm text-center">{cert.desc}</p>
              </motion.div>)}
          </div>
        </div>
      </section>
    </div>;
};
export default About;