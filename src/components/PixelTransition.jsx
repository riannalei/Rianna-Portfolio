import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const anim = {
    initial: {
        opacity: 1
    },
    open: (i) => ({
        opacity: 1,
        transition: { duration: 0, delay: 0.04 * i }
    }),
    closed: (i) => ({
        opacity: 0,
        transition: { duration: 0, delay: 0.04 * i }
    })
};

const PixelTransition = ({ isActive, dimensions }) => {
    const { width, height } = dimensions;
    
    // console.log('PixelTransition render:', { isActive, width, height });

    /**
     * Shuffles array in place (Fisher–Yates shuffle).
     * @param {Array} a items An array containing the items.
     */
    const shuffle = (a) => {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    };

    const getBlocks = () => {
        const blockSize = width * 0.05; // 5vw blocks
        const nbOfBlocks = Math.ceil(height / blockSize);
        const shuffledIndexes = shuffle([...Array(nbOfBlocks)].map((_, i) => i));
        
        return shuffledIndexes.map((randomIndex, index) => {
            return (
                <motion.div
                    key={index}
                    className="w-full pixel-block"
                    style={{ 
                        height: `${blockSize}px`,
                        backgroundColor: '#B7C4AC'
                    }}
                    variants={anim}
                    initial="initial"
                    animate={isActive ? "open" : "closed"}
                    custom={randomIndex}
                />
            );
        });
    };

    return (
        <div className="fixed inset-0 z-[60] flex pointer-events-none">
            {[...Array(20)].map((_, index) => {
                return (
                    <div key={index} className="flex flex-col" style={{ width: '5vw', height: '100vh' }}>
                        {getBlocks()}
                    </div>
                );
            })}
        </div>
    );
};

export default PixelTransition;