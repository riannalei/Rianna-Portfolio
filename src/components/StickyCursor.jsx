import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const StickyCursor = () => {
    const cursorRef = useRef(null);
    const cursorDotRef = useRef(null);
    const isMoving = useRef(false);

    useEffect(() => {
        const cursor = cursorRef.current;
        const cursorDot = cursorDotRef.current;

        if (!cursor || !cursorDot) return;

        // Set initial cursor styles
        gsap.set(cursor, {
            xPercent: -50,
            yPercent: -50,
            scale: 1,
        });

        gsap.set(cursorDot, {
            xPercent: -50,
            yPercent: -50,
        });

        // Mouse move handler
        const handleMouseMove = (e) => {
            isMoving.current = true;
            
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.6,
                ease: "power2.out"
            });

            gsap.to(cursorDot, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: "power2.out"
            });
        };

        // Mouse enter handler for interactive elements
        const handleMouseEnter = () => {
            gsap.to(cursor, {
                scale: 2,
                duration: 0.3,
                ease: "power2.out"
            });
        };

        // Mouse leave handler for interactive elements
        const handleMouseLeave = () => {
            gsap.to(cursor, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        };

        // Add event listeners
        document.addEventListener('mousemove', handleMouseMove);
        
        // Add hover effects to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, [data-cursor-hover]');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    return (
        <>
            {/* Main cursor */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-8 h-8 border-2 border-[#B7C4AC] rounded-full pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    transform: 'translate(-50%, -50%)'
                }}
            />
            
            {/* Cursor dot */}
            <div
                ref={cursorDotRef}
                className="fixed top-0 left-0 w-2 h-2 bg-[#B7C4AC] rounded-full pointer-events-none z-[9999]"
                style={{
                    transform: 'translate(-50%, -50%)'
                }}
            />
        </>
    );
};

export default StickyCursor;