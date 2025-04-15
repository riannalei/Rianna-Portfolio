import { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Globe from 'react-globe.gl';

import Loading from '../components/Loading.jsx';
import { workExperiences } from '../constants/index.js';
import PageTransition from '../components/PageTransition.jsx';

const WorkExperience = () => {
  const [animationName, setAnimationName] = useState('idle');
  const globeRef = useRef();

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.pointOfView({ lat: 34, lng: -118, altitude: 2 }, 0);
    }
  }, []);

  return (
    <PageTransition>
      <section className="min-h-screen w-full bg-white py-20 px-8" id="work">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-4xl font-medium text-gray-900">My Work Experience</p>
            <p className="text-lg text-gray-600 mt-2">Where I've Worked</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            <div className="flex justify-center items-center">
              <Globe
                  ref={globeRef}
                  height={400}
                  width={400}
                  backgroundColor="rgba(255, 255, 255, 0)"
                  globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                  bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                  labelsData={[
                    { lat: 34, lng: -118, text: 'Los Angeles, USA', color: '#4A5568', size: 15 },
                  ]}
              />
            </div>

            <div className="space-y-6">
              {workExperiences.map((item, index) => (
                  <div
                      key={index}
                      onClick={() => setAnimationName(item.animation.toLowerCase())}
                      onPointerOver={() => setAnimationName(item.animation.toLowerCase())}
                      onPointerOut={() => setAnimationName('idle')}
                      className="bg-gray-50 rounded-lg shadow-sm border border-gray-100 hover:border-[#B7C4AC] transition-all duration-300"
                  >
                    <div className="flex p-6">
                      <div className="flex-shrink-0 w-16 h-16 mr-6">
                        <img className="w-full h-full object-contain" src={item.icon} alt={item.name} />
                      </div>

                      <div className="flex-grow">
                        <h3 className="text-xl font-medium text-gray-900 mb-1">{item.name}</h3>
                        <p className="text-gray-600 mb-4">
                          {item.pos} — <span className="text-[#B7C4AC]">{item.duration}</span>
                        </p>
                        <ul className="space-y-2 text-gray-600">
                          {item.titles.map((title, i) => (
                              <li key={i} className="flex items-start">
                                <span className="text-[#B7C4AC] mr-2">•</span>
                                {title}
                              </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default WorkExperience;
