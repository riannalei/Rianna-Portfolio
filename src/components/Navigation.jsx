import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '../constants/index.js';
import { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineDocument } from 'react-icons/hi';

const Navigation = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    // Track active section based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            const sections = navLinks.map(link => ({
                id: link.href.replace('#', ''),
                element: document.querySelector(link.href)
            }));

            const scrollPosition = window.scrollY + 200;

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section.element && section.element.offsetTop <= scrollPosition) {
                    setActiveSection(section.id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Check initial position
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (href) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setMenuOpen(false);
    };

    return (
        <>
            {/* Fixed Header */}
            <nav className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4 flex items-center justify-between">
                    {/* Logo */}
                    <button 
                        onClick={() => scrollToSection('#home')}
                        className="text-2xl font-bold text-gray-900 pixel-title hover:text-[#B7C4AC] transition-colors"
                    >
                        RL
                    </button>

                    {/* Menu Button */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
                    >
                        MENU
                    </button>
                </div>
            </nav>

            {/* Fullscreen Menu Overlay */}
            <AnimatePresence mode="wait">
                {menuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-black/50 z-50"
                            onClick={() => setMenuOpen(false)}
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                            className="fixed top-0 right-0 w-full sm:w-[500px] h-full bg-white z-50 shadow-2xl"
                        >
                            <div className="flex flex-col h-full">
                                {/* Menu Header */}
                                <div className="flex justify-between items-center p-6 sm:p-8 border-b border-gray-200">
                                    <h3 className="text-2xl font-bold text-gray-900 pixel-title">Menu</h3>
                                    <button
                                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                                        onClick={() => setMenuOpen(false)}
                                        aria-label="Close menu"
                                    >
                                        <span className="text-3xl text-gray-600">&times;</span>
                                    </button>
                                </div>

                                {/* Navigation Links */}
                                <div className="flex-1 px-6 sm:px-8 py-8 overflow-y-auto">
                                    <div className="space-y-2">
                                        {navLinks.map((link, index) => (
                                            <motion.button
                                                key={link.id}
                                                initial={{ opacity: 0, x: 50 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ 
                                                    duration: 0.4, 
                                                    delay: index * 0.1,
                                                    ease: [0.76, 0, 0.24, 1]
                                                }}
                                                onClick={() => scrollToSection(link.href)}
                                                className={`w-full text-left px-6 py-4 rounded-lg text-2xl font-medium transition-all ${
                                                    activeSection === link.href.replace('#', '')
                                                        ? 'bg-[#B7C4AC] text-white'
                                                        : 'text-gray-700 hover:bg-gray-100'
                                                }`}
                                            >
                                                {link.name}
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>

                                {/* Social Links Footer */}
                                <div className="p-6 sm:p-8 border-t border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">Connect with me</span>
                                        <div className="flex items-center gap-4">
                                            <a
                                                href="https://github.com/riannalei"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#B7C4AC] transition-colors group"
                                                aria-label="GitHub"
                                            >
                                                <FaGithub className="text-gray-600 group-hover:text-white" size={20} />
                                            </a>
                                            <a
                                                href="https://www.linkedin.com/in/rianna-lei-6b6664216/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#B7C4AC] transition-colors group"
                                                aria-label="LinkedIn"
                                            >
                                                <FaLinkedin className="text-gray-600 group-hover:text-white" size={20} />
                                            </a>
                                            <a
                                                href="/Rianna_Lei_Resume.pdf"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#B7C4AC] transition-colors group"
                                                aria-label="Resume"
                                            >
                                                <HiOutlineDocument className="text-gray-600 group-hover:text-white" size={22} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navigation;
