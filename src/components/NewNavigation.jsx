import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Menu from './Menu';

const NewNavigation = () => {
    const [showRL, setShowRL] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Hide RL when scrolling down past 100px
            if (currentScrollY > 100) {
                setShowRL(false);
            } else {
                setShowRL(true);
            }
            
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <>
            {/* RL Logo - Fades on scroll */}
            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: showRL ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="fixed top-6 left-6 sm:top-8 sm:left-8 z-40"
            >
                <button 
                    onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xl sm:text-2xl font-bold text-gray-900 hover:text-[#B7C4AC] transition-colors font-heading"
                >
                    RL
                </button>
            </motion.div>

            {/* Menu - Awwwards style on desktop, hamburger on mobile */}
            <Menu />
        </>
    );
};

export default NewNavigation;

