import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '../constants/index.js';
import { useState } from 'react';

const Navigation = () => {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            {/* Desktop Sidebar */}
            <nav className="w-32 fixed left-0 top-0 h-screen items-center bg-white hidden md:flex z-30">
                <div className="p-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.id}
                            to={link.href.replace('#', '')}
                            className="relative group block mb-6"
                        >
                            <span className={`text-2xl font-semibold transition-colors duration-300 ${
                                location.pathname === link.href.replace('#', '') 
                                    ? 'text-[#B7C4AC]' 
                                    : 'text-gray-900 hover:text-[#B7C4AC]'
                            }`}>
                                {link.name}
                            </span>
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

            {/* Mobile Slide-in Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.nav
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 flex flex-col p-8 md:hidden"
                        role="dialog"
                        aria-modal="true"
                    >
                        <button
                            className="self-end mb-8 text-3xl text-gray-400 hover:text-[#B7C4AC] focus:outline-none"
                            aria-label="Close menu"
                            onClick={() => setMenuOpen(false)}
                        >
                            &times;
                        </button>
                        {navLinks.map((link) => (
                            <Link
                                key={link.id}
                                to={link.href.replace('#', '')}
                                className={`block mb-8 text-2xl font-medium ${
                                    location.pathname === link.href.replace('#', '')
                                        ? 'text-[#B7C4AC]'
                                        : 'text-gray-900 hover:text-[#B7C4AC]'
                                }`}
                                onClick={() => setMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
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