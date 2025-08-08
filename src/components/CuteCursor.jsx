import React, { useState, useEffect } from 'react';

const CuteCursor = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isClicking, setIsClicking] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if device supports hover (desktop) vs touch-only (mobile)
        const checkIsMobile = () => {
            // Check if device has hover capability
            const hasHover = window.matchMedia('(hover: hover)').matches;
            const hasPointer = window.matchMedia('(pointer: fine)').matches;
            
            // If no hover or no fine pointer, it's likely mobile
            return !hasHover || !hasPointer || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        };

        setIsMobile(checkIsMobile());

        const updateMousePos = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        if (!checkIsMobile()) {
            window.addEventListener('mousemove', updateMousePos);
            window.addEventListener('mousedown', handleMouseDown);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', updateMousePos);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    // Don't render cursor on mobile devices
    if (isMobile) return null;

    return (
        <div
            className="fixed pointer-events-none z-[80] transition-transform duration-150 ease-out"
            style={{
                left: mousePos.x,
                top: mousePos.y,
                transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : 1})`
            }}
        >
            {/* Outer ring */}
            <div
                className="absolute rounded-full border-2 border-gray-300 transition-all duration-200"
                style={{
                    width: '32px',
                    height: '32px',
                    transform: 'translate(-50%, -50%)',
                    opacity: isClicking ? 0.8 : 0.6
                }}
            />
            {/* Inner dot */}
            <div
                className="absolute rounded-full transition-all duration-200"
                style={{
                    width: '6px',
                    height: '6px',
                    backgroundColor: '#B7C4AC',
                    transform: 'translate(-50%, -50%)',
                    boxShadow: isClicking ? '0 0 15px rgba(183, 196, 172, 0.8)' : '0 0 8px rgba(183, 196, 172, 0.4)'
                }}
            />
        </div>
    );
};

export default CuteCursor;