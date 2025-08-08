import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TextParallax = ({ text, className = "", speed = 1 }) => {
    const containerRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const textElement = textRef.current;

        if (!container || !textElement) return;

        // Create parallax effect
        ScrollTrigger.create({
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            onUpdate: (self) => {
                const progress = self.progress;
                const movement = (progress - 0.5) * 100 * speed;
                
                gsap.set(textElement, {
                    x: movement,
                    rotationY: movement * 0.1,
                    skewX: movement * 0.02,
                });
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.trigger === container) {
                    trigger.kill();
                }
            });
        };
    }, [speed]);

    return (
        <div ref={containerRef} className="overflow-hidden">
            <div 
                ref={textRef}
                className={`whitespace-nowrap will-change-transform ${className}`}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {text}
            </div>
        </div>
    );
};

export default TextParallax;