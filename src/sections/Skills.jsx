import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { motion } from 'framer-motion';
import { mySkills } from '../constants/index.js';
import { AnimatedTextWords } from '../components/AnimatedText.jsx';
import RamenStall from '../components/RamenStall.jsx';
import RamenBowl from '../components/RamenBowl.jsx';
import CanvasLoader from '../components/Loading.jsx';

const Skills = () => {
    const [ramenBowls, setRamenBowls] = useState([]);

    const handleRamenStallClick = () => {
        // Add a new ramen bowl with a unique ID
        const newBowl = {
            id: Date.now() + Math.random(),
            position: [0, 0, 0] // Will be randomized in the RamenBowl component
        };
        setRamenBowls(prev => [...prev, newBowl]);
    };

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

                {/* Two Column Layout: Ramen Stall + Skills */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    
                    {/* LEFT: Ramen Stall */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                        className="h-[600px] w-full relative"
                    >
                        <Canvas className="w-full h-full">
                            <Suspense fallback={<CanvasLoader />}>
                                <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
                                <ambientLight intensity={3} />
                                <directionalLight position={[5, 5, 5]} intensity={2} />
                                <directionalLight position={[-5, 5, 3]} intensity={1.5} />
                                <pointLight position={[0, 2, 3]} intensity={2} color="#FFD700" />
                                
                                <RamenStall
                                    scale={0.3}
                                    position={[0, -1, 0]}
                                    rotation={[0, 0.5, 0]}
                                    onClick={handleRamenStallClick}
                                />
                                
                                {/* Spawned ramen bowls */}
                                {ramenBowls.map(bowl => (
                                    <RamenBowl
                                        key={bowl.id}
                                        position={bowl.position}
                                    />
                                ))}
                            </Suspense>
                        </Canvas>
                        
                        {/* Click me text */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ 
                                opacity: [0.6, 1, 0.6],
                            }}
                            transition={{ 
                                opacity: { repeat: Infinity, duration: 2 }
                            }}
                            className="absolute top-4 left-1/2 transform -translate-x-1/2 text-[#8A9B7E] text-xs font-medium tracking-wider pointer-events-none"
                        >
                            CLICK ME
                        </motion.div>
                    </motion.div>

                    {/* RIGHT: Skills Grid */}
                    <div className="grid grid-cols-1 gap-10">
                    {mySkills.map((skillCategory, categoryIndex) => (
                        <motion.div
                            key={skillCategory.category}
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: false, margin: "-50px" }}
                            transition={{ duration: 0.8, delay: categoryIndex * 0.15, ease: [0.33, 1, 0.68, 1] }}
                            className="space-y-4"
                        >
                            {/* Category Title */}
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                {skillCategory.category}
                            </h3>
                            
                            {/* Skills */}
                            <div className="flex flex-wrap gap-2.5 items-center">
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
                                        <div className="px-5 py-2.5 bg-[#B7C4AC] bg-opacity-20 text-[#8A9B7E] rounded-full text-sm font-medium cursor-default transition-all hover:bg-opacity-30 hover:shadow-sm">
                                            {skill.name}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;

