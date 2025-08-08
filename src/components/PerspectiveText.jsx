import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const PerspectiveText = ({ 
    text, 
    className = "",
    triggerOnScroll = false,
    delay = 0 
}) => {
    const containerRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const textElement = textRef.current;

        if (!container || !textElement) return;

        // Split text into individual characters
        const chars = text.split('').map((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.display = 'inline-block';
            span.style.transformOrigin = 'center bottom';
            span.style.opacity = '0';
            span.style.transform = 'rotateX(90deg) translateY(50px)';
            return span;
        });

        // Clear and append new spans
        textElement.innerHTML = '';
        chars.forEach(char => textElement.appendChild(char));

        const animateText = () => {
            // Animate each character
            gsap.fromTo(chars, {
                opacity: 0,
                rotationX: 90,
                y: 50,
                z: -100,
            }, {
                opacity: 1,
                rotationX: 0,
                y: 0,
                z: 0,
                duration: 1.2,
                ease: "back.out(1.7)",
                stagger: {
                    amount: 0.8,
                    from: "start"
                },
                delay: delay,
                transformOrigin: "center bottom"
            });

            // Add a subtle floating animation after initial animation
            gsap.to(chars, {
                y: -5,
                duration: 2,
                ease: "power2.inOut",
                stagger: {
                    amount: 0.5,
                    repeat: -1,
                    yoyo: true
                },
                delay: delay + 1.5
            });
        };

        if (triggerOnScroll) {
            ScrollTrigger.create({
                trigger: container,
                start: "top 80%",
                onEnter: animateText,
                once: true
            });
        } else {
            // Animate immediately
            setTimeout(animateText, 100);
        }

        // Mouse interaction
        const handleMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            gsap.to(textElement, {
                rotationY: deltaX * 15,
                rotationX: deltaY * -15,
                duration: 0.6,
                ease: "power2.out",
                transformOrigin: "center center"
            });
        };

        const handleMouseLeave = () => {
            gsap.to(textElement, {
                rotationY: 0,
                rotationX: 0,
                duration: 1,
                ease: "elastic.out(1, 0.3)"
            });
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.trigger === container) {
                    trigger.kill();
                }
            });
        };
    }, [text, triggerOnScroll, delay]);

    return (
        <div 
            ref={containerRef}
            className={`perspective-1000 ${className}`}
            style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d'
            }}
            data-cursor-hover
        >
            <div
                ref={textRef}
                className="inline-block"
                style={{
                    transformStyle: 'preserve-3d'
                }}
            />
        </div>
    );
};

export default PerspectiveText;