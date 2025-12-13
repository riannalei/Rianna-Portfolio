import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const HolographicCard = ({ src, alt, isFlipped }) => {
    const cardRef = useRef(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const [glareX, setGlareX] = useState(50);
    const [glareY, setGlareY] = useState(50);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const handleMouseMove = (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate rotation based on mouse position
            const rotX = ((y - centerY) / centerY) * -15; // -15 to 15 degrees
            const rotY = ((x - centerX) / centerX) * 15; // -15 to 15 degrees
            
            setRotateX(rotX);
            setRotateY(rotY);
            
            // Calculate glare position (0-100%)
            const glareXPos = (x / rect.width) * 100;
            const glareYPos = (y / rect.height) * 100;
            
            setGlareX(glareXPos);
            setGlareY(glareYPos);
        };

        const handleMouseEnter = () => {
            setIsHovering(true);
        };

        const handleMouseLeave = () => {
            setIsHovering(false);
            setRotateX(0);
            setRotateY(0);
            setGlareX(50);
            setGlareY(50);
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseenter', handleMouseEnter);
            card.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div
            ref={cardRef}
            className="relative w-full h-full"
            style={{
                transform: isFlipped && isHovering 
                    ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)` 
                    : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
                transition: isHovering ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
                transformStyle: 'preserve-3d',
            }}
        >
            {/* Base card image */}
            <img
                src={src}
                alt={alt}
                loading="lazy"
                decoding="async"
                className="block w-full h-full object-cover rounded-2xl"
                style={{ position: 'relative', zIndex: 1 }}
            />
            
            {/* Holographic layers - only visible when flipped */}
            {isFlipped && (
                <>
                    {/* Gold glitter layer 1 */}
                    <div
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        style={{
                            background: `
                                repeating-linear-gradient(
                                    0deg,
                                    rgba(255, 215, 0, 0.1) 0px,
                                    rgba(255, 223, 0, 0.2) 2px,
                                    transparent 2px,
                                    transparent 4px
                                ),
                                repeating-linear-gradient(
                                    90deg,
                                    rgba(255, 215, 0, 0.1) 0px,
                                    rgba(255, 223, 0, 0.2) 2px,
                                    transparent 2px,
                                    transparent 4px
                                ),
                                radial-gradient(
                                    circle at ${glareX}% ${glareY}%,
                                    rgba(255, 255, 255, 0.3),
                                    transparent 50%
                                )
                            `,
                            transform: `translateX(${(glareX - 50) * 0.1}px) translateY(${(glareY - 50) * 0.1}px)`,
                            mixBlendMode: 'overlay',
                            opacity: isHovering ? 0.9 : 0.7,
                            transition: 'opacity 0.3s ease, transform 0.1s ease',
                            zIndex: 2,
                        }}
                    />
                    
                    {/* Gold glitter layer 2 - moves opposite direction */}
                    <div
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        style={{
                            background: `
                                repeating-linear-gradient(
                                    45deg,
                                    rgba(255, 215, 0, 0.15) 0px,
                                    rgba(255, 223, 0, 0.25) 1px,
                                    transparent 1px,
                                    transparent 3px
                                ),
                                repeating-linear-gradient(
                                    -45deg,
                                    rgba(255, 215, 0, 0.15) 0px,
                                    rgba(255, 223, 0, 0.25) 1px,
                                    transparent 1px,
                                    transparent 3px
                                )
                            `,
                            transform: `translateX(${-(glareX - 50) * 0.15}px) translateY(${-(glareY - 50) * 0.15}px)`,
                            mixBlendMode: 'overlay',
                            opacity: isHovering ? 0.8 : 0.6,
                            transition: 'opacity 0.3s ease, transform 0.1s ease',
                            zIndex: 3,
                        }}
                    />
                    
                    {/* Rainbow holographic gradient */}
                    <div
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        style={{
                            background: `
                                linear-gradient(
                                    ${(glareX + glareY) * 1.8}deg,
                                    transparent 20%,
                                    rgba(255, 0, 255, 0.3) 30%,
                                    rgba(0, 255, 255, 0.3) 40%,
                                    rgba(255, 255, 0, 0.3) 50%,
                                    rgba(255, 0, 0, 0.3) 60%,
                                    transparent 70%
                                )
                            `,
                            mixBlendMode: 'color-dodge',
                            opacity: isHovering ? 0.7 : 0.5,
                            transition: 'background 0.1s ease, opacity 0.3s ease',
                            zIndex: 4,
                        }}
                    />
                    
                    {/* Sparkle effect */}
                    <div
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        style={{
                            background: `
                                radial-gradient(
                                    circle at ${glareX}% ${glareY}%,
                                    rgba(255, 255, 255, 0.8) 0%,
                                    rgba(255, 255, 255, 0.4) 10%,
                                    transparent 20%
                                )
                            `,
                            opacity: isHovering ? 0.9 : 0,
                            transition: 'opacity 0.2s ease',
                            zIndex: 5,
                        }}
                    />
                    
                    {/* Glare shine */}
                    <div
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        style={{
                            background: `
                                linear-gradient(
                                    ${Math.atan2(glareY - 50, glareX - 50) * (180 / Math.PI) + 90}deg,
                                    transparent 30%,
                                    rgba(255, 255, 255, 0.4) 50%,
                                    transparent 70%
                                )
                            `,
                            transform: `translateX(${(glareX - 50) * 0.3}px) translateY(${(glareY - 50) * 0.3}px)`,
                            opacity: isHovering ? 0.5 : 0,
                            transition: 'opacity 0.2s ease, transform 0.1s ease',
                            zIndex: 6,
                        }}
                    />
                </>
            )}
        </div>
    );
};

export default HolographicCard;

