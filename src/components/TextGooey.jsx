import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const TextGooey = ({ text, className = "" }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const letters = container.querySelectorAll('.gooey-letter');

        const handleMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            letters.forEach((letter, index) => {
                const letterRect = letter.getBoundingClientRect();
                const letterX = letterRect.left + letterRect.width / 2 - rect.left;
                const letterY = letterRect.top + letterRect.height / 2 - rect.top;
                
                const distance = Math.sqrt(Math.pow(x - letterX, 2) + Math.pow(y - letterY, 2));
                const maxDistance = 100;
                
                if (distance < maxDistance) {
                    const force = (1 - distance / maxDistance) * 20;
                    const angle = Math.atan2(letterY - y, letterX - x);
                    
                    gsap.to(letter, {
                        x: Math.cos(angle) * force,
                        y: Math.sin(angle) * force,
                        scale: 1 + force * 0.01,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                } else {
                    gsap.to(letter, {
                        x: 0,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        ease: "elastic.out(1, 0.3)"
                    });
                }
            });
        };

        const handleMouseLeave = () => {
            letters.forEach(letter => {
                gsap.to(letter, {
                    x: 0,
                    y: 0,
                    scale: 1,
                    duration: 1.2,
                    ease: "elastic.out(1, 0.3)"
                });
            });
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div 
            ref={containerRef}
            className={`relative cursor-pointer ${className}`}
            data-cursor-hover
        >
            {text.split('').map((char, index) => (
                <span
                    key={index}
                    className="gooey-letter inline-block will-change-transform"
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </div>
    );
};

export default TextGooey;