import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { navLinks } from '../constants/index.js';

const Navigation = () => {
    const location = useLocation();
    
    return (
        <nav className="w-32 fixed left-0 top-0 h-screen flex items-center bg-white">
            <div className="p-8">
                {navLinks.map((link) => (
                    <Link
                        key={link.id}
                        to={link.href.replace('#', '')}
                        className="relative group block mb-6"
                    >
                        <span className={`text-2xl transition-colors duration-300 ${
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
    );
};

export default Navigation; 