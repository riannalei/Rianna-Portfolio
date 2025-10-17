import { Leva } from 'leva';
import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useMediaQuery } from 'react-responsive';
import { PerspectiveCamera } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';

import { Model as Macbook } from '../components/Macbook.jsx';
import CanvasLoader from '../components/Loading.jsx';
import HeroCamera from '../components/HeroCamera.jsx';
import { AnimatedTextChars } from '../components/AnimatedText.jsx';

const Hero = () => {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0vh", "150vh"]);

    return (
        <div ref={container} className="h-screen overflow-hidden">
            <motion.section 
                style={{ y }}
                id="home" 
                className="relative h-screen w-full bg-white flex flex-col px-6 sm:px-8 md:px-12"
            >
                {/* Main Content Container */}
                <div className="flex-1 flex items-center justify-center max-w-7xl mx-auto w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
                        {/* Left Side - Text Content */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="space-y-8"
                        >
                            <div className="overflow-hidden">
                                <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-gray-900 leading-none tracking-tight">
                                    <AnimatedTextChars text="RIANNA" delay={0.2} />
                                </h1>
                            </div>
                            <div className="overflow-hidden">
                                <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-gray-900 leading-none tracking-tight">
                                    <AnimatedTextChars text="LEI" delay={0.4} />
                                </h1>
                            </div>

                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.8, ease: [0.33, 1, 0.68, 1] }}
                                className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-xl"
                            >
                                I'm passionate about crafting software and products that make a real difference. I love solving problems through technology and bringing ideas to life in ways that are both functional and human-centered.
                            </motion.p>
                        </motion.div>

                        {/* Right Side - 3D MacBook */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 1, delay: 1, ease: [0.33, 1, 0.68, 1] }}
                            className="h-[400px] sm:h-[500px] lg:h-[600px]"
                        >
                            <Canvas className="w-full h-full">
                                <Suspense fallback={<CanvasLoader />}>
                                    <Leva hidden />
                                    <PerspectiveCamera makeDefault position={[0, 0, 30]} />
                                    <ambientLight intensity={2} />
                                    <directionalLight position={[10, 10, 10]} intensity={1.5} />
                                    <directionalLight position={[-10, -10, -10]} intensity={0.8} />
                                    <pointLight position={[0, 5, 5]} intensity={1} color="#B7C4AC" />
                                    
                                    <HeroCamera isMobile={isMobile}>
                                        <Macbook 
                                            scale={7} 
                                            rotation={[0, 0.3, 0]}
                                            position={[0, -7, 0]}
                                        />
                                    </HeroCamera>
                                </Suspense>
                            </Canvas>
                        </motion.div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                    className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-sm text-gray-400 font-light tracking-wider">SCROLL</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        className="w-6 h-10 border-2 border-gray-300 rounded-full flex items-start justify-center p-2"
                    >
                        <motion.div 
                            className="w-1.5 h-1.5 bg-[#B7C4AC] rounded-full"
                        />
                    </motion.div>
                </motion.div>
            </motion.section>
        </div>
    );
};

export default Hero;
