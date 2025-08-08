import emailjs from '@emailjs/browser';
import { useRef, useState, useEffect } from 'react';
import { FiArrowRight } from 'react-icons/fi';

import useAlert from '../hooks/useAlert.js';
import Alert from '../components/Alert.jsx';
import PageTransition from '../components/PageTransition.jsx';
import PerspectiveText from '../components/PerspectiveText.jsx';
import AnimatedForm from '../components/AnimatedForm.jsx';
import MouseImageDistortion from '../components/MouseImageDistortion.jsx';
import MagneticButton from '../components/MagneticButton.jsx';

const Contact = () => {
  const formRef = useRef();
  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ from_name: '', reply_to: '', message: '' });

  useEffect(() => {
    try {
      emailjs.init(import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY);
    } catch (error) {
      console.error('Failed to initialize EmailJS:', error);
      showAlert({
        show: true,
        text: 'Failed to initialize email service. Please try again later.',
        type: 'error',
      });
    }
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
      )
      .then(
        () => {
          setLoading(false);
          showAlert({
            show: true,
            text: 'Thank you for your message 😃',
            type: 'success',
          });

          setTimeout(() => {
            hideAlert(false);
            setForm({
              from_name: '',
              reply_to: '',
              message: '',
            });
          }, [3000]);
        },
        (error) => {
          setLoading(false);
          console.error(error);
          showAlert({
            show: true,
            text: "I didn't receive your message 😢",
            type: 'danger',
          });
        },
      );
  };

  return (
    <PageTransition>
      <section className="min-h-screen flex items-center justify-center w-full bg-white px-4 sm:px-6 py-16 md:py-0" id="contact">
        <div className="max-w-[1200px] w-full mx-auto">
          {alert.show && <Alert {...alert} />}

          {/* Header */}
          <div className="text-center mb-16">
            <PerspectiveText 
              text="LET'S CONNECT"
              className="text-3xl pixel-title text-gray-900 mb-4"
              triggerOnScroll={true}
            />
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              I'm actively seeking software engineering opportunities where I can apply my skills in full-stack development and problem-solving.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Side - Contact Info */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg pixel-title text-gray-900 mb-4">GET IN TOUCH</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  I'm passionate about creating innovative solutions and would love to discuss how I can contribute to your team.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#B7C4AC] rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <a href="mailto:rxlei@calpoly.edu" className="text-[#B7C4AC] hover:text-[#95a68b] transition-colors">
                        rxlei@calpoly.edu
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#B7C4AC] rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Location</p>
                      <p className="text-gray-600">San Luis Obispo, CA</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <MouseImageDistortion className="w-12 h-12 rounded-full overflow-hidden bg-gray-50 hover:bg-[#B7C4AC] transition-colors group">
                  <a 
                    href="https://github.com/riannalei" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full h-full flex items-center justify-center"
                    data-cursor-hover
                  >
                    <img src="/assets/github.svg" alt="GitHub" className="w-6 h-6 brightness-0 opacity-60 group-hover:brightness-0 group-hover:invert" />
                  </a>
                </MouseImageDistortion>
                
                <MouseImageDistortion className="w-12 h-12 rounded-full overflow-hidden bg-gray-50 hover:bg-[#B7C4AC] transition-colors group">
                  <a 
                    href="https://www.linkedin.com/in/rianna-lei-6b6664216/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full h-full flex items-center justify-center"
                    data-cursor-hover
                  >
                    <img src="/assets/linkedin.svg" alt="LinkedIn" className="w-6 h-6 brightness-0 opacity-60 group-hover:brightness-0 group-hover:invert" />
                  </a>
                </MouseImageDistortion>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div>
              <AnimatedForm formRef={formRef} onSubmit={handleSubmit}>
                <div className="form-element">
                  <label htmlFor="from_name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="from_name"
                    value={form.from_name}
                    onChange={handleChange}
                    placeholder="What's your name?"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#B7C4AC] focus:ring-2 focus:ring-[#B7C4AC] focus:ring-opacity-20 outline-none transition-all bg-white"
                    required
                  />
                </div>

                <div className="form-element">
                  <label htmlFor="reply_to" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="reply_to"
                    value={form.reply_to}
                    onChange={handleChange}
                    placeholder="What's your email?"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#B7C4AC] focus:ring-2 focus:ring-[#B7C4AC] focus:ring-opacity-20 outline-none transition-all bg-white"
                    required
                  />
                </div>

                <div className="form-element">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="What do you want to say?"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#B7C4AC] focus:ring-2 focus:ring-[#B7C4AC] focus:ring-opacity-20 outline-none transition-all resize-none h-32 bg-white"
                    required
                  />
                </div>

                <MagneticButton 
                  className="submit-button w-full bg-[#B7C4AC] text-white py-4 px-6 rounded-lg font-medium hover:bg-[#95a68b] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                  intensity={0.8}
                  disabled={loading}
                  type="submit"
                >
                  <span className="flex items-center gap-2">
                    {loading ? 'Sending...' : 'Send Message'}
                    <FiArrowRight className={`w-5 h-5 transition-transform ${loading ? '' : 'group-hover:translate-x-1'}`} />
                  </span>
                </MagneticButton>
              </AnimatedForm>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Contact;