import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Curve() {
    const [dimensions, setDimensions] = useState({ width: 100, height: 100 });

    useEffect(() => {
        const updateDimensions = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        // Set initial dimensions
        updateDimensions();

        // Update on resize
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    const { height } = dimensions;

    const initialPath = `M0 0 L0 ${height} Q-100 ${height/2} 0 0`;
    const targetPath = `M0 0 L0 ${height} Q100 ${height/2} 0 0`;

    const curve = {
        initial: {
            d: initialPath
        },
        enter: {
            d: targetPath,
            transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
        },
        exit: {
            d: initialPath,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
        }
    };

    return (
        <svg 
            className="absolute top-0 right-0 w-[100px] h-full pointer-events-none"
            style={{ 
                zIndex: 1
            }}
            width="100"
            height={height}
            viewBox={`0 0 100 ${height}`}
            fill="none"
        >
            <motion.path 
                variants={curve} 
                initial="initial" 
                animate="enter" 
                exit="exit"
                fill="#B7C4AC"
                stroke="none"
            />
        </svg>
    );
}