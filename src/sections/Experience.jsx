import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { workExperiences } from '../constants/index.js';
import { AnimatedTextWords } from '../components/AnimatedText.jsx';
import PokemonExperienceCard from '../components/PokemonExperienceCard.jsx';

const Experience = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });

  // Filter to only show the 5 main experiences (including Twitch)
  const featuredExperiences = workExperiences.filter(exp => 
    exp.id === 0 || // Twitch
    exp.id === 1 || exp.id === 2 || exp.id === 3 || exp.id === 4
  );

  // Fan out positions - cards spread from center
  const getFanPosition = (index, total) => {
    const centerIndex = (total - 1) / 2;
    const offset = index - centerIndex;
    return {
      x: offset * 220, // Horizontal spread
      rotate: offset * 8, // Rotation angle
      y: Math.abs(offset) * 15, // Slight arc - outer cards dip down
    };
  };

  return (
    <section id="experience" className="bg-gray-50 py-12 sm:py-20 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Title - Left aligned for consistency */}
        <motion.div 
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
          className="text-left mb-10 sm:mb-12 md:mb-16"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-3 sm:mb-4 font-heading"
          >
            <AnimatedTextWords text="Experience" />
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.4, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
            className="text-gray-600 text-base sm:text-lg max-w-2xl font-body"
          >
            My professional journey — tap each card to see what I did!
          </motion.p>
        </motion.div>

        {/* Pokemon Cards - Stacked Deck → Fan Out (Desktop) */}
        <div 
          ref={containerRef}
          className="hidden lg:flex justify-center items-center pb-16 relative"
          style={{ height: '500px' }}
        >
          {featuredExperiences.map((item, index) => {
            const fanPos = getFanPosition(index, featuredExperiences.length);
            return (
              <motion.div
                key={item.id}
                initial={{ 
                  x: 0, 
                  y: 0, 
                  rotate: 0, 
                  scale: 1,
                }}
                animate={isInView ? {
                  x: fanPos.x,
                  y: fanPos.y,
                  rotate: fanPos.rotate,
                  scale: 1,
                } : {
                  x: 0,
                  y: -index * 4, // Slight stack offset
                  rotate: index * 2 - 4, // Slight messy stack
                  scale: 1,
                }}
                transition={{ 
                  duration: 0.8,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 80,
                  damping: 15
                }}
                whileHover={{ 
                  y: fanPos.y - 30,
                  scale: 1.08,
                  rotate: 0,
                  zIndex: 20,
                  transition: { duration: 0.3 }
                }}
                className="absolute w-[200px] xl:w-[220px] cursor-pointer"
                style={{ 
                  zIndex: featuredExperiences.length - Math.abs(index - 2),
                }}
              >
                <PokemonExperienceCard item={item} index={index} />
              </motion.div>
            );
          })}
        </div>

        {/* Pokemon Cards - Mobile/Tablet Horizontal Scroll */}
        <div className="lg:hidden pb-6">
          <div className="overflow-x-auto -mx-4 px-4 scrollbar-hide">
            <div className="flex gap-4 sm:gap-5 w-max py-4">
              {featuredExperiences.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false, margin: "-30px" }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="w-[220px] sm:w-[250px] flex-shrink-0"
                >
                  <PokemonExperienceCard item={item} index={index} />
                </motion.div>
              ))}
            </div>
          </div>
          <p className="text-center text-gray-400 text-sm mt-2 font-body">← Swipe to explore →</p>
        </div>
      </div>
    </section>
  );
};

export default Experience;
