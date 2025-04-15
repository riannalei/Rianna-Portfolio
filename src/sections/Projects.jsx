import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls } from '@react-three/drei';

import { myProjects } from '../constants/index.js';
import CanvasLoader from '../components/Loading.jsx';
import DemoComputer from '../components/DemoComputer.jsx';
import PageTransition from '../components/PageTransition.jsx';

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
      <section className="min-h-screen w-full bg-white pt-24 px-4 sm:px-6" id="projects">
        <div className="max-w-5xl mx-auto">
          {/* URL-style Navigation Bar */}
          <div className="bg-gray-100 rounded-full px-6 py-3 mb-12 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                className="bg-[#B7C4AC] p-2 rounded-full text-white hover:bg-[#95a68b] transition-colors shadow-sm"
                onClick={() => handleNavigation('previous')}
              >
                <img src="/assets/left-arrow.png" alt="Previous" className="w-5 h-5 brightness-0 invert" />
              </button>
              <button 
                className="bg-[#B7C4AC] p-2 rounded-full text-white hover:bg-[#95a68b] transition-colors shadow-sm"
                onClick={() => handleNavigation('next')}
              >
                <img src="/assets/right-arrow.png" alt="Next" className="w-5 h-5 brightness-0 invert" />
              </button>
              <span className="text-gray-500 font-mono text-sm">{currentProject.href}</span>
            </div>
            <a
              href={currentProject.href}
              target="_blank"
              rel="noreferrer"
              className="bg-white px-4 py-1 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              VISIT
            </a>
          </div>

          {/* Project Content */}
          <div className="grid grid-cols-2 gap-16">
            {/* Left Side - Project Info */}
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-sm font-medium tracking-wider text-gray-400 uppercase animatedText">
                  {currentProject.category}
                </p>
                <h2 className="text-5xl font-medium text-gray-900 leading-tight animatedText">
                  {currentProject.title}
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

              <div className="space-y-6">
                <p className="text-lg text-gray-600 leading-relaxed animatedText">
                  {currentProject.desc}
                </p>
                <p className="text-gray-600 leading-relaxed animatedText">
                  {currentProject.subdesc}
                </p>
              </div>
            </div>

            {/* Right Side - 3D Display */}
            <div className="h-[500px] -mt-8">
              <Canvas>
                <ambientLight intensity={Math.PI} />
                <directionalLight position={[10, 10, 5]} />
                <Center>
                  <Suspense fallback={<CanvasLoader />}>
                    <group scale={2.6} position={[0, -4.4, 0]} rotation={[0, -0.2, 0]}>
                      <DemoComputer texture={currentProject.texture} />
                    </group>
                  </Suspense>
                </Center>
                <OrbitControls maxPolarAngle={Math.PI / 2} enableZoom={false} />
              </Canvas>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Projects;
