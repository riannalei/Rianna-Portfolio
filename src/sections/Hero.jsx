import { Leva } from 'leva';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useMediaQuery } from 'react-responsive';
import { PerspectiveCamera } from '@react-three/drei';
import PageTransition from '../components/PageTransition.jsx';

import { Model as Macbook } from '../components/Macbook.jsx';
import CanvasLoader from '../components/Loading.jsx';
import HeroCamera from '../components/HeroCamera.jsx';

const Hero = () => {
    const isMobile = useMediaQuery({ maxWidth: 768 });

    return (
        <PageTransition>
            <section className="min-h-screen w-full bg-white flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
                <div className="w-full md:max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 md:gap-0">
                    {/* Left Side - Text Content */}
                    <div className="w-full md:w-[45%] flex flex-col items-center md:items-start gap-2 md:gap-12 mb-0 text-center md:text-left">
                        <div>
                            <h1 className="text-3xl sm:text-4xl md:text-6xl font-medium text-gray-900 mb-1 md:mb-6 font-generalsans">
                                Hello, I am Rianna Lei
                            </h1>
                            <h2 className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-1 md:mb-6 font-generalsans">
                                Software Developer
                            </h2>
                            <p className="text-sm sm:text-base md:text-lg text-gray-600 font-generalsans max-w-md leading-relaxed">
                                I create full-stack applications, design interactive web experiences, and enjoy bringing innovative ideas to life.
                            </p>
                        </div>
                    </div>

                    {/* Right Side - MacBook */}
                    <div className="w-full md:w-[55%] h-48 sm:h-72 md:h-[700px] flex justify-center items-center">
                        <Canvas className="w-full h-full">
                            <Suspense fallback={<CanvasLoader />}>
                                <Leva hidden />
                                <PerspectiveCamera makeDefault position={[0, 0, 30]} />
                                <ambientLight intensity={1.5} />
                                <directionalLight position={[10, 10, 10]} intensity={0.8} />
                                
                                <HeroCamera isMobile={isMobile}>
                                    <Macbook 
                                        scale={isMobile ? 4.8 : 5} 
                                        rotation={[0, 0.2, 0]}
                                        position={isMobile ? [0, 0.5, 0] : [0.5, -6.5, 0]}
                                    />
                                </HeroCamera>
                            </Suspense>
                        </Canvas>
                    </div>
                </div>
            </section>
        </PageTransition>
    );
};

export default Hero;
