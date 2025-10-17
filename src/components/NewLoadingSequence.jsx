import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

const NewLoadingSequence = ({ onComplete }) => {
    const [loadingProgress, setLoadingProgress] = useState(0);
    const containerRef = useRef(null);
    const nameRef = useRef(null);
    const riannaRef = useRef(null);
    const leiRef = useRef(null);
    const trapezoidLeftRef = useRef(null);
    const trapezoidRightRef = useRef(null);

    useEffect(() => {
        // Loading counter
        const loadingInterval = setInterval(() => {
            setLoadingProgress(prev => {
                if (prev >= 100) {
                    clearInterval(loadingInterval);
                    return 100;
                }
                return prev + Math.random() * 8 + 4;
            });
        }, 80);

        const tl = gsap.timeline({
            onComplete: () => {
                if (onComplete) onComplete();
            }
        });

        // Initial states
        gsap.set(nameRef.current, { opacity: 0, scale: 0.8 });
        gsap.set([riannaRef.current, leiRef.current], { opacity: 0 });
        gsap.set([trapezoidLeftRef.current, trapezoidRightRef.current], { 
            scaleX: 0,
            opacity: 0
        });

        // Animation sequence
        tl
            // 1. Wait for loading to complete (approx 2 seconds)
            .to({}, { duration: 2 })
            
            // 2. Show full name
            .to(nameRef.current, {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: "power2.out"
            })
            
            // 3. Wait a moment
            .to({}, { duration: 0.6 })
            
            // 4. Hide full name, show split names
            .to(nameRef.current, { opacity: 0, duration: 0.3 })
            .to([riannaRef.current, leiRef.current], { 
                opacity: 1, 
                duration: 0.3 
            }, "-=0.1")
            
            // 5. Split names apart
            .to(riannaRef.current, {
                x: -150,
                duration: 1,
                ease: "power2.inOut"
            })
            .to(leiRef.current, {
                x: 150,
                duration: 1,
                ease: "power2.inOut"
            }, "<")
            
            // 6. Show trapezoid in middle
            .to([trapezoidLeftRef.current, trapezoidRightRef.current], {
                scaleX: 1,
                opacity: 1,
                duration: 0.6,
                ease: "power2.out"
            })
            
            // 7. Wait briefly
            .to({}, { duration: 0.4 })
            
            // 8. Open trapezoid (split apart)
            .to(trapezoidLeftRef.current, {
                x: -300,
                duration: 1,
                ease: "power3.inOut"
            })
            .to(trapezoidRightRef.current, {
                x: 300,
                duration: 1,
                ease: "power3.inOut"
            }, "<")
            
            // 9. Fade out everything
            .to(containerRef.current, {
                opacity: 0,
                duration: 0.5,
                ease: "power2.out"
            });

        return () => {
            tl.kill();
            clearInterval(loadingInterval);
        };
    }, [onComplete]);

    return (
        <div 
            ref={containerRef}
            className="fixed inset-0 z-[60] bg-[#B7C4AC] flex items-center justify-center overflow-hidden"
        >
            {/* Loading Percentage */}
            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: loadingProgress >= 100 ? 0 : 1 }}
                className="fixed top-8 left-1/2 transform -translate-x-1/2 z-10"
            >
                <div className="text-3xl font-mono text-white pixel-title">
                    {Math.floor(loadingProgress)}%
                </div>
            </motion.div>

            {/* Full Name (initial) */}
            <div ref={nameRef} className="absolute">
                <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-white pixel-title">
                    RIANNA LEI
                </h1>
            </div>

            {/* Split Names Container */}
            <div className="flex items-center justify-center gap-32 relative">
                {/* Rianna */}
                <h1 
                    ref={riannaRef}
                    className="text-5xl sm:text-6xl md:text-7xl font-bold text-white pixel-title"
                >
                    RIANNA
                </h1>

                {/* Trapezoid Shapes in Middle */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-4">
                    <div
                        ref={trapezoidLeftRef}
                        className="w-32 h-48 bg-white"
                        style={{
                            clipPath: 'polygon(40% 0%, 100% 0%, 60% 100%, 0% 100%)',
                            transformOrigin: 'right center'
                        }}
                    />
                    <div
                        ref={trapezoidRightRef}
                        className="w-32 h-48 bg-white"
                        style={{
                            clipPath: 'polygon(0% 0%, 60% 0%, 100% 100%, 40% 100%)',
                            transformOrigin: 'left center'
                        }}
                    />
                </div>

                {/* Lei */}
                <h1 
                    ref={leiRef}
                    className="text-5xl sm:text-6xl md:text-7xl font-bold text-white pixel-title"
                >
                    LEI
                </h1>
            </div>
        </div>
    );
};

export default NewLoadingSequence;

