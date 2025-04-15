import { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Globe from 'react-globe.gl';

import Loading from '../components/Loading.jsx';
import { workExperiences } from '../constants/index.js';

const WorkExperience = () => {
  const [animationName, setAnimationName] = useState('idle');
  const globeRef = useRef(); // Add ref for the Globe component

  useEffect(() => {
    if (globeRef.current) {
      // Set the point of view to center on a specific location if needed
      globeRef.current.pointOfView({ lat: 34, lng: -118, altitude: 2 }, 0);
    }
  }, []);

  return (
      <section className="c-space my-20" id="work">
        <div className="w-full text-white-600">
          <p className="head-text">My Work Experience</p>

          <div className="work-container">
            <div className="work-canvas">
              {/* Replaced Static Image with Globe */}
              <div className="flex justify-center items-center h-full w-full">
                <Globe
                    ref={globeRef} // Attach ref to Globe component
                    height={326}
                    width={326}
                    backgroundColor="rgba(0, 0, 0, 0)"
                    backgroundImageOpacity={0.5}
                    showAtmosphere
                    showGraticules
                    globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                    bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                    labelsData={[
                      { lat: 34, lng: -118, text: 'Los Angeles, USA', color: 'white', size: 15 },
                    ]}
                />
              </div>
            </div>

            <div className="work-content">
              <div className="sm:py-10 py-5 sm:px-5 px-2.5">
                {workExperiences.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => setAnimationName(item.animation.toLowerCase())}
                        onPointerOver={() => setAnimationName(item.animation.toLowerCase())}
                        onPointerOut={() => setAnimationName('idle')}
                        className="work-content_container group"
                    >
                      <div className="flex flex-col h-full justify-start items-center py-2">
                        <div className="work-content_logo">
                          <img className="w-full h-full" src={item.icon} alt={item.name} />
                        </div>

                        <div className="work-content_bar" />
                      </div>

                      <div className="sm:p-5 px-2.5 py-5">
                        <p className="font-bold text-white-800">{item.name}</p>
                        <p className="text-sm mb-5">
                          {item.pos} -- <span>{item.duration}</span>
                        </p>
                        <ul className="list-disc list-inside text-gray-400 group-hover:text-white transition-all ease-in-out duration-500">
                          {item.titles.map((title, i) => (
                              <li key={i} className="mb-2">
                                {title}
                              </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default WorkExperience;
