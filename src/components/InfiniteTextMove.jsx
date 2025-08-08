import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const InfiniteTextMove = ({ text, direction = "left", speed = 1, className = "" }) => {
    const containerRef = useRef(null);
    const textRef1 = useRef(null);
    const textRef2 = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const text1 = textRef1.current;
        const text2 = textRef2.current;

        if (!container || !text1 || !text2) return;

        // Set initial positions
        gsap.set(text2, { x: "100%" });

        // Create infinite scroll animation
        const tl = gsap.timeline({ repeat: -1 });
        
        if (direction === "left") {
            tl.to([text1, text2], {
                x: "-100%",
                duration: 20 / speed,
                ease: "none"
            });
        } else {
            tl.to([text1, text2], {
                x: "100%",
                duration: 20 / speed,
                ease: "none"
            });
        }

        // Speed up on scroll
        ScrollTrigger.create({
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            onUpdate: (self) => {
                const velocity = self.getVelocity();
                const speedMultiplier = 1 + Math.abs(velocity) * 0.0001;
                tl.timeScale(speedMultiplier);
            }
        });

        return () => {
            tl.kill();
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.trigger === container) {
                    trigger.kill();
                }
            });
        };
    }, [direction, speed]);

    return (
        <div 
            ref={containerRef}
            className={`relative overflow-hidden whitespace-nowrap ${className}`}
        >
            <div className="flex">
                <div 
                    ref={textRef1}
                    className="flex-shrink-0 will-change-transform"
                >
                    {text}
                </div>
                <div 
                    ref={textRef2}
                    className="flex-shrink-0 will-change-transform"
                >
                    {text}
                </div>
            </div>
        </div>
    );
};

export default InfiniteTextMove;