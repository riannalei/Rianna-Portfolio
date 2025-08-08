import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Analytics } from "@vercel/analytics/react";
import { useState, useEffect, useCallback } from 'react';

import Hero from './sections/Hero.jsx';
import About from "./sections/About.jsx";
import Projects from "./sections/Projects.jsx";
import Contact from "./sections/Contact.jsx";
import Footer from "./sections/Footer.jsx";
import Navigation from "./components/Navigation.jsx";
import CuteCursor from "./components/CuteCursor.jsx";
import ScrollingText from "./components/ScrollingText.jsx";
import PixelTransition from "./components/PixelTransition.jsx";

// Wrapper component for animations
const AnimatedRoutes = ({ onHomePageEnter }) => {
    const location = useLocation();
    
    useEffect(() => {
        if (location.pathname === '/') {
            onHomePageEnter();
        }
    }, [location.pathname, onHomePageEnter]);
    
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Hero />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/contact" element={<Contact />} />

            </Routes>
        </AnimatePresence>
    );
};

const App = () => {
    const [dimensions, setDimensions] = useState({ 
        width: typeof window !== 'undefined' ? window.innerWidth : 1920, 
        height: typeof window !== 'undefined' ? window.innerHeight : 1080 
    });
    const [transitionActive, setTransitionActive] = useState(true);
    const [showPixelTransition, setShowPixelTransition] = useState(false);

    const updateDimensions = () => {
        const { innerWidth, innerHeight } = window;
        setDimensions({ width: innerWidth, height: innerHeight });
    };

    const handleHomePageEnter = useCallback(() => {
        setShowPixelTransition(true);
        setTransitionActive(true);
        
        // Set dimensions immediately
        updateDimensions();
        
        // Start the transition immediately, then hide it after animation
        setTimeout(() => {
            setTransitionActive(false);
            // Also hide the transition component after animation completes
            setTimeout(() => {
                setShowPixelTransition(false);
            }, 500);
        }, 1600); // 1.6 second delay for full animation
    }, []);

    useEffect(() => {
        // Show body once component is ready
        document.body.classList.add('loaded');
        
        // Set up window resize listener
        window.addEventListener('resize', updateDimensions);
        
        // Check initial route
        if (window.location.pathname === '/') {
            handleHomePageEnter();
        }

        return () => {
            window.removeEventListener('resize', updateDimensions);
        };
    }, []);

    return (
        <Router>
            {showPixelTransition && (
                <PixelTransition 
                    isActive={transitionActive} 
                    dimensions={dimensions} 
                />
            )}
            <CuteCursor />
            <div className="min-h-screen bg-white flex">
                <Navigation />
                <main className="flex-1 md:pl-32 pl-0">
                    <AnimatedRoutes onHomePageEnter={handleHomePageEnter} />
                </main>
            </div>
            <Footer />
            <Analytics />
        </Router>
    );
};

export default App;
