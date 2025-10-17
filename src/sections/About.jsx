import { motion, useTransform } from 'framer-motion';
import { AnimatedTextWords, AnimatedParagraph } from '../components/AnimatedText.jsx';

const About = ({ scrollYProgress }) => {
    // Perspective transition: scale up and rotate as it comes into view
    const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);

    return (
        <motion.section 
            style={{ 
                scale, 
                rotate,
                transformOrigin: "top center"
            }}
            id="about" 
            className="sticky top-0 min-h-screen flex items-center justify-center w-full bg-gray-50 px-4 sm:px-6 py-32"
        >
            <div className="max-w-6xl w-full mx-auto">
                {/* Section Title */}
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                    className="text-left mb-20"
                >
                    <h2 className="text-5xl sm:text-6xl md:text-7xl font-light text-gray-900">
                        <AnimatedTextWords text="About Me" />
                    </h2>
                </motion.div>

                {/* Content */}
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center justify-center">
                    {/* Left Side - Image */}
                    <motion.div 
                        initial={{ opacity: 0, x: -40, scale: 0.95 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        viewport={{ once: false, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
                        className="w-full lg:w-[350px] flex flex-col items-center lg:items-start gap-6"
                    >
                        <div className="relative w-[280px] h-[320px] lg:w-[350px] lg:h-[400px] group">
                            {/* Image container */}
                            <div className="relative w-full h-full rounded-2xl overflow-hidden">
                                <img 
                                    src="/assets/rianna.jpeg" 
                                    alt="Rianna Lei" 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#B7C4AC]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>
                        </div>
                        
                        {/* View Resume Text */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.4, delay: 0.4 }}
                            className="w-full text-center"
                        >
                            <a 
                                href="/Rianna_Lei_Resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#B7C4AC] hover:text-[#8A9B7E] transition-colors duration-300 font-light text-base"
                            >
                                View Resume
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Right Side - Content */}
                    <motion.div 
                        initial={{ opacity: 0, x: 40, scale: 0.95 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        viewport={{ once: false, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
                        className="flex-1 max-w-2xl"
                    >
                        <div className="space-y-8">
                                    {/* Terminal-style intro */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 font-mono text-sm shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02]"
                            >
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                    <div className="w-3 h-3 bg-[#B7C4AC] rounded-full"></div>
                                    <span className="text-gray-500 ml-2 text-xs">rianna@portfolio:~$</span>
                                </div>
                                <div className="space-y-2 text-[#8A9B7E]">
                                    <p><span className="text-[#B7C4AC] font-semibold">const</span> developer = {`{`}</p>
                                    <p className="ml-4">name: <span className="text-gray-700">"Rianna Lei"</span>,</p>
                                    <p className="ml-4">location: <span className="text-gray-700">"Cal Poly SLO"</span>,</p>
                                    <p className="ml-4">passion: <span className="text-gray-700">"Building innovative solutions"</span>,</p>
                                    <p className="ml-4">status: <span className="text-gray-700">"Available for opportunities"</span></p>
                                    <p>{`};`}</p>
                                </div>
                            </motion.div>
                            
                            {/* Description */}
                            <div className="space-y-5">
                                <AnimatedParagraph className="text-base sm:text-lg text-gray-700 leading-relaxed" delay={0.4}>
                                    I'm a Senior Computer Science student at California Polytechnic University, San Luis Obispo, with a passion for creating innovative digital experiences. My journey in tech is driven by curiosity and a desire to build solutions that make a difference.
                                </AnimatedParagraph>
                                <AnimatedParagraph className="text-gray-600 leading-relaxed" delay={0.6}>
                                    Beyond coding, I find joy in exploring new places, discovering cozy coffee spots, and immersing myself in nature. My love for art and music often inspires creative approaches to my technical projects.
                                </AnimatedParagraph>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
};

export default About;
