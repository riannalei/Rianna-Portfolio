import { useState } from 'react';
import Button from '../components/Button.jsx';

const About = () => {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('rxlei@calpoly.edu');
    setHasCopied(true);

    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  return (
      <section className="c-space my-10" id="about">
        {/* About Title */}
        <div className="text-center mb-16">
          <p className="text-4xl font-bold text-white">About</p>
          <p className="text-lg text-gray-400">My Introduction</p>
        </div>

        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 h-full mb-16">
          {/* About Me Section */}
          <div className="col-span-1">
            <div className="grid-container flex flex-col items-center justify-center text-center p-6 bg-[#1E1E1E] rounded-lg shadow-lg">
              <img src="assets/grid1.png" alt="grid-1" className="w-full sm:h-[276px] h-fit object-contain mb-4"/>
              <div>
                <p className="grid-headtext text-white text-2xl font-bold">Hi, I’m Rianna Lei</p>
                <p className="grid-subtext text-white text-base mt-4">
                  I am a Junior Computer Science student at California Polytechnic University, San Luis Obispo,
                  passionate about full-stack development and AI technologies. I love building innovative applications and
                  exploring new technologies!
                </p>
              </div>
            </div>
          </div>

          {/* Passions and Hobbies Section */}
          <div className="col-span-1">
            <div className="grid-container flex flex-col items-center justify-center text-center p-6 bg-[#1E1E1E] rounded-lg shadow-lg">
              <img src="assets/grid2.png" alt="grid-2" className="w-full sm:h-[266px] h-fit object-contain mb-4"/>
              <div>
                <p className="grid-headtext text-white text-2xl font-bold">Passions & Hobbies</p>
                <p className="grid-subtext text-white text-base mt-4">
                  Outside of coding, I enjoy exploring new places, finding cozy coffee spots, and being in nature. I'm also passionate about art and music, which keep me inspired and spark creative side projects that blend tech and discovery.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Section (without title) */}
          {/* Contact Section (without title) */}
          <div className="col-span-1">
            <div className="grid-container flex flex-col justify-center items-center p-6 bg-[#1E1E1E] rounded-lg shadow-lg">
              <img src="assets/grid3.png" alt="grid-3" className="w-full sm:h-[266px] h-fit object-contain mb-4"/>
              <div className="text-center">
                {/* Resume Button */}
                <div className="mt-4">
                  <a
                      href="/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 text-white bg-blue-500 rounded-lg shadow-lg hover:bg-blue-400 transition duration-300"
                  >
                    View My Resume
                  </a>
                </div>

                {/* Language Fluency and Contact Me Text - Smaller Size */}
                <div className="mt-6 text-white">
                  <p className="text-base mt-2">I'm fluent in English and Chinese (Mandarin & Cantonese)</p>
                  <p className="text-base mt-1">Feel free to contact me!</p>
                </div>

                {/* Email and Copy Button */}
                <div className="copy-container mt-4" onClick={handleCopy}>
                  <img src={hasCopied ? 'assets/tick.svg' : 'assets/copy.svg'} alt="copy"/>
                  <p className="lg:text-xl md:text-xl font-medium text-white mt-2">rxlei@calpoly.edu</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Tech Stack Title with Better Spacing */}
        <div className="text-center xl:col-span-3 mb-10 mt-20">
          <p className="text-4xl font-bold text-white">Tech Stack</p>
          <p className="text-lg text-gray-400 mt-2">My Technical Skills</p>
        </div>

        {/* Tech Stack Boxes (3x2 Grid) */}
        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
          {/* Programming Languages & Core Skills */}
          <div className="grid-container flex flex-col justify-center items-center p-6 bg-[#1E1E1E] rounded-lg shadow-lg">
            <p className="grid-headtext text-xl font-bold text-white mb-4">Programming Languages & Core Skills</p>
            {/* Grid Layout for Skills */}
            <div className="grid grid-cols-3 gap-4">
              <div className="tech-icon text-center">
                <img src="assets/pyt.svg" alt="Python" className="w-10 h-10 mx-auto"/>
                <p className="text-sm text-white mt-2">Python</p>
              </div>
              <div className="tech-icon text-center">
                <img src="assets/java.svg" alt="Java" className="w-10 h-10 mx-auto"/>
                <p className="text-sm text-white mt-2">Java</p>
              </div>
              <div className="tech-icon text-center">
                <img src="assets/js.svg" alt="JavaScript" className="w-10 h-10 mx-auto"/>
                <p className="text-sm text-white mt-2">JavaScript</p>
              </div>
              <div className="tech-icon text-center">
                <img src="assets/ts.svg" alt="TypeScript" className="w-10 h-10 mx-auto"/>
                <p className="text-sm text-white mt-2">TypeScript</p>
              </div>
              <div className="tech-icon text-center">
                <img src="assets/c.svg" alt="C" className="w-10 h-10 mx-auto"/>
                <p className="text-sm text-white mt-2">C</p>
              </div>
              <div className="tech-icon text-center">
                <img src="assets/html.svg" alt="HTML/CSS" className="w-10 h-10 mx-auto"/>
                <p className="text-sm text-white mt-2">HTML/CSS</p>
              </div>
            </div>
          </div>

          {/* Web Development Frameworks & Libraries */}
          <div className="grid-container flex flex-col justify-center items-center p-6 bg-[#1E1E1E] rounded-lg shadow-lg">
            <p className="grid-headtext text-xl font-bold text-white mb-4">Web Dev Frameworks & Libraries</p>
            {/* Grid Layout for Skills */}
            <div className="grid grid-cols-3 gap-4">
              <div className="tech-icon text-center">
                <img src="assets/reac.svg" alt="React" className="w-10 h-10 mx-auto"/>
                <p className="text-sm text-white mt-2">React</p>
              </div>
              <div className="tech-icon text-center">
                <img src="assets/next.svg" alt="Next.js" className="w-10 h-10 mx-auto"/>
                <p className="text-sm text-white mt-2">Next.js</p>
              </div>
              <div className="tech-icon text-center">
                <img src="assets/node.svg" alt="Node.js" className="w-10 h-10 mx-auto"/>
                <p className="text-sm text-white mt-2">Node.js</p>
              </div>
              <div className="tech-icon text-center">
                <img src="assets/matui.svg" alt="Material-UI" className="w-10 h-10 mx-auto"/>
                <p className="text-sm text-white mt-2">Material-UI</p>
              </div>
              <div className="tech-icon text-center">
                <img src="assets/twcss.svg" alt="Tailwind CSS" className="w-10 h-10 mx-auto"/>
                <p className="text-sm text-white mt-2">Tailwind CSS</p>
              </div>
              <div className="tech-icon text-center">
                <img src="assets/json.svg" alt="Express.js" className="w-10 h-10 mx-auto"/>
                <p className="text-sm text-white mt-2">Express.js</p>
              </div>
            </div>
          </div>

          {/* Tools, Databases, & Cloud Services */}
          <div className="grid-container flex flex-col justify-center items-center p-6 bg-[#1E1E1E] rounded-lg shadow-lg">
            <p className="grid-headtext text-xl font-bold text-white mb-4">Tools, Databases, & Cloud Services</p>
            {/* Grid Layout for Skills */}
            <div className="grid grid-cols-3 gap-4">
              <div className="tech-icon text-center">
                <img src="assets/awss.svg" alt="AWS" className="w-10 h-10 mx-auto"/>
                <p className="text-sm text-white mt-2">AWS</p>
              </div>
              <div className="tech-icon text-center">
                <img src="assets/firebase.svg" alt="Firebase" className="w-10 h-10 mx-auto"/>
                <p className="text-sm text-white mt-2">Firebase</p>
              </div>
              <div className="tech-icon text-center">
                <img src="assets/mongo.svg" alt="MongoDB" className="w-10 h-10 mx-auto"/>
                <p className="text-sm text-white mt-2">MongoDB</p>
              </div>
              <div className="tech-icon text-center">
                <img src="assets/postgre.svg" alt="PostgreSQL" className="w-10 h-10 mx-auto"/>
                <p className="text-sm text-white mt-2">PostgreSQL</p>
              </div>
              <div className="tech-icon text-center">
                <img src="assets/json.svg" alt="Prisma" className="w-10 h-10 mx-auto"/>
                <p className="text-sm text-white mt-2">Prisma</p>
              </div>
              <div className="tech-icon text-center">
                <img src="assets/cicd.svg" alt="CI/CD Pipelines" className="w-10 h-10 mx-auto"/>
                <p className="text-sm text-white mt-2">CI/CD Pipelines</p>
              </div>
            </div>
          </div>
        </div>

      </section>
  );
};

export default About;
