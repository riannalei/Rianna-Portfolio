import { motion } from 'framer-motion';
import { mySkills } from '../constants/index.js';
import { AnimatedTextWords } from '../components/AnimatedText.jsx';

const Skills = () => {
    return (
        <section id="skills" className="min-h-screen flex items-center justify-center w-full bg-white px-4 sm:px-6 py-20 sm:py-32">
            <div className="max-w-7xl w-full mx-auto">
                {/* Section Title */}
                <motion.div 
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                    className="text-left mb-16"
                >
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
              className="text-5xl sm:text-6xl md:text-7xl font-light text-gray-900 mb-4"
            >
              <AnimatedTextWords text="Skills & Technologies" />
            </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
                        className="text-gray-600 text-lg max-w-2xl"
                    >
                        A comprehensive toolkit of technologies I use to build innovative solutions
                    </motion.p>
                </motion.div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {mySkills.map((skillCategory, categoryIndex) => (
                        <motion.div
                            key={skillCategory.category}
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: false, margin: "-50px" }}
                            transition={{ duration: 0.8, delay: categoryIndex * 0.15, ease: [0.33, 1, 0.68, 1] }}
                            className="space-y-6"
                        >
                            {/* Category Title */}
                            <h3 className="text-2xl font-semibold text-gray-900 mb-6 pb-2 border-b-2 border-[#B7C4AC]">
                                {skillCategory.category}
                            </h3>
                            
                            {/* Skills */}
                            <div className="flex flex-wrap gap-3">
                                {skillCategory.skills.map((skill, index) => (
                                    <motion.div
                                        key={skill.name}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: false }}
                                        whileHover={{ 
                                            scale: 1.1,
                                            transition: { duration: 0.2 }
                                        }}
                                        transition={{ 
                                            duration: 0.4, 
                                            delay: (categoryIndex * 0.1) + (index * 0.05)
                                        }}
                                        className="group relative"
                                    >
                                        <div className="px-4 py-2 bg-[#B7C4AC] bg-opacity-20 text-[#8A9B7E] rounded-full text-sm font-medium cursor-pointer transition-all hover:bg-opacity-30">
                                            {skill.name}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;

