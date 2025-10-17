import emailjs from '@emailjs/browser';
import { useRef, useState, useEffect } from 'react';
import { FiArrowRight } from 'react-icons/fi';

import useAlert from '../hooks/useAlert.js';
import Alert from '../components/Alert.jsx';
import PageTransition from '../components/PageTransition.jsx';
import AnimatedForm from '../components/AnimatedForm.jsx';
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
      <section className="min-h-screen flex items-center justify-center w-full bg-white px-4 sm:px-6 py-16 md:py-24" id="contact">
        <div className="max-w-[900px] w-full mx-auto">
          {alert.show && <Alert {...alert} />}

          {/* Contact Form */}
          <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-sm border border-gray-100">
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
      </section>
    </PageTransition>
  );
};

export default Contact;