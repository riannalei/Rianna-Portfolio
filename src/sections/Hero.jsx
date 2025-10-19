import { Leva } from 'leva';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useMediaQuery } from 'react-responsive';
import { PerspectiveCamera } from '@react-three/drei';
import { motion } from 'framer-motion';

import Diorama from '../components/Diorama.jsx';
import CherryPetals from '../components/CherryPetals.jsx';
import CanvasLoader from '../components/Loading.jsx';
import HeroCamera from '../components/HeroCamera.jsx';
import { AnimatedTextChars } from '../components/AnimatedText.jsx';

const Hero = () => {
    const isMobile = useMediaQuery({ maxWidth: 768 });

    return (
        <section 
            id="home" 
            className="relative h-screen w-full bg-white flex flex-col px-4 sm:px-6 md:px-8 lg:px-12"
        >
                {/* Main Content Container */}
                <div className="flex-1 flex items-center justify-center max-w-7xl mx-auto w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center w-full">
                        {/* Left Side - Text Content */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-center lg:text-left"
                        >
                            <div className="overflow-hidden mb-2">
                                <h1 className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-gray-900 font-heading" style={{ letterSpacing: '-0.03em', lineHeight: '0.9' }}>
                                    <AnimatedTextChars text="RIANNA" delay={0.2} />
                                </h1>
                            </div>
                            <div className="overflow-hidden">
                                <h1 className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-gray-900 font-heading" style={{ letterSpacing: '-0.03em', lineHeight: '0.9' }}>
                                    <AnimatedTextChars text="LEI" delay={0.4} />
                                </h1>
                            </div>

                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.8, ease: [0.33, 1, 0.68, 1] }}
                                className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-body mt-6 sm:mt-8 lg:mt-10"
                            >
                                I'm passionate about crafting software and products that make a real difference. I love solving problems through technology and bringing ideas to life in ways that are both functional and human-centered.
                            </motion.p>
                        </motion.div>

                        {/* Right Side - 3D Diorama Scene */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 1, ease: [0.33, 1, 0.68, 1] }}
                            className={isMobile ? "h-[400px] w-full" : "h-[650px] w-full"}
                        >
                            <Canvas className="w-full h-full">
                                <Suspense fallback={<CanvasLoader />}>
                                    <Leva hidden />
                                    <PerspectiveCamera makeDefault position={[0, 0, 20]} />
                                    <ambientLight intensity={2.5} />
                                    <directionalLight position={[10, 10, 10]} intensity={2} />
                                    <directionalLight position={[-10, -10, -10]} intensity={1} />
                                    <pointLight position={[0, 5, 5]} intensity={1.5} color="#B7C4AC" />
                                    <spotLight 
                                        position={[0, 10, 0]} 
                                        intensity={1} 
                                        angle={0.6} 
                                        penumbra={0.5}
                                        castShadow 
                                    />
                                    
                                    <HeroCamera isMobile={isMobile}>
                                        {/* Diorama scene (books, lantern, scroll, lotus) */}
                                        <Diorama 
                                            scale={isMobile ? 0.3 : 0.4} 
                                            rotation={[3.6, 3.3, 9.4]}
                                            position={[0, -3.5, 0]}
                                        />
                                        
                                        {/* Cherry blossom petals falling */}
                                        <CherryPetals 
                                            scale={isMobile ? 2.0 : 2.8} 
                                            position={[0, 0, 0]}
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
                    className="absolute bottom-6 sm:bottom-8 lg:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 sm:gap-2 z-10"
                >
                    <span className="text-[10px] sm:text-sm text-gray-400 font-light tracking-wider text-center">SCROLL</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        className="w-4 h-7 sm:w-6 sm:h-10 border-2 border-gray-300 rounded-full flex items-start justify-center p-1 sm:p-2"
                    >
                        <motion.div 
                            className="w-0.5 h-0.5 sm:w-1.5 sm:h-1.5 bg-[#B7C4AC] rounded-full"
                        />
                    </motion.div>
                </motion.div>
        </section>
    );
};

export default Hero;
