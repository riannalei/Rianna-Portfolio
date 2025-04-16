import { useState } from 'react';
import PageTransition from '../components/PageTransition.jsx';
import { workExperiences } from '../constants/index.js';

const About = () => {
    const [activeTab, setActiveTab] = useState('about');

    const tabs = [
        { id: 'about', label: 'About' },
        { id: 'skills', label: 'Skills' },
        { id: 'experience', label: 'Experience' }
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'about':
                return (
                    <div className="flex gap-12">
                        {/* Left Side - Image */}
                        <div className="w-[320px]">
                            <div className="relative">
                                <img 
                                    src="/assets/rianna.jpeg" 
                                    alt="Rianna Lei" 
                                    className="w-[320px] h-[320px] object-cover rounded-lg shadow-lg"
                                />
                                <div className="absolute inset-0 bg-[#B7C4AC] opacity-10 rounded-lg"></div>
                            </div>
                        </div>

                        {/* Right Side - Content */}
                        <div className="flex-1">
                            <div className="space-y-5">
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    I'm a Junior Computer Science student at California Polytechnic University, 
                                    San Luis Obispo, with a passion for creating innovative digital experiences. 
                                    My journey in tech is driven by curiosity and a desire to build solutions 
                                    that make a difference.
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                    Beyond coding, I find joy in exploring new places, discovering cozy coffee spots, 
                                    and immersing myself in nature. My love for art and music often inspires creative 
                                    approaches to my technical projects.
                                </p>
                            </div>
                        </div>
                    </div>
                );
            case 'skills':
                return (
                    <div className="flex gap-16">
                        {/* Left Side - Skills Cluster */}
                        <div className="w-[350px]">
                            <div className="relative">
                                <img 
                                    src="/assets/skills-clusters.png" 
                                    alt="Skills Visualization" 
                                    className="w-[350px] h-[350px] object-contain"
                                />
                            </div>
                        </div>

                        {/* Right Side - Skills List */}
                        <div className="flex-1 max-w-lg">
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-xl font-medium text-gray-900 mb-4">Languages</h3>
                                    <p className="text-lg text-gray-600">
                                        Python, JavaScript, TypeScript, Java, HTML/CSS
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-medium text-gray-900 mb-4">Technologies</h3>
                                    <p className="text-lg text-gray-600">
                                        React, Node.js, Next.js, Tailwind CSS, Three.js, Figma, TensorFlow, PyTorch
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-medium text-gray-900 mb-4">Tools & Infrastructure</h3>
                                    <p className="text-lg text-gray-600">
                                        MySQL, PostgreSQL, Linux, Git, GitHub, CI/CD Pipelines, Kaggle
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'experience':
                return (
                    <div className="max-w-2xl mx-auto">
                        <div className="space-y-6">
                            {workExperiences.map((item, index) => (
                                <div key={index} className="space-y-1">
                                    <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                                    <p className="text-base text-gray-600">
                                        {item.pos} — <span className="text-[#B7C4AC]">{item.duration}</span>
                                    </p>
                                    <ul className="space-y-1 mt-2">
                                        {item.titles.map((title, i) => (
                                            <li key={i} className="text-base text-gray-600 flex items-start">
                                                <span className="text-[#B7C4AC] mr-2">•</span>
                                                {title}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <PageTransition>
            <section className="min-h-screen flex items-center justify-center w-full bg-white px-4 sm:px-6 pt-8" id="about">
                <div className="max-w-[1000px] w-full mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        {/* Tabs */}
                        <div className="flex gap-8">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`text-xl font-medium transition-colors ${
                                        activeTab === tab.id 
                                            ? 'text-[#B7C4AC]' 
                                            : 'text-gray-400 hover:text-gray-600'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Contact Info - Always visible */}
                        <div className="flex items-center divide-x divide-gray-200">
                            <a 
                                href="/resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 text-[#B7C4AC] hover:text-[#95a68b] transition-colors font-medium"
                            >
                                View Resume
                            </a>
                            <div className="px-4 flex items-center gap-2">
                                <span className="text-gray-400">Get in touch:</span>
                                <a 
                                    href="mailto:rxlei@calpoly.edu"
                                    className="text-gray-600 hover:text-[#B7C4AC] transition-colors font-medium"
                                >
                                    rxlei@calpoly.edu
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="min-h-[400px] pb-16">
                        {renderTabContent()}
                    </div>
                </div>
            </section>
        </PageTransition>
    );
};

export default About;
