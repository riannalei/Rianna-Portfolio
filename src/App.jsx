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
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [showLoadingScreen, setShowLoadingScreen] = useState(false);

    const updateDimensions = () => {
        const { innerWidth, innerHeight } = window;
        setDimensions({ width: innerWidth, height: innerHeight });
    };

    const handleHomePageEnter = useCallback(() => {
        setShowPixelTransition(true);
        setTransitionActive(true);
        setLoadingProgress(0);
        
        // Set dimensions immediately
        updateDimensions();
        
        // Loading counter during pixel transition
        const loadingInterval = setInterval(() => {
            setLoadingProgress(prev => {
                if (prev >= 100) {
                    clearInterval(loadingInterval);
                    return 100;
                }
                return prev + Math.random() * 8 + 4; // Random increment between 4-12
            });
        }, 80); // Update every 80ms
        
        // Hide pixel transition after animation
        setTimeout(() => {
            setTransitionActive(false);
            setTimeout(() => {
                setShowPixelTransition(false);
                setLoadingProgress(0); // Reset for next time
            }, 500);
        }, 1600);
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
                <>
                    <PixelTransition 
                        isActive={transitionActive} 
                        dimensions={dimensions} 
                    />
                    {/* Small loading percentage on top of pixels */}
                    <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-[70]">
                        <div className="text-2xl font-mono text-white pixel-title">
                            {Math.floor(loadingProgress)}%
                        </div>
                    </div>
                </>
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
