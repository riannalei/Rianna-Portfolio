import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CoolHeroSection = ({ children }) => {
    const containerRef = useRef(null);
    const layer1Ref = useRef(null);
    const layer2Ref = useRef(null);
    const layer3Ref = useRef(null);
    const maskPathRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const layer1 = layer1Ref.current;
        const layer2 = layer2Ref.current;
        const layer3 = layer3Ref.current;
        const maskPath = maskPathRef.current;

        if (!container || !layer1 || !layer2 || !layer3 || !maskPath) return;

        // Initial setup
        gsap.set([layer1, layer2, layer3], {
            opacity: 0,
            y: 100
        });

        // Create entrance timeline
        const tl = gsap.timeline({ delay: 1.2 });

        // Animate layers in sequence
        tl.to(layer1, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out"
        })
        .to(layer2, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out"
        }, "-=0.6")
        .to(layer3, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.4");

        // Mask reveal animation on scroll
        ScrollTrigger.create({
            trigger: container,
            start: "top center",
            end: "bottom top",
            scrub: 1,
            onUpdate: (self) => {
                const progress = self.progress;
                
                // Create dynamic mask path
                const height = 100 - (progress * 100);
                const curve = 50 + (progress * 100);
                
                gsap.set(maskPath, {
                    attr: {
                        d: `M0,0 L100,0 L100,${height} Q50,${height + curve/2} 0,${height} Z`
                    }
                });

                // Parallax effect on layers
                gsap.set(layer1, {
                    y: -progress * 150,
                    scale: 1 + progress * 0.1
                });
                
                gsap.set(layer2, {
                    y: -progress * 100
                });
                
                gsap.set(layer3, {
                    y: -progress * 50
                });
            }
        });

        // Mouse parallax effect
        const handleMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            gsap.to(layer1, {
                x: x * 30,
                y: y * 20,
                rotationX: y * 10,
                rotationY: x * 10,
                duration: 1,
                ease: "power2.out"
            });

            gsap.to(layer2, {
                x: x * 20,
                y: y * 15,
                duration: 1.2,
                ease: "power2.out"
            });

            gsap.to(layer3, {
                x: x * 10,
                y: y * 10,
                duration: 1.5,
                ease: "power2.out"
            });
        };

        container.addEventListener('mousemove', handleMouseMove);

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            tl.kill();
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.trigger === container) {
                    trigger.kill();
                }
            });
        };
    }, []);

    return (
        <div 
            ref={containerRef}
            className="relative overflow-hidden"
            style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px'
            }}
        >
            {/* Background Layer */}
            <div 
                ref={layer1Ref}
                className="absolute inset-0 z-0"
                style={{ transformStyle: 'preserve-3d' }}
            >
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#B7C4AC]/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#9FB094]/5 rounded-full blur-3xl"></div>
            </div>

            {/* Content Layer */}
            <div 
                ref={layer2Ref}
                className="relative z-10"
                style={{ transformStyle: 'preserve-3d' }}
            >
                {children}
            </div>

            {/* Floating Elements Layer */}
            <div 
                ref={layer3Ref}
                className="absolute inset-0 z-5 pointer-events-none"
                style={{ transformStyle: 'preserve-3d' }}
            >
                <div className="absolute top-20 left-20 w-4 h-4 bg-[#B7C4AC] rounded-full opacity-60 animate-pulse"></div>
                <div className="absolute top-40 right-32 w-2 h-2 bg-[#9FB094] rounded-full opacity-40"></div>
                <div className="absolute bottom-32 left-1/3 w-3 h-3 bg-[#B7C4AC] rounded-full opacity-50"></div>
                <div className="absolute bottom-20 right-20 w-5 h-5 border border-[#B7C4AC] rounded-full opacity-30"></div>
            </div>

            {/* SVG Mask */}
            <div className="absolute inset-0 pointer-events-none z-20">
                <svg 
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                >
                    <defs>
                        <clipPath id="heroMask">
                            <path
                                ref={maskPathRef}
                                d="M0,0 L100,0 L100,100 Q50,150 0,100 Z"
                                fill="white"
                            />
                        </clipPath>
                    </defs>
                </svg>
            </div>
        </div>
    );
};

export default CoolHeroSection;