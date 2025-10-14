import { Leva } from 'leva';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useMediaQuery } from 'react-responsive';
import { PerspectiveCamera } from '@react-three/drei';
import { Typewriter } from 'react-simple-typewriter';
import PageTransition from '../components/PageTransition.jsx';
import ParticlesBackground from '../components/ParticlesBackground.jsx';
import CoolHeroSection from '../components/CoolHeroSection.jsx';
import TextGooey from '../components/TextGooey.jsx';

import { Model as Macbook } from '../components/Macbook.jsx';
import CanvasLoader from '../components/Loading.jsx';
import HeroCamera from '../components/HeroCamera.jsx';

const Hero = () => {
    const isMobile = useMediaQuery({ maxWidth: 768 });

    return (
        <PageTransition>
            <CoolHeroSection>
                        <section className="relative min-h-screen w-full bg-white flex flex-col items-center justify-center px-6 sm:px-6 md:px-8 pt-20 pb-12 md:pt-0">
                            <div className="absolute inset-0 z-0">
                                <ParticlesBackground />
                            </div>
                            <div className="relative z-10 w-full md:max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 md:gap-0">
                                {/* Left Side - Text Content */}
                                <div className="w-full md:w-[45%] flex flex-col items-center md:items-start gap-8 md:gap-8 mb-0 text-center md:text-left">
                                    <div className="space-y-8">
                                        <div className="relative">
                                            <span className="block text-xl sm:text-2xl md:text-2xl text-gray-700 mb-4 opacity-80">Hello, I am</span>
                                            <TextGooey 
                                                text="RIANNA LEI"
                                                className="block text-4xl sm:text-5xl md:text-4xl pixel-title text-gray-900"
                                            />
                                            {/* Decorative elements */}
                                            <div className="absolute -top-4 -left-4 w-20 h-20 border border-[#B7C4AC]/30 rounded-full opacity-50"></div>
                                            <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-[#B7C4AC] rounded-full"></div>
                                        </div>
                                        
                                        <div className="relative">
                                            <h2 className="text-xl sm:text-2xl md:text-2xl text-gray-700 font-medium">
                                                <Typewriter
                                                    words={['Software developer', 'Full-stack developer', 'Product designer']}
                                                    cursor
                                                    cursorStyle="_"
                                                    typeSpeed={70}
                                                    deleteSpeed={50}
                                                    delaySpeed={2000}
                                                    startDelay={3000}
                                                    loop
                                                />
                                            </h2>
                                        </div>
                                        
                                        <div className="relative max-w-lg">
                                            <div className="text-base sm:text-lg md:text-lg text-gray-600 leading-relaxed">
                                                I create full-stack applications, design interactive web experiences, and enjoy bringing innovative ideas to life through code.
                                            </div>
                                            <div className="absolute -left-3 top-0 w-1 h-full bg-gradient-to-b from-[#B7C4AC] to-transparent opacity-30"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side - MacBook with Enhanced Effects */}
                                <div className="w-full md:w-[55%] h-72 sm:h-96 md:h-[700px] flex justify-center items-center relative">
                                    <div className="w-full h-full rounded-xl relative z-10">
                                        <Canvas className="w-full h-full">
                                            <Suspense fallback={<CanvasLoader />}>
                                                <Leva hidden />
                                                <PerspectiveCamera makeDefault position={[0, 0, 30]} />
                                                <ambientLight intensity={1.8} />
                                                <directionalLight position={[10, 10, 10]} intensity={1} />
                                                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#B7C4AC" />
                                                
                                                <HeroCamera isMobile={isMobile}>
                                                    <Macbook 
                                                        scale={isMobile ? 8 : 5} 
                                                        rotation={[0, 0.2, 0]}
                                                        position={isMobile ? [0, -3.5, 0] : [0.5, -6.5, 0]}
                                                    />
                                                </HeroCamera>
                                            </Suspense>
                                        </Canvas>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </CoolHeroSection>
            </PageTransition>
    );
};

export default Hero;
