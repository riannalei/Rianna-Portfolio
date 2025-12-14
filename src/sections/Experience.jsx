import { motion } from 'framer-motion';
import { workExperiences } from '../constants/index.js';
import { AnimatedTextWords } from '../components/AnimatedText.jsx';
import PokemonExperienceCard from '../components/PokemonExperienceCard.jsx';

const Experience = () => {
  // Filter to only show the 5 main experiences (including Twitch)
  const featuredExperiences = workExperiences.filter(exp => 
    exp.id === 0 || exp.id === 1 || exp.id === 2 || exp.id === 3 || exp.id === 4
  );

  return (
    <section id="experience" className="bg-gray-50 py-12 sm:py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Title */}
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

        {/* Pokemon Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8 lg:gap-6 pb-8 sm:pb-12">
          {featuredExperiences.map((item, index) => (
            <PokemonExperienceCard
              key={item.id}
              item={item}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
