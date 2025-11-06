import { motion } from 'framer-motion';
import { useState } from 'react';
import { AnimatedTextWords, AnimatedParagraph } from '../components/AnimatedText.jsx';
import HolographicCard from '../components/HolographicCard.jsx';

const About = () => {
    const [isFlipped, setIsFlipped] = useState(false);
    return (
        <section 
            id="about" 
            className="min-h-screen flex items-center justify-center w-full bg-gray-50 px-4 sm:px-6 py-12 sm:py-20"
        >
            <div className="max-w-6xl w-full mx-auto">
                {/* Section Title */}
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                    className="text-left mb-8 sm:mb-12"
                >
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 font-heading">
                        <AnimatedTextWords text="About Me" />
                    </h2>
                </motion.div>

                {/* Content */}
                <div className="flex flex-col lg:flex-row gap-10 sm:gap-12 lg:gap-12 items-center lg:items-start justify-center">
                    {/* Left Side - Image */}
                    <motion.div 
                        initial={{ opacity: 0, x: -40, scale: 0.95 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
                        className="w-full lg:w-[320px] flex flex-col items-center lg:items-start gap-4 lg:-ml-8 mb-4 sm:mb-0"
                    >
                        <div className="relative pb-12 sm:pb-0">
                            <div 
                                className="relative w-[260px] h-[363px] sm:w-[280px] sm:h-[390px] lg:w-[320px] lg:h-[446px] group cursor-pointer"
                                style={{ perspective: '1200px', WebkitPerspective: '1200px', background: 'transparent' }}
                                onClick={() => setIsFlipped((v) => !v)}
                                role="button"
                                aria-label="Flip profile image"
                            >
                                {/* Click to interact hint */}
                                <div className="absolute -bottom-10 sm:-bottom-10 left-1/2 -translate-x-1/2 text-[#B7C4AC] hover:text-[#8A9B7E] text-sm font-light whitespace-nowrap transition-colors duration-300">
                                    Click to interact
                                </div>
                                
                                {/* 3D flip container */}
                                <div 
                                    className="relative w-full h-full"
                                    style={{ transformStyle: 'preserve-3d', WebkitTransformStyle: 'preserve-3d', overflow: 'visible', background: 'transparent' }}
                                >
                                    {/* Front - Profile photo (no green overlay) */}
                                    <div
                                        className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg"
                                        style={{
                                            backfaceVisibility: 'hidden',
                                            WebkitBackfaceVisibility: 'hidden',
                                            transform: isFlipped ? 'rotateY(180deg) translateZ(0.1px)' : 'rotateY(0deg) translateZ(0.1px)',
                                            transition: 'transform 1000ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                                            willChange: 'transform'
                                        }}
                                    >
                                        <img
                                            src="/assets/rianna.jpeg"
                                            alt="Rianna Lei"
                                            loading="eager"
                                            decoding="async"
                                            className="block w-full h-full object-cover rounded-2xl"
                                        />
                                    </div>

                                    {/* Back - Flaffy Pokémon Card */}
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            transform: isFlipped ? 'rotateY(0deg) translateZ(0.1px)' : 'rotateY(180deg) translateZ(0.1px)',
                                            backfaceVisibility: 'hidden',
                                            WebkitBackfaceVisibility: 'hidden',
                                            transition: 'transform 1000ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                                            willChange: 'transform',
                                            overflow: 'visible',
                                            background: 'transparent',
                                            boxShadow: 'none'
                                        }}
                                    >
                                        <HolographicCard 
                                            src="/assets/flaffy.jpg"
                                            alt="Flaffy Pokémon Card"
                                            isFlipped={isFlipped}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side - Content */}
                    <motion.div 
                        initial={{ opacity: 0, x: 40, scale: 0.95 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: 0.15, ease: [0.33, 1, 0.68, 1] }}
                        className="flex-1 max-w-2xl w-full"
                    >
                        <div className="space-y-5 sm:space-y-6">
                                    {/* Terminal-style intro */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 md:p-8 font-body text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02]"
                            >
                                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-400 rounded-full"></div>
                                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-400 rounded-full"></div>
                                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#B7C4AC] rounded-full"></div>
                                    <span className="text-gray-500 ml-1 sm:ml-2 text-[10px] sm:text-xs">rianna@portfolio:~$</span>
                                </div>
                                <div className="space-y-1.5 sm:space-y-2 text-[#8A9B7E]">
                                    <p><span className="text-[#B7C4AC] font-semibold">const</span> developer = {`{`}</p>
                                    <p className="ml-3 sm:ml-4">name: <span className="text-gray-700">"Rianna Lei"</span>,</p>
                                    <p className="ml-3 sm:ml-4">location: <span className="text-gray-700">"Cal Poly SLO"</span>,</p>
                                    <p className="ml-3 sm:ml-4">passion: <span className="text-gray-700">"Building innovative solutions"</span>,</p>
                                    <p className="ml-3 sm:ml-4">status: <span className="text-gray-700">"Available for opportunities"</span></p>
                                    <p>{`};`}</p>
                                </div>
                            </motion.div>
                            
                            {/* Description */}
                            <div className="space-y-3 sm:space-y-4">
                                <AnimatedParagraph className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed" delay={0.4}>
                                    I'm a Computer Science student at California Polytechnic University, San Luis Obispo, with a passion for creating innovative digital experiences. My journey in tech is driven by curiosity and a desire to build solutions that make a difference.
                                </AnimatedParagraph>
                                <AnimatedParagraph className="text-sm sm:text-base text-gray-600 leading-relaxed" delay={0.6}>
                                    I enjoy exploring new places, discovering cozy coffee spots, and immersing myself in nature. My love for art and music often inspires creative approaches to my technical projects.
                                </AnimatedParagraph>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
