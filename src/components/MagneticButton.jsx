import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const MagneticButton = ({ children, className = "", intensity = 1 }) => {
    const buttonRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const button = buttonRef.current;
        const text = textRef.current;

        if (!button || !text) return;

        const handleMouseMove = (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const distance = Math.sqrt(x * x + y * y);
            const maxDistance = Math.max(rect.width, rect.height);
            
            if (distance < maxDistance) {
                const strength = (1 - distance / maxDistance) * intensity;
                
                gsap.to(button, {
                    x: x * strength * 0.3,
                    y: y * strength * 0.3,
                    scale: 1 + strength * 0.1,
                    duration: 0.6,
                    ease: "power2.out"
                });

                gsap.to(text, {
                    x: x * strength * 0.5,
                    y: y * strength * 0.5,
                    duration: 0.4,
                    ease: "power2.out"
                });
            }
        };

        const handleMouseLeave = () => {
            gsap.to(button, {
                x: 0,
                y: 0,
                scale: 1,
                duration: 1,
                ease: "elastic.out(1, 0.3)"
            });

            gsap.to(text, {
                x: 0,
                y: 0,
                duration: 1,
                ease: "elastic.out(1, 0.3)"
            });
        };

        button.addEventListener('mousemove', handleMouseMove);
        button.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            button.removeEventListener('mousemove', handleMouseMove);
            button.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [intensity]);

    return (
        <button
            ref={buttonRef}
            className={`relative overflow-hidden will-change-transform ${className}`}
            data-cursor-hover
            style={{ transformStyle: 'preserve-3d' }}
        >
            <span 
                ref={textRef}
                className="relative z-10 block will-change-transform"
                style={{ transformStyle: 'preserve-3d' }}
            >
                {children}
            </span>
        </button>
    );
};

export default MagneticButton;