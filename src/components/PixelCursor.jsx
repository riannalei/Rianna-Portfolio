import React, { useState, useEffect, useRef } from 'react';

const PixelCursor = () => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const gridRef = useRef(null);

    useEffect(() => {
        const updateWidth = () => {
            setWindowWidth(window.innerWidth);
        };
        
        const updateMousePos = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
            
            // Trigger pixel effect at mouse position
            if (gridRef.current) {
                const blockSize = window.innerWidth * 0.025;
                const col = Math.floor(e.clientX / (window.innerWidth * 0.025));
                const row = Math.floor(e.clientY / blockSize);
                
                const block = gridRef.current.querySelector(`[data-col="${col}"][data-row="${row}"]`);
                if (block) {
                    colorize(block);
                }
            }
        };
        
        updateWidth();
        window.addEventListener('resize', updateWidth);
        window.addEventListener('mousemove', updateMousePos);
        
        return () => {
            window.removeEventListener('resize', updateWidth);
            window.removeEventListener('mousemove', updateMousePos);
        };
    }, []);

    const getBlocks = (colIndex) => {
        const blockSize = windowWidth * 0.025; // 2.5vw blocks (smaller)
        const nbOfBlocks = Math.ceil(window.innerHeight / blockSize);
        
        return [...Array(nbOfBlocks).keys()].map((_, rowIndex) => {
            return (
                <div 
                    key={rowIndex}
                    className="pixel-cursor-block"
                    data-col={colIndex}
                    data-row={rowIndex}
                    style={{
                        width: '100%',
                        height: `${blockSize}px`,
                        backgroundColor: 'transparent',
                        transition: 'background-color 0.1s ease',
                        pointerEvents: 'none'
                    }}
                />
            );
        });
    };

    const colorize = (el) => {
        el.style.backgroundColor = 'rgba(183, 196, 172, 0.6)'; // Semi-transparent green
        setTimeout(() => {
            el.style.backgroundColor = 'transparent';
        }, 300);
    };

    if (windowWidth === 0) return null;

    return (
        <>
            {/* Pixel Trail Grid */}
            <div 
                ref={gridRef}
                className="fixed inset-0 pointer-events-none z-10 flex"
                style={{ 
                    pointerEvents: 'none'
                }}
            >
                {[...Array(40)].map((_, index) => (
                    <div 
                        key={`col_${index}`} 
                        className="flex flex-col"
                        style={{ 
                            width: '2.5vw', 
                            height: '100vh',
                            pointerEvents: 'none'
                        }}
                    >
                        {getBlocks(index)}
                    </div>
                ))}
            </div>
            
            {/* Visible Cursor Dot */}
            <div
                className="fixed pointer-events-none z-[70] transition-transform duration-100 ease-out"
                style={{
                    left: mousePos.x - 6,
                    top: mousePos.y - 6,
                    width: '12px',
                    height: '12px',
                    backgroundColor: '#B7C4AC',
                    borderRadius: '50%',
                    boxShadow: '0 0 8px rgba(183, 196, 172, 0.6)',
                    transform: 'translate(-50%, -50%)'
                }}
            />
        </>
    );
};

export default PixelCursor;