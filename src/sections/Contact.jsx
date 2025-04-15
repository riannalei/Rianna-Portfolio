import emailjs from '@emailjs/browser';
import { useRef, useState, useEffect } from 'react';

import useAlert from '../hooks/useAlert.js';
import Alert from '../components/Alert.jsx';
import PageTransition from '../components/PageTransition.jsx';

const Contact = () => {
  const formRef = useRef();
  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ from_name: '', reply_to: '', message: '' });

  useEffect(() => {
    emailjs.init(import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY);
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
      <section className="min-h-screen w-full bg-white pt-32 px-4 sm:px-6" id="contact">
        {alert.show && <Alert {...alert} />}

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 gap-16">
            {/* Left Side - Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-5xl font-medium text-gray-900 mb-4">Let's Connect</h2>
                <p className="text-lg text-gray-600">
                  I am actively seeking a software engineering internship where I can apply my skills in full-stack development and problem-solving.
                </p>
              </div>

              <div className="flex items-center gap-4">
                <a 
                  href="https://github.com/riannalei" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 hover:bg-[#B7C4AC] transition-colors group"
                >
                  <img src="/assets/github.svg" alt="GitHub" className="w-5 h-5 brightness-0 opacity-60 group-hover:brightness-0 group-hover:invert" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/rianna-lei-6b6664216/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 hover:bg-[#B7C4AC] transition-colors group"
                >
                  <img src="/assets/linkedin.svg" alt="LinkedIn" className="w-5 h-5 brightness-0 opacity-60 group-hover:brightness-0 group-hover:invert" />
                </a>
              </div>

            </div>

            {/* Right Side - Contact Form */}
            <div className="bg-gray-50 rounded-lg p-8 border border-gray-100">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-gray-900 font-medium">Full Name</label>
                  <input
                    type="text"
                    name="from_name"
                    value={form.from_name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#B7C4AC] focus:ring-1 focus:ring-[#B7C4AC] outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-gray-900 font-medium">Email Address</label>
                  <input
                    type="email"
                    name="reply_to"
                    value={form.reply_to}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#B7C4AC] focus:ring-1 focus:ring-[#B7C4AC] outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-gray-900 font-medium">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#B7C4AC] focus:ring-1 focus:ring-[#B7C4AC] outline-none transition-colors resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-[#B7C4AC] text-gray-900 py-3 px-6 rounded-lg font-medium hover:bg-[#95a68b] transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                  <img src="/assets/arrow-right.png" alt="arrow" className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Contact;