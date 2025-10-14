import { useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition.jsx';
import PerspectiveText from '../components/PerspectiveText.jsx';
import AnimatedTab from '../components/AnimatedTab.jsx';
import CreativeButton from '../components/CreativeButton.jsx';
import AnimatedSkill from '../components/AnimatedSkill.jsx';
import TextDisperse from '../components/TextDisperse/index.jsx';
import { workExperiences, mySkills } from '../constants/index.js';

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
                    <AnimatedTab isActive={activeTab === 'about'}>
                        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                            {/* Left Side - Image */}
                            <div className="w-full lg:w-[320px] flex justify-center lg:justify-start">
                                <div className="relative w-[280px] h-[280px] lg:w-[320px] lg:h-[320px] rounded-lg shadow-lg overflow-hidden">
                                    <img 
                                        src="/assets/rianna.jpeg" 
                                        alt="Rianna Lei" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            {/* Right Side - Content */}
                            <div className="flex-1">
                                <div className="space-y-6">
                                    {/* Terminal-style intro */}
                                    <div className="bg-gray-50 border-2 border-[#B7C4AC] rounded-lg p-4 sm:p-6 font-mono text-xs sm:text-sm overflow-x-auto">
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                                            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                            <div className="w-3 h-3 bg-[#B7C4AC] rounded-full"></div>
                                            <span className="text-gray-600 ml-2 text-xs sm:text-sm">rianna@portfolio:~$</span>
                                        </div>
                                        <div className="space-y-1 sm:space-y-2 text-[#8A9B7E] whitespace-nowrap sm:whitespace-normal">
                                            <p><span className="text-[#B7C4AC] font-semibold">const</span> developer = {`{`}</p>
                                            <p className="ml-2 sm:ml-4">name: <span className="text-gray-700">"Rianna Lei"</span>,</p>
                                            <p className="ml-2 sm:ml-4">location: <span className="text-gray-700">"Cal Poly SLO"</span>,</p>
                                            <p className="ml-2 sm:ml-4">passion: <span className="text-gray-700">"Building innovative solutions"</span>,</p>
                                            <p className="ml-2 sm:ml-4">status: <span className="text-gray-700">"Available for opportunities"</span></p>
                                            <p>{`};`}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <p className="text-lg text-gray-600 leading-relaxed">
                                            <TextDisperse>I'm a Senior Computer Science student at California Polytechnic University, San Luis Obispo, with a passion for creating innovative digital experiences. My journey in tech is driven by curiosity and a desire to build solutions that make a difference.</TextDisperse>
                                        </p>
                                        <p className="text-gray-600 leading-relaxed">
                                            <TextDisperse>Beyond coding, I find joy in exploring new places, discovering cozy coffee spots, and immersing myself in nature. My love for art and music often inspires creative approaches to my technical projects.</TextDisperse>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AnimatedTab>
                );
            case 'skills':
                return (
                    <AnimatedTab isActive={activeTab === 'skills'}>
                        <div className="w-full space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {mySkills.map((skillCategory, categoryIndex) => (
                                    <div key={skillCategory.category} className="space-y-4">
                                        <h3 className="text-xl font-medium text-gray-900 mb-4">{skillCategory.category}</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {skillCategory.skills.map((skill, index) => (
                                                <motion.span 
                                                    key={skill.name} 
                                                    className="px-3 py-1 bg-[#B7C4AC] bg-opacity-20 text-[#8A9B7E] rounded-full text-sm font-medium cursor-pointer"
                                                    whileHover={{ 
                                                        scale: 1.05, 
                                                        backgroundColor: 'rgba(183, 196, 172, 0.3)' 
                                                    }}
                                                    whileTap={{ scale: 0.95 }}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: (categoryIndex * skillCategory.skills.length + index) * 0.05 }}
                                                >
                                                    {skill.name}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </AnimatedTab>
                );
            case 'experience':
                return (
                    <AnimatedTab isActive={activeTab === 'experience'}>
                        <div className="max-w-2xl mx-auto">
                            <div className="space-y-8">
                                {workExperiences.map((item, index) => (
                                    <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow" data-cursor-hover>
                                        <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                                        <p className="text-base text-gray-600">
                                            {item.pos} — <span className="text-[#B7C4AC] font-medium">{item.duration}</span>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </AnimatedTab>
                );
            default:
                return null;
        }
    };

    return (
        <PageTransition>
            <section className="min-h-screen flex items-center justify-center w-full bg-white px-4 sm:px-6 py-16 md:py-8" id="about">
                <div className="max-w-[1000px] w-full mx-auto">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 sm:gap-0">
                        {/* Creative Tabs */}
                        <div className="flex gap-2 sm:gap-4 flex-wrap justify-center sm:justify-start">
                            {tabs.map(tab => (
                                <CreativeButton
                                    key={tab.id}
                                    isActive={activeTab === tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                >
                                    {tab.label}
                                </CreativeButton>
                            ))}
                        </div>

                        {/* Contact Info - Always visible */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-0 sm:divide-x divide-gray-200">
                            <a 
                                href="/Rianna_Lei_Resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-0 sm:px-4 text-[#B7C4AC] hover:text-[#95a68b] transition-colors font-medium text-sm sm:text-base"
                            >
                                View Resume
                            </a>
                            <div className="px-0 sm:px-4 flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
                                <span className="text-gray-400 text-sm">Get in touch:</span>
                                <a 
                                    href="mailto:rxlei@calpoly.edu"
                                    className="text-gray-600 hover:text-[#B7C4AC] transition-colors font-medium text-sm sm:text-base"
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
