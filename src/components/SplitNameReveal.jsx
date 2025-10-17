import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const SplitNameReveal = ({ onComplete }) => {
    const containerRef = useRef(null);
    const leftTextRef = useRef(null);
    const rightTextRef = useRef(null);
    const maskRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const leftText = leftTextRef.current;
        const rightText = rightTextRef.current;
        const mask = maskRef.current;

        if (!container || !leftText || !rightText || !mask) return;

        // Create timeline
        const tl = gsap.timeline({
            onComplete: () => {
                if (onComplete) onComplete();
            }
        });

        // Initial state
        gsap.set([leftText, rightText], { opacity: 1 });
        gsap.set(mask, { 
            clipPath: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)" // Start as vertical line
        });

        // Animation sequence - diamond/trapezoid expansion
        tl.to(mask, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // Expand to full screen
            duration: 1.5,
            ease: "power3.inOut",
            delay: 0.8
        })
        .to(container, {
            opacity: 0,
            duration: 0.4,
            ease: "power2.out"
        }, "-=0.4");

        return () => {
            tl.kill();
        };
    }, [onComplete]);

    return (
        <div 
            ref={containerRef}
            className="fixed inset-0 z-[60] bg-[#B7C4AC] flex items-center justify-center overflow-hidden"
        >
            {/* Split Name */}
            <div className="flex items-center justify-center gap-8 sm:gap-16 md:gap-24 relative z-10">
                <h1 ref={leftTextRef} className="text-4xl sm:text-5xl md:text-7xl font-bold text-white pixel-title">
                    RIANNA
                </h1>
                <h1 ref={rightTextRef} className="text-4xl sm:text-5xl md:text-7xl font-bold text-white pixel-title">
                    LEI
                </h1>
            </div>
            
            {/* Mask overlay - diamond/trapezoid expanding from center */}
            <div
                ref={maskRef}
                className="absolute inset-0 bg-white"
                style={{
                    clipPath: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)"
                }}
            />
        </div>
    );
};

export default SplitNameReveal;

