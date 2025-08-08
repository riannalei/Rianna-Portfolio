import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const MaskEntry = ({ children, className = "" }) => {
    const maskRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const mask = maskRef.current;
        const container = containerRef.current;

        if (!mask || !container) return;

        // Set initial state
        gsap.set(mask, {
            clipPath: "circle(0% at 50% 50%)",
            opacity: 1
        });

        gsap.set(container, {
            opacity: 0
        });

        // Create timeline for smooth entry
        const tl = gsap.timeline();

        // Animate the mask expanding
        tl.to(mask, {
            clipPath: "circle(150% at 50% 50%)",
            duration: 1.2,
            ease: "power2.out",
        })
        .to(container, {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.6")
        .to(mask, {
            opacity: 0,
            duration: 0.4,
            ease: "power2.out"
        }, "-=0.2");

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <div className={`relative ${className}`}>
            {/* Mask overlay */}
            <div
                ref={maskRef}
                className="fixed inset-0 bg-gradient-to-br from-[#B7C4AC] via-[#9FB094] to-[#8A9B7E] z-50 pointer-events-none"
                style={{
                    clipPath: "circle(0% at 50% 50%)"
                }}
            />
            
            {/* Content */}
            <div ref={containerRef} className="relative z-10">
                {children}
            </div>
        </div>
    );
};

export default MaskEntry;