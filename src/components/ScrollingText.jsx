import InfiniteTextMove from './InfiniteTextMove.jsx';
import TextParallax from './TextParallax.jsx';

const ScrollingText = () => {
    const skills = "REACT • JAVASCRIPT • PYTHON • NODE.JS • THREE.JS • GSAP • TAILWIND • MONGODB • ";
    const creative = "CREATIVE • INNOVATIVE • PASSIONATE • DETAIL-ORIENTED • ";

    return (
        <div className="py-16 bg-gray-50 overflow-hidden">
            {/* First scrolling line */}
            <div className="mb-8">
                <InfiniteTextMove
                    text={skills}
                    direction="left"
                    speed={1}
                    className="text-4xl md:text-6xl font-bold text-gray-200 select-none"
                />
            </div>
            
            {/* Second scrolling line - opposite direction */}
            <div className="mb-8">
                <InfiniteTextMove
                    text={creative}
                    direction="right"
                    speed={0.8}
                    className="text-3xl md:text-5xl font-light text-[#B7C4AC] opacity-60 select-none"
                />
            </div>
            
            {/* Parallax text */}
            <div className="text-center">
                <TextParallax
                    text="FULL-STACK DEVELOPER"
                    speed={2}
                    className="text-2xl md:text-3xl font-medium text-gray-300 select-none"
                />
            </div>
        </div>
    );
};

export default ScrollingText;