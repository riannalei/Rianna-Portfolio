import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const PaintReveal = ({ children, className = "", revealColor = "#B7C4AC" }) => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const isRevealing = useRef(false);

    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;

        if (!container || !canvas) return;

        const ctx = canvas.getContext('2d');
        const rect = container.getBoundingClientRect();
        
        canvas.width = rect.width;
        canvas.height = rect.height;

        // Fill canvas with reveal color
        ctx.fillStyle = revealColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const handleMouseMove = (e) => {
            if (!isRevealing.current) return;

            const canvasRect = canvas.getBoundingClientRect();
            const x = e.clientX - canvasRect.left;
            const y = e.clientY - canvasRect.top;

            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(x, y, 40, 0, 2 * Math.PI);
            ctx.fill();
        };

        const handleMouseDown = () => {
            isRevealing.current = true;
        };

        const handleMouseUp = () => {
            isRevealing.current = false;
        };

        const handleMouseEnter = () => {
            gsap.to(canvas, {
                opacity: 0.8,
                duration: 0.3,
                ease: "power2.out"
            });
        };

        const handleMouseLeave = () => {
            isRevealing.current = false;
            gsap.to(canvas, {
                opacity: 0,
                duration: 0.5,
                ease: "power2.out"
            });
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mousedown', handleMouseDown);
        container.addEventListener('mouseup', handleMouseUp);
        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mousedown', handleMouseDown);
            container.removeEventListener('mouseup', handleMouseUp);
            container.removeEventListener('mouseenter', handleMouseEnter);
            container.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [revealColor]);

    return (
        <div 
            ref={containerRef}
            className={`relative ${className}`}
            data-cursor-hover
        >
            {children}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 pointer-events-none opacity-0"
                style={{ mixBlendMode: 'multiply' }}
            />
        </div>
    );
};

export default PaintReveal;