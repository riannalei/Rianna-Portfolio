import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedSkill = ({ src, alt, name }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Glowing background */}
      <motion.div
        className="absolute -inset-2 bg-gradient-to-r from-[#B7C4AC]/20 to-[#a5b399]/20 rounded-lg blur-sm"
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.1 : 0.8,
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Main container */}
      <motion.div
        className="relative bg-white p-4 rounded-lg shadow-sm border border-gray-100 overflow-hidden"
        animate={{
          borderColor: isHovered ? '#B7C4AC' : 'rgb(243 244 246)',
          boxShadow: isHovered 
            ? '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' 
            : '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Scanning line effect */}
        {isHovered && (
          <motion.div
            className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#B7C4AC] to-transparent"
            animate={{
              y: [0, 80, 0],
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
        
        {/* Icon container */}
        <div className="flex flex-col items-center space-y-3">
          <motion.div
            className="relative"
            animate={{
              rotateY: isHovered ? [0, 180, 360] : 0,
            }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src={src} 
              alt={alt} 
              className="w-12 h-12 object-contain"
            />
            
            {/* Pixel overlay effect */}
            {isHovered && (
              <motion.div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='2' height='2' viewBox='0 0 2 2' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h1v1H0V0z' fill='%23B7C4AC'/%3E%3C/svg%3E")`,
                }}
                animate={{
                  opacity: [0.1, 0.4, 0.1],
                }}
                transition={{ duration: 0.6, repeat: Infinity }}
              />
            )}
          </motion.div>
          
          {/* Skill name */}
          <motion.span
            className="text-sm font-mono text-gray-700 text-center"
            animate={{
              color: isHovered ? '#B7C4AC' : 'rgb(55 65 81)',
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            {name}
          </motion.span>
        </div>
        
        {/* Corner accents */}
        {isHovered && (
          <>
            <motion.div
              className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-[#B7C4AC]"
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-[#B7C4AC]"
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
            />
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default AnimatedSkill;