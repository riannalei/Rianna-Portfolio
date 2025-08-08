import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const AnimatedTab = ({ children, isActive, delay = 0 }) => {
    const contentRef = useRef(null);

    useEffect(() => {
        const content = contentRef.current;
        if (!content) return;

        if (isActive) {
            // Reset and animate in
            gsap.fromTo(content, 
                {
                    opacity: 0,
                    y: 30,
                    rotationX: -15,
                    transformOrigin: "center top"
                },
                {
                    opacity: 1,
                    y: 0,
                    rotationX: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    delay: delay
                }
            );

            // Animate child elements with stagger
            const childElements = content.querySelectorAll('p, h3, li, div');
            gsap.fromTo(childElements,
                {
                    opacity: 0,
                    x: -20,
                    rotationY: -10
                },
                {
                    opacity: 1,
                    x: 0,
                    rotationY: 0,
                    duration: 0.6,
                    ease: "power2.out",
                    stagger: 0.1,
                    delay: delay + 0.2
                }
            );
        } else {
            // Animate out quickly
            gsap.to(content, {
                opacity: 0,
                y: -20,
                duration: 0.3,
                ease: "power2.in"
            });
        }
    }, [isActive, delay]);

    return (
        <div 
            ref={contentRef}
            className="will-change-transform"
            style={{
                transformStyle: 'preserve-3d',
                opacity: 0
            }}
        >
            {children}
        </div>
    );
};

export default AnimatedTab;