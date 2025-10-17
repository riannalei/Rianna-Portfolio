import { motion, useScroll, useTransform } from 'framer-motion';
import { workExperiences } from '../constants/index.js';
import { useRef } from 'react';
import { AnimatedTextWords } from '../components/AnimatedText.jsx';

const ExperienceCard = ({ item, index, progress, range, targetScale }) => {
  const container = useRef(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-200px" }}
        transition={{ duration: 0.5, delay: index * 0.05, ease: [0.33, 1, 0.68, 1] }}
        style={{ 
          scale,
          top: `calc(-5vh + ${index * 25}px)`,
          backgroundColor: item.color || '#FFFFFF'
        }}
        className="relative w-full max-w-5xl mx-auto rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="h-auto min-h-[400px] p-6 sm:p-8 flex flex-col relative">
          {/* Decorative gradient orb */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gray-900 opacity-5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col h-full">
            {/* Header */}
            <div className="flex-shrink-0 mb-6">
              <h3 className="text-2xl sm:text-3xl font-light text-gray-900 mb-1">{item.name}</h3>
              <p className="text-lg text-gray-800 mb-1">{item.pos}</p>
              <p className="text-gray-700 font-light">{item.duration}</p>
              {item.location && (
                <p className="text-gray-600 text-sm mt-1">{item.location}</p>
              )}
            </div>

            {/* Description */}
            <div className="flex-shrink-0 mb-4">
              <p className="text-gray-800 text-base leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Achievements - Scrollable if needed */}
            {item.achievements && item.achievements.length > 0 && (
              <div className="flex-1 overflow-y-auto mb-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
                <ul className="space-y-2.5">
                  {item.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start text-gray-700">
                      <span className="text-gray-500 mr-3 mt-1 text-lg">◆</span>
                      <span className="text-sm leading-relaxed">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Experience = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  return (
    <section id="experience" className="bg-gray-50">
      {/* Section Title */}
      <div className="w-full bg-gray-50 pt-32 pb-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
            className="text-left"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.4, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
              className="text-5xl sm:text-6xl md:text-7xl font-light text-gray-900 mb-4"
            >
              <AnimatedTextWords text="Experience" />
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.4, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
              className="text-gray-600 text-lg max-w-2xl"
            >
              My professional journey and contributions to innovative projects
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Parallax Cards */}
      <div ref={container} className="relative px-4 sm:px-6 pb-20">
        {workExperiences.map((item, index) => {
          const targetScale = 1 - ((workExperiences.length - index) * 0.05);
          return (
            <ExperienceCard
              key={item.id}
              item={item}
              index={index}
              progress={scrollYProgress}
              range={[index * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Experience;
