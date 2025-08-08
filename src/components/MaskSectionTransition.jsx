import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MaskSectionTransition = ({ children }) => {
    const containerRef = useRef(null);
    const maskRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const mask = maskRef.current;

        if (!container || !mask) return;

        // Create the mask reveal animation on scroll
        ScrollTrigger.create({
            trigger: container,
            start: "top center",
            end: "bottom center",
            scrub: 1,
            onUpdate: (self) => {
                const progress = self.progress;
                
                // Animate the mask path to create the reveal effect
                const pathLength = 1000;
                const currentLength = pathLength * (1 - progress);
                
                gsap.set(mask, {
                    attr: {
                        d: `M 0 0 L 0 ${currentLength} Q 500 ${currentLength + 100} 1000 ${currentLength} L 1000 0 Z`
                    }
                });
            }
        });

        // Initial entrance animation
        gsap.fromTo(container, 
            {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"
            },
            {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                duration: 1.5,
                ease: "power3.out",
                delay: 0.5
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.trigger === container) {
                    trigger.kill();
                }
            });
        };
    }, []);

    return (
        <div className="relative">
            <div 
                ref={containerRef}
                className="relative will-change-transform"
                style={{
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"
                }}
            >
                {children}
                
                {/* SVG Mask Overlay */}
                <div className="absolute inset-0 pointer-events-none">
                    <svg 
                        className="absolute inset-0 w-full h-full"
                        viewBox="0 0 1000 1000"
                        preserveAspectRatio="none"
                    >
                        <defs>
                            <mask id="sectionMask">
                                <rect width="100%" height="100%" fill="white" />
                                <path
                                    ref={maskRef}
                                    d="M 0 0 L 0 1000 Q 500 1100 1000 1000 L 1000 0 Z"
                                    fill="black"
                                />
                            </mask>
                        </defs>
                        <rect 
                            width="100%" 
                            height="100%" 
                            fill="transparent"
                            mask="url(#sectionMask)"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default MaskSectionTransition;