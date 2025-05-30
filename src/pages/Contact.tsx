import React, { useState, useRef, useEffect } from 'react';
import { MapPinIcon, PhoneIcon, MailIcon, ClockIcon, SendIcon } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useLocation } from 'react-router-dom';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_CONTACT_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

interface LocationState {
  message?: string;
  subject?: string;
}

const Contact: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState;
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: state?.subject || '',
    message: state?.message || ''
  });

  // Update form data when state changes
  useEffect(() => {
    if (state?.message || state?.subject) {
      setFormData(prev => ({
        ...prev,
        subject: state.subject || prev.subject,
        message: state.message || prev.message
      }));
    }
  }, [state]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const templateParams = {
        to_email: 'info@gmpol.com',
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_CONTACT_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      setSubmitStatus({
        type: 'success',
        message: 'Your message has been sent successfully! We will get back to you soon.'
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send your message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="relative bg-blue-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Get in touch with our team of medical equipment experts. We're
              here to help you find the right solutions.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{
        clipPath: 'polygon(0 100%, 100% 0, 100% 100%, 0% 100%)'
      }}></div>
      </section>
      {/* Contact Information */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Send Us a Message
              </h2>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {submitStatus.type && (
                  <div
                    className={`p-4 rounded-md ${
                      submitStatus.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                    }`}
                  >
                    {submitStatus.message}
                  </div>
                )}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input type="text" id="name" value={formData.name} onChange={e => setFormData({
                  ...formData,
                  name: e.target.value
                })} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input type="email" id="email" value={formData.email} onChange={e => setFormData({
                    ...formData,
                    email: e.target.value
                  })} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" required />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input type="tel" id="phone" value={formData.phone} onChange={e => setFormData({
                    ...formData,
                    phone: e.target.value
                  })} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input type="text" id="subject" value={formData.subject} onChange={e => setFormData({
                  ...formData,
                  subject: e.target.value
                })} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" required />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea id="message" rows={4} value={formData.message} onChange={e => setFormData({
                  ...formData,
                  message: e.target.value
                })} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" required />
                </div>
                <button type="submit" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" disabled={isSubmitting}>
                  <SendIcon className="h-5 w-5 mr-2" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Get in Touch
              </h2>
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPinIcon className="h-6 w-6 text-blue-600 mt-1" />
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Karachi Office
                      </h3>
                      <div>
                        <p className="text-gray-600">18-C 24th Commercial Street</p>
                        <p className="text-gray-600">Phase-II, (EXT) DHA</p>
                        <p className="text-gray-600">Karachi, Pakistan</p>
                        <p className="text-gray-600 mt-4">
                          Phone: +92 21 111-111-111<br />
                          Email: info@gmpol.com
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPinIcon className="h-6 w-6 text-blue-600 mt-1" />
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        USA Office
                      </h3>
                      <p className="text-gray-600">1047 Dutch Mill Drive</p>
                      <p className="text-gray-600">Ballwin, Missouri</p>
                      <p className="text-gray-600">USA 63011</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <PhoneIcon className="h-6 w-6 text-blue-600 mt-1" />
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Phone Number
                      </h3>
                      <p className="text-gray-600">03362143469</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MailIcon className="h-6 w-6 text-blue-600 mt-1" />
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Email Address
                      </h3>
                      <p className="text-gray-600">info@gmpol.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <ClockIcon className="h-6 w-6 text-blue-600 mt-1" />
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Business Hours
                      </h3>
                      <p className="text-gray-600">
                        Monday - Saturday: 9:00 AM - 6:00 PM
                      </p>
                      <p className="text-gray-600">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Map */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-100 rounded-lg overflow-hidden h-[250px] relative">
                  <iframe 
                    title="GMPOL Karachi Location" 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.9349448484954!2d67.06898187559655!3d24.83189827794792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33c6a8da39701%3A0x63f6458e150ad341!2s18c%2024th%20Commercial%20St%2C%20Phase%202%20Commercial%20Area%20Defence%20Housing%20Authority%2C%20Karachi%2C%2075500%2C%20Pakistan!5e0!3m2!1sen!2s!4v1748427309117!5m2!1sen!2s" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="bg-gray-100 rounded-lg overflow-hidden h-[250px] relative">
                  <iframe 
                    title="GMPOL USA Location" 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3118.1234567890123!2d-90.5481234!3d38.5951234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87df2e5f1f5f5f5f%3A0x1234567890abcdef!2s1047%20Dutch%20Mill%20Dr%2C%20Ballwin%2C%20MO%2063011!5e0!3m2!1sen!2sus!4v1659942444781!5m2!1sen!2sus" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>;
};
export default Contact;