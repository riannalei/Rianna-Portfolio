import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const NameReveal = ({ onComplete }) => {
    const containerRef = useRef(null);
    const nameRef = useRef(null);
    const maskRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const name = nameRef.current;
        const mask = maskRef.current;

        if (!container || !name || !mask) return;

        // Create timeline
        const tl = gsap.timeline({
            onComplete: () => {
                if (onComplete) onComplete();
            }
        });

        // Initial state
        gsap.set(name, { opacity: 0, y: 30 });
        gsap.set(mask, { clipPath: "circle(0% at 50% 50%)" });

        // Animation sequence
        tl.to(name, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.3
        })
        .to(mask, {
            clipPath: "circle(150% at 50% 50%)",
            duration: 1.2,
            ease: "power3.inOut",
            delay: 0.5
        })
        .to(container, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.out"
        }, "-=0.3");

        return () => {
            tl.kill();
        };
    }, [onComplete]);

    return (
        <div 
            ref={containerRef}
            className="fixed inset-0 z-[60] bg-[#B7C4AC] flex items-center justify-center"
        >
            {/* Name */}
            <div ref={nameRef} className="relative z-10">
                <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold text-white pixel-title text-center">
                    RIANNA LEI
                </h1>
            </div>
            
            {/* Mask overlay */}
            <div
                ref={maskRef}
                className="absolute inset-0 bg-white"
                style={{
                    clipPath: "circle(0% at 50% 50%)"
                }}
            />
        </div>
    );
};

export default NameReveal;

