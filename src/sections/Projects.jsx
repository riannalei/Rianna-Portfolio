import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center, PerspectiveCamera } from '@react-three/drei';
import { motion } from 'framer-motion';

import { myProjects } from '../constants/index.js';
import CanvasLoader from '../components/Loading.jsx';
import DemoComputer from '../components/DemoComputer.jsx';
import PageTransition from '../components/PageTransition.jsx';
import { AnimatedTextWords } from '../components/AnimatedText.jsx';

const projectCount = myProjects.length;

const Projects = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  const handleNavigation = (direction) => {
    setSelectedProjectIndex((prevIndex) => {
      if (direction === 'previous') {
        return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
      } else {
        return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
      }
    });
  };

  useGSAP(() => {
    gsap.fromTo(`.animatedText`, { opacity: 0 }, { opacity: 1, duration: 1, stagger: 0.2, ease: 'power2.inOut' });
  }, [selectedProjectIndex]);

  // Add pulsing animation to navigation arrows
  useEffect(() => {
    // Pulse animation for left arrow
    gsap.to('.nav-arrow-left', {
      scale: 1.15,
      duration: 0.8,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true,
    });

    // Pulse animation for right arrow
    gsap.to('.nav-arrow-right', {
      scale: 1.15,
      duration: 0.8,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true,
      delay: 0.4, // Offset for alternating effect
    });

    // Add a subtle horizontal bounce
    gsap.to('.nav-arrow-left', {
      x: -3,
      duration: 1,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true,
    });

    gsap.to('.nav-arrow-right', {
      x: 3,
      duration: 1,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true,
    });
  }, []);

  const currentProject = myProjects[selectedProjectIndex];

  return (
    <PageTransition>
      <section className="min-h-screen flex items-center justify-center w-full bg-white px-4 sm:px-6 py-32 pb-24" id="projects">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl w-full mx-auto"
        >
          {/* Section Title */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="text-left mb-12"
          >
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-light text-gray-900 mb-4">
              <AnimatedTextWords text="Projects" />
            </h2>
            <p className="text-gray-600 text-lg">
              Explore my work and creative solutions
            </p>
          </motion.div>

          {/* URL-style Navigation Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-100 rounded-full px-6 py-3 mb-8 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <button 
                className="nav-arrow-left bg-[#B7C4AC] p-2 rounded-full text-white hover:bg-[#95a68b] transition-colors shadow-sm"
                onClick={() => handleNavigation('previous')}
                data-cursor-hover
              >
                <img src="/assets/left-arrow.png?v=1" alt="Previous" className="w-4 h-4 brightness-0 invert" />
              </button>
              <button 
                className="nav-arrow-right bg-[#B7C4AC] p-2 rounded-full text-white hover:bg-[#95a68b] transition-colors shadow-sm"
                onClick={() => handleNavigation('next')}
                data-cursor-hover
              >
                <img src="/assets/right-arrow.png?v=1" alt="Next" className="w-4 h-4 brightness-0 invert" />
              </button>
              <span className="text-gray-500 font-mono text-sm ml-2">{currentProject.href}</span>
            </div>
            {currentProject.href === 'Internal Tool - Not Public' ? (
              <span className="bg-white px-4 py-1 rounded-full text-sm font-medium text-gray-700">
                🔒 Internal Tool
              </span>
            ) : (
              <a
                href={currentProject.href}
                target="_blank"
                rel="noreferrer"
                className="bg-white px-4 py-1 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
                data-cursor-hover
              >
                VISIT
              </a>
            )}
          </motion.div>

          {/* Project Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 min-h-[600px]">
            {/* Left Side - Project Info */}
            <div className="space-y-5 order-2 lg:order-1 flex flex-col">
              <div className="space-y-2">
                <p className="text-sm font-medium tracking-wider text-gray-400 uppercase animatedText">
                  {currentProject.category || 'Web Development'}
                </p>
                <h2 className="text-2xl font-medium text-gray-900 animatedText">
                  {currentProject.title.toUpperCase()}
                </h2>
                {currentProject.subtitle && (
                  <p className="text-base font-medium text-gray-500 animatedText">
                    {currentProject.subtitle}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3">
                {currentProject.tags.map((tag, index) => (
                  <img 
                    key={index} 
                    src={tag.path} 
                    alt={tag.name} 
                    className="w-6 h-6 opacity-60 hover:opacity-100 transition-opacity"
                    title={tag.name}
                  />
                ))}
              </div>

              <div className="space-y-4 flex-1 overflow-y-auto">
                <p className="text-lg text-gray-600 leading-relaxed animatedText">
                  {currentProject.desc}
                </p>
                <p className="text-gray-600 leading-relaxed animatedText">
                  {currentProject.subdesc}
                </p>
              </div>
            </div>

            {/* Right Side - 3D Display */}
            <motion.div 
              key={selectedProjectIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="h-[300px] lg:h-[500px] order-1 lg:order-2"
            >
              <Canvas
                gl={{ 
                  powerPreference: "high-performance",
                  antialias: true,
                  alpha: true,
                  preserveDrawingBuffer: true
                }}
                style={{ background: 'transparent' }}
              >
                <PerspectiveCamera makeDefault position={[0, 0.3, 10]} fov={45} />
                <ambientLight intensity={3} />
                <directionalLight position={[0, 5, 5]} intensity={2.5} />
                <pointLight position={[0, 2, 5]} intensity={2} />
                <spotLight position={[0, 5, 8]} intensity={2} angle={0.6} penumbra={0.5} />
                <Center>
                  <Suspense fallback={<CanvasLoader />}>
                    <group scale={3} position={[-0.7, -4, 0]} rotation={[0.05, 0, 0]}>
                      <DemoComputer texture={currentProject.texture} />
                    </group>
                  </Suspense>
                </Center>
              </Canvas>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </PageTransition>
  );
};

export default Projects;
