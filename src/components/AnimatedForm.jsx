import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnimatedForm = ({ children, onSubmit, formRef }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const formElements = container.querySelectorAll('.form-element');
        const button = container.querySelector('.submit-button');

        // Initial state
        gsap.set(formElements, {
            opacity: 0,
            y: 30,
            rotationX: -15,
            transformOrigin: "center bottom"
        });

        gsap.set(button, {
            opacity: 0,
            scale: 0.8,
            rotationY: -20
        });

        // Animate on scroll
        ScrollTrigger.create({
            trigger: container,
            start: "top 80%",
            onEnter: () => {
                // Animate form elements
                gsap.to(formElements, {
                    opacity: 1,
                    y: 0,
                    rotationX: 0,
                    duration: 0.8,
                    ease: "back.out(1.7)",
                    stagger: 0.15
                });

                // Animate button
                gsap.to(button, {
                    opacity: 1,
                    scale: 1,
                    rotationY: 0,
                    duration: 1,
                    ease: "elastic.out(1, 0.3)",
                    delay: 0.6
                });
            },
            once: true
        });

        // Add focus animations to inputs
        const inputs = container.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            const handleFocus = () => {
                gsap.to(input, {
                    scale: 1.02,
                    duration: 0.3,
                    ease: "power2.out"
                });
            };

            const handleBlur = () => {
                gsap.to(input, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            };

            input.addEventListener('focus', handleFocus);
            input.addEventListener('blur', handleBlur);
        });

        // Button hover animation
        if (button) {
            const handleMouseEnter = () => {
                gsap.to(button, {
                    scale: 1.05,
                    rotationX: -5,
                    duration: 0.3,
                    ease: "power2.out"
                });
            };

            const handleMouseLeave = () => {
                gsap.to(button, {
                    scale: 1,
                    rotationX: 0,
                    duration: 0.5,
                    ease: "elastic.out(1, 0.3)"
                });
            };

            button.addEventListener('mouseenter', handleMouseEnter);
            button.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.trigger === container) {
                    trigger.kill();
                }
            });
        };
    }, []);

    return (
        <div ref={containerRef} className="will-change-transform">
            <form 
                ref={formRef} 
                onSubmit={onSubmit} 
                className="space-y-6"
                style={{ transformStyle: 'preserve-3d' }}
            >
                {children}
            </form>
        </div>
    );
};

export default AnimatedForm;