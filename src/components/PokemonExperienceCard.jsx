import { useState } from 'react';
import { motion } from 'framer-motion';
import HolographicCard from './HolographicCard.jsx';

const PokemonExperienceCard = ({ item, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Placeholder Pokemon card image - user will provide these
  const pokemonCardImage = item.pokemonCard || '/assets/flaffy.jpg';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.33, 1, 0.68, 1] }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className="w-full mx-auto"
    >
      <motion.div
        animate={{ 
          y: [0, -6, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.3
        }}
        className="relative w-full aspect-[5/7] group cursor-pointer"
        style={{ 
          perspective: '1200px', 
          WebkitPerspective: '1200px', 
          background: 'transparent' 
        }}
        onClick={() => setIsFlipped((v) => !v)}
        role="button"
        aria-label={`Flip ${item.name} experience card`}
      >
        {/* Click to interact hint */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[#B7C4AC] hover:text-[#8A9B7E] text-sm font-light whitespace-nowrap transition-colors duration-300 opacity-0 group-hover:opacity-100 font-body">
          Click to flip
        </div>
        
        {/* 3D flip container */}
        <div 
          className="relative w-full h-full"
          style={{ 
            transformStyle: 'preserve-3d', 
            WebkitTransformStyle: 'preserve-3d', 
            overflow: 'visible', 
            background: 'transparent' 
          }}
        >
          {/* Front - Pokemon Card */}
          <div
            className="absolute inset-0"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: isFlipped ? 'rotateY(180deg) translateZ(0.1px)' : 'rotateY(0deg) translateZ(0.1px)',
              transition: 'transform 1000ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
              willChange: 'transform',
              overflow: 'visible',
              background: 'transparent'
            }}
          >
            <HolographicCard 
              src={pokemonCardImage}
              alt={`${item.name} Pokemon Card`}
              isFlipped={!isFlipped}
            />
          </div>

          {/* Back - Experience Details */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl"
            style={{
              transform: isFlipped ? 'rotateY(0deg) translateZ(0.1px)' : 'rotateY(180deg) translateZ(0.1px)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transition: 'transform 1000ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
              willChange: 'transform',
              background: '#FFFFFF'
            }}
          >
            <div className="w-full h-full p-6 flex flex-col text-left">
              {/* Logo & Header - Horizontal Layout - Fixed Height */}
              <div className="flex items-start gap-3 mb-3 min-h-[72px]">
                {/* Company Logo */}
                {item.logo && (
                  <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center">
                    <img 
                      src={item.logo} 
                      alt={`${item.name} logo`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}

                {/* Company Name & Title */}
                <div className="flex-1">
                  <h3 className="text-base font-bold text-gray-900 mb-0.5 font-heading leading-tight">{item.name}</h3>
                  <p className="text-xs font-semibold text-gray-800 font-body leading-tight">{item.pos}</p>
                </div>
              </div>
              
              {/* Time & Location - Fixed Height */}
              <div className="space-y-0.5 mb-3 text-xs text-gray-600 font-body min-h-[36px]">
                <p>{item.duration}</p>
                {item.location && <p>{item.location}</p>}
              </div>

              {/* Short Description - Starts at same height */}
              <p className="text-xs leading-relaxed text-gray-700 font-body">
                {item.description}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PokemonExperienceCard;

