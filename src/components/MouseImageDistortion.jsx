import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const MouseImageDistortion = ({ src, alt, className = "", children }) => {
    const imageRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const image = imageRef.current;
        const container = containerRef.current;

        if (!image || !container) return;

        // Mouse move handler
        const handleMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate distance from center
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            // Apply distortion based on mouse position
            gsap.to(image, {
                rotationX: deltaY * -10,
                rotationY: deltaX * 10,
                skewX: deltaX * 5,
                skewY: deltaY * -5,
                scale: 1.05,
                duration: 0.6,
                ease: "power2.out",
                transformOrigin: "center center"
            });
        };

        // Mouse leave handler
        const handleMouseLeave = () => {
            gsap.to(image, {
                rotationX: 0,
                rotationY: 0,
                skewX: 0,
                skewY: 0,
                scale: 1,
                duration: 0.8,
                ease: "elastic.out(1, 0.3)",
                transformOrigin: "center center"
            });
        };

        // Mouse enter handler
        const handleMouseEnter = () => {
            gsap.to(image, {
                scale: 1.02,
                duration: 0.3,
                ease: "power2.out"
            });
        };

        // Add event listeners
        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);
        container.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
            container.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, []);

    return (
        <div 
            ref={containerRef}
            className={`relative overflow-hidden cursor-pointer ${className}`}
            data-cursor-hover
        >
            {src ? (
                <img
                    ref={imageRef}
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover will-change-transform"
                    style={{
                        transformStyle: 'preserve-3d'
                    }}
                />
            ) : (
                <div
                    ref={imageRef}
                    className="w-full h-full will-change-transform"
                    style={{
                        transformStyle: 'preserve-3d'
                    }}
                >
                    {children}
                </div>
            )}
        </div>
    );
};

export default MouseImageDistortion;