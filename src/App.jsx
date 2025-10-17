import { BrowserRouter as Router } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react";
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

import Hero from './sections/Hero.jsx';
import About from "./sections/About.jsx";
import Skills from "./sections/Skills.jsx";
import Experience from "./sections/Experience.jsx";
import Projects from "./sections/Projects.jsx";
import Footer from "./sections/Footer.jsx";
import NewNavigation from "./components/NewNavigation.jsx";
import Preloader from "./components/Preloader.jsx";

const App = () => {
    const [showLoading, setShowLoading] = useState(true);

    useEffect(() => {
        console.log('App mounted');
        document.body.classList.add('loaded');
    }, []);

    const handleComplete = () => {
        console.log('Handle complete called');
        setShowLoading(false);
    };

    return (
        <Router>
            <NewNavigation />
            
            <AnimatePresence mode="wait">
                {showLoading && (
                    <Preloader key="preloader" onComplete={handleComplete} />
                )}
            </AnimatePresence>

            <main className="w-full">
                <Hero />
                <About />
                <Skills />
                <Experience />
                <Projects />
            </main>
            
            <Footer />
            <Analytics />
        </Router>
    );
};

export default App;
