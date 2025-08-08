import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AwwwardsLanding = ({ children, className = "" }) => {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const title = titleRef.current;
        const subtitle = subtitleRef.current;
        const content = contentRef.current;

        if (!container) return;

        // Create main timeline
        const tl = gsap.timeline({ delay: 0.5 });

        // Initial states
        gsap.set([title, subtitle, content], {
            opacity: 0,
            y: 100,
            rotationX: -90,
            transformOrigin: "center bottom"
        });

        // Animate title
        if (title) {
            tl.to(title, {
                opacity: 1,
                y: 0,
                rotationX: 0,
                duration: 1.2,
                ease: "power3.out"
            });
        }

        // Animate subtitle
        if (subtitle) {
            tl.to(subtitle, {
                opacity: 1,
                y: 0,
                rotationX: 0,
                duration: 1,
                ease: "power3.out"
            }, "-=0.8");
        }

        // Animate content
        if (content) {
            tl.to(content, {
                opacity: 1,
                y: 0,
                rotationX: 0,
                duration: 0.8,
                ease: "power3.out"
            }, "-=0.6");
        }

        // Parallax effect on scroll
        if (title || subtitle) {
            ScrollTrigger.create({
                trigger: container,
                start: "top center",
                end: "bottom center",
                scrub: 1,
                onUpdate: (self) => {
                    const progress = self.progress;
                    
                    if (title) {
                        gsap.to(title, {
                            y: -progress * 50,
                            rotationX: progress * 10,
                            duration: 0.3,
                            ease: "none"
                        });
                    }
                    
                    if (subtitle) {
                        gsap.to(subtitle, {
                            y: -progress * 30,
                            duration: 0.3,
                            ease: "none"
                        });
                    }
                }
            });
        }

        // Mouse parallax effect
        const handleMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            if (title) {
                gsap.to(title, {
                    x: deltaX * 20,
                    y: deltaY * 10,
                    rotationY: deltaX * 5,
                    duration: 0.6,
                    ease: "power2.out"
                });
            }
            
            if (subtitle) {
                gsap.to(subtitle, {
                    x: deltaX * 15,
                    y: deltaY * 8,
                    duration: 0.8,
                    ease: "power2.out"
                });
            }
        };

        const handleMouseLeave = () => {
            if (title) {
                gsap.to(title, {
                    x: 0,
                    y: 0,
                    rotationY: 0,
                    duration: 1,
                    ease: "elastic.out(1, 0.3)"
                });
            }
            
            if (subtitle) {
                gsap.to(subtitle, {
                    x: 0,
                    y: 0,
                    duration: 1,
                    ease: "elastic.out(1, 0.3)"
                });
            }
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
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
            className={`relative ${className}`}
            style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d'
            }}
        >
            <div className="relative z-10">
                <div ref={titleRef} className="awwwards-title">
                    <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 font-playfair mb-4">
                        Rianna Lei
                    </div>
                </div>
                
                <div ref={subtitleRef} className="awwwards-subtitle">
                    <div className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-6">
                        Software Developer
                    </div>
                </div>
                
                <div ref={contentRef} className="awwwards-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AwwwardsLanding;