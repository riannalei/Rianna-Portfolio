import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls } from '@react-three/drei';

import { myProjects } from '../constants/index.js';
import CanvasLoader from '../components/Loading.jsx';
import DemoComputer from '../components/DemoComputer.jsx';
import PageTransition from '../components/PageTransition.jsx';
import TextDisperse from '../components/TextDisperse/index.jsx';

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

  const currentProject = myProjects[selectedProjectIndex];

  return (
    <PageTransition>
      <section className="min-h-screen flex items-center justify-center w-full bg-white px-4 sm:px-6" id="projects">
        <div className="max-w-5xl w-full mx-auto">
          {/* URL-style Navigation Bar */}
          <div className="bg-gray-100 rounded-full px-6 py-3 mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                className="bg-[#B7C4AC] p-2 rounded-full text-white hover:bg-[#95a68b] transition-colors shadow-sm"
                onClick={() => handleNavigation('previous')}
                data-cursor-hover
              >
                <img src="/assets/left-arrow.png?v=1" alt="Previous" className="w-4 h-4 brightness-0 invert" />
              </button>
              <button 
                className="bg-[#B7C4AC] p-2 rounded-full text-white hover:bg-[#95a68b] transition-colors shadow-sm"
                onClick={() => handleNavigation('next')}
                data-cursor-hover
              >
                <img src="/assets/right-arrow.png?v=1" alt="Next" className="w-4 h-4 brightness-0 invert" />
              </button>
              <span className="text-gray-500 font-mono text-sm ml-2">{currentProject.href}</span>
            </div>
            <a
              href={currentProject.href}
              target="_blank"
              rel="noreferrer"
              className="bg-white px-4 py-1 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
              data-cursor-hover
            >
              VISIT
            </a>
          </div>

          {/* Project Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Side - Project Info */}
            <div className="space-y-5 order-2 lg:order-1">
              <div className="space-y-2">
                <p className="text-sm font-medium tracking-wider text-gray-400 uppercase animatedText">
                  {currentProject.category || 'Web Development'}
                </p>
                <h2 className="text-2xl pixel-title text-gray-900 animatedText">
                  {currentProject.title.toUpperCase()}
                </h2>
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

              <div className="space-y-4">
                <p className="text-lg text-gray-600 leading-relaxed animatedText">
                  <TextDisperse>{currentProject.desc}</TextDisperse>
                </p>
                <p className="text-gray-600 leading-relaxed animatedText">
                  <TextDisperse>{currentProject.subdesc}</TextDisperse>
                </p>
              </div>
            </div>

            {/* Right Side - 3D Display */}
            <div className="h-[300px] lg:h-[500px] -mt-0 lg:-mt-8 order-1 lg:order-2">
              <Canvas
                gl={{ 
                  powerPreference: "high-performance",
                  antialias: true,
                  alpha: true,
                  preserveDrawingBuffer: true,
                  failIfMajorPerformanceCaveat: true
                }}
                dpr={window.devicePixelRatio}
                performance={{ min: 0.5 }}
                style={{ background: 'transparent' }}
                onCreated={({ gl }) => {
                  gl.setClearColor(0x000000, 0);
                }}
              >
                <ambientLight intensity={Math.PI} />
                <directionalLight position={[10, 10, 5]} />
                <Center>
                  <Suspense fallback={<CanvasLoader />}>
                    <group scale={2.6} position={[0, -4.4, 0]} rotation={[0, -0.2, 0]}>
                      <DemoComputer texture={currentProject.texture} />
                    </group>
                  </Suspense>
                </Center>
                <OrbitControls 
                  maxPolarAngle={Math.PI / 2} 
                  enableZoom={false}
                  enableDamping={false}
                />
              </Canvas>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Projects;
