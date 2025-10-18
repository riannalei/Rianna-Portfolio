import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CreativeButton = ({ children, isActive, onClick, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden px-8 py-3 rounded-full font-body font-medium uppercase tracking-wide border-2 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Background that slides in from left */}
      <motion.div
        className="absolute inset-0 bg-[#B7C4AC]"
        initial={{ x: '-100%' }}
        animate={{ 
          x: isActive || isHovered ? '0%' : '-100%'
        }}
        transition={{ 
          type: "tween", 
          ease: [0.76, 0, 0.24, 1], 
          duration: 0.5 
        }}
      />
      
      {/* Border */}
      <div className={`absolute inset-0 rounded-full border-2 ${
        isActive || isHovered ? 'border-[#B7C4AC]' : 'border-gray-200'
      } transition-colors duration-300`} />
      
      {/* Text with color transition */}
      <motion.span
        className="relative z-10"
        animate={{
          color: isActive || isHovered ? '#ffffff' : '#111827'
        }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.span>
      
      {/* Subtle shine effect */}
      {(isHovered || isActive) && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 2
          }}
        />
      )}
    </motion.button>
  );
};

export default CreativeButton;