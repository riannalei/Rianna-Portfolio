import { useState, useRef, useEffect } from 'react';
import Globe from 'react-globe.gl';
import Button from '../components/Button.jsx';

const About = () => {
  const [hasCopied, setHasCopied] = useState(false);
  const globeRef = useRef(); // Add ref for the Globe component

  const handleCopy = () => {
    navigator.clipboard.writeText('rxlei@calpoly.edu');
    setHasCopied(true);

    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  useEffect(() => {
    if (globeRef.current) {
      // Set the point of view to center on Los Angeles
      globeRef.current.pointOfView({ lat: 34, lng: -118, altitude: 2 }, 0);
    }
  }, []);

  return (
      <section className="c-space mt-20" id="about">
        <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">
          <div className="col-span-1 xl:row-span-3">
            <div className="grid-container flex flex-col items-center justify-center text-center">
              <img src="assets/grid1.png" alt="grid-1" className="w-full sm:h-[276px] h-fit object-contain" />

              <div>
                <p className="grid-headtext">Hi, I’m Rianna Lei</p>
                <p className="grid-subtext">
                  I am a Junior Computer Science student at California Polytechnic University, San Luis Obispo, passionate
                  about full-stack development and AI/ML technologies. I love building innovative applications and
                  exploring new technologies.
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-1 xl:row-span-3">
            <div className="grid-container flex flex-col items-center justify-center text-center">
              <img src="assets/grid2.png" alt="grid-2" className="w-full sm:h-[276px] h-fit object-contain" />

              <div>
                <p className="grid-headtext">Tech Stack</p>
                <p className="grid-subtext">
                  I specialize in Python, JavaScript, TypeScript, and Java, with experience building full-stack applications using React, Next.js, Node.js, and various APIs. I work with databases like MongoDB and PostgreSQL and am comfortable with Linux, Git, and CI/CD tools.
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-1 xl:row-span-3">
            <div className="grid-container flex flex-col items-center justify-center">
              <div className="rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center mb-4">
                {/* Center the globe */}
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
              <div className="text-center">
                <p className="grid-headtext">I’m flexible with time zone communications & locations</p>
                <p className="grid-subtext">I am based in Los Angeles, CA and open to remote work worldwide.</p>
                <Button name="Contact Me" isBeam containerClass="w-full mt-10" />
              </div>
            </div>
          </div>

          <div className="xl:col-span-2 xl:row-span-2">
            <div className="grid-container">
              <img src="assets/grid3.png" alt="grid-3" className="w-full sm:h-[266px] h-fit object-contain" />

              <div className="p-4">
                <p className="grid-headtext">Resume</p>
                <p className="grid-subtext">
                  <a
                      href="/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 px-4 py-2 text-white bg-pink-200 rounded-lg shadow-lg hover:bg-pink-300 transition duration-300"
                  >
                    View My Resume
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="xl:col-span-1 xl:row-span-2">
            <div className="grid-container">
              <img
                  src="assets/grid4.png"
                  alt="grid-4"
                  className="w-full md:h-[276px] sm:h-[276px] h-fit object-cover sm:object-top"
              />

              <div className="space-y-2">
                <p className="grid-subtext text-center">Contact me</p>
                <div className="copy-container" onClick={handleCopy}>
                  <img src={hasCopied ? 'assets/tick.svg' : 'assets/copy.svg'} alt="copy" />
                  <p className="lg:text-2xl md:text-xl font-medium text-gray_gradient text-white">rxlei@calpoly.edu</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default About;
