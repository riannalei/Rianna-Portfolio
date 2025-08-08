import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '../constants/index.js';
import { useState, useRef } from 'react';
import Text3D from './Text3D.jsx';
import Curve from './Curve.jsx';

const Navigation = () => {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const navPlane = useRef(null);
    const maxRotate = 15;

    const manageMouseMove = (e) => {
        if (!navPlane.current) return;
        
        const rect = navPlane.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const perspective = 800;
        const rotateX = maxRotate * x - maxRotate / 2;
        const rotateY = (maxRotate * y - maxRotate / 2) * -1;
        
        navPlane.current.style.transform = `perspective(${perspective}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg)`;
    };

    const resetTransform = () => {
        if (navPlane.current) {
            navPlane.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
        }
    };

    return (
        <>
            {/* Desktop Sidebar */}
            <nav 
                className="w-32 fixed left-0 top-0 h-screen items-center bg-white hidden md:flex z-30"
                onMouseMove={manageMouseMove}
                onMouseLeave={resetTransform}
            >
                <div ref={navPlane} className="p-8 transition-transform duration-300">
                    {navLinks.map((link) => (
                        <Link
                            key={link.id}
                            to={link.href.replace('#', '')}
                            className="relative group block mb-8"
                        >
                            <Text3D 
                                primary={link.name}
                                secondary={link.name}
                                className="nav-text3d text-lg"
                            />
                            {location.pathname === link.href.replace('#', '') && (
                                <motion.div
                                    layoutId="navIndicator"
                                    className="absolute -left-4 top-1/2 w-2 h-2 bg-[#B7C4AC] rounded-full"
                                    transition={{
                                        type: "spring",
                                        stiffness: 350,
                                        damping: 25
                                    }}
                                />
                            )}
                        </Link>
                    ))}
                </div>
            </nav>

            {/* Mobile Hamburger */}
            <button
                className="fixed top-6 left-4 z-40 flex flex-col justify-center items-center w-10 h-10 md:hidden bg-white rounded-full shadow-md"
                aria-label="Open menu"
                onClick={() => setMenuOpen(true)}
            >
                <span className="block w-6 h-0.5 bg-[#B7C4AC] mb-1 rounded"></span>
                <span className="block w-6 h-0.5 bg-[#B7C4AC] mb-1 rounded"></span>
                <span className="block w-6 h-0.5 bg-[#B7C4AC] rounded"></span>
            </button>

            {/* Mobile Curved Menu */}
            <AnimatePresence mode="wait">
                {menuOpen && (
                    <motion.nav
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed top-0 left-0 w-80 h-full bg-[#B7C4AC] z-50 flex flex-col md:hidden"
                        role="dialog"
                        aria-modal="true"
                    >
                        <Curve />
                        
                        <div className="flex flex-col h-full">
                            {/* Header */}
                            <div className="flex justify-between items-center p-8 pb-4">
                                <h3 className="text-white font-semibold text-sm tracking-wider">NAVIGATION</h3>
                                <button
                                    className="text-2xl text-white hover:text-gray-200 focus:outline-none transition-colors"
                                    aria-label="Close menu"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    &times;
                                </button>
                            </div>

                            {/* Navigation Links */}
                            <div className="flex-1 px-8">
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        key={link.id}
                                        initial={{ x: 80, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: 80, opacity: 0 }}
                                        transition={{ 
                                            duration: 0.8, 
                                            delay: 0.1 * index,
                                            ease: [0.76, 0, 0.24, 1]
                                        }}
                                        className="relative mb-8"
                                    >
                                        <Link
                                            to={link.href.replace('#', '')}
                                            className="block text-white hover:text-gray-200 transition-colors text-3xl font-light"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                        {location.pathname === link.href.replace('#', '') && (
                                            <motion.div
                                                layoutId="mobile-indicator"
                                                className="absolute -left-4 top-1/2 w-2 h-2 bg-white rounded-full"
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 350,
                                                    damping: 25
                                                }}
                                            />
                                        )}
                                    </motion.div>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="p-8 pt-4">
                                <div className="flex flex-col space-y-3">
                                    <a 
                                        href="https://github.com/riannalei" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-white/80 hover:text-white text-sm transition-colors"
                                    >
                                        GitHub
                                    </a>
                                    <a 
                                        href="https://linkedin.com/in/rianna-lei" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-white/80 hover:text-white text-sm transition-colors"
                                    >
                                        LinkedIn
                                    </a>
                                    <a 
                                        href="mailto:rxlei@calpoly.edu"
                                        className="text-white/80 hover:text-white text-sm transition-colors"
                                    >
                                        Email
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>

            {/* Overlay when menu is open */}
            {menuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-20 z-40 md:hidden"
                    onClick={() => setMenuOpen(false)}
                    aria-hidden="true"
                />
            )}
        </>
    );
};

export default Navigation; 