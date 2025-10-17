import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Footer = () => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end end"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [-500, 0]);

    return (
        <>
            {/* Spacer to create sticky effect */}
            <div className="h-[60vh]" />
            
            <div ref={container} className="relative h-screen">
                <motion.div 
                    style={{ y }}
                    className="sticky bottom-0 h-screen bg-[#B7C4AC] flex flex-col items-center justify-center text-white overflow-hidden"
                >
                    {/* Footer Content */}
                    <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
                        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16">
                            {/* Left: Main CTA */}
                            <div className="flex-1">
                                <h2 className="text-5xl sm:text-6xl md:text-7xl font-light mb-6">
                                    Let's connect
                                </h2>
                                <p className="text-xl text-white/80 max-w-xl">
                                    I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                                </p>
                            </div>

                            {/* Right: Contact Info */}
                            <div className="flex-1 flex flex-col gap-8">
                                <div>
                                    <h3 className="text-sm uppercase tracking-wider text-white/60 mb-3">Email</h3>
                                    <a 
                                        href="mailto:riannalei@gmail.com" 
                                        className="text-2xl hover:opacity-70 transition-opacity"
                                    >
                                        riannalei@gmail.com
                                    </a>
                                </div>

                                <div>
                                    <h3 className="text-sm uppercase tracking-wider text-white/60 mb-3">Socials</h3>
                                    <div className="flex gap-6">
                                        <a 
                                            href="https://github.com/riannalei" 
                                            target="_blank" 
                                            rel="noreferrer"
                                            className="text-lg hover:opacity-70 transition-opacity"
                                        >
                                            GitHub
                                        </a>
                                        <a 
                                            href="https://www.linkedin.com/in/riannalei/" 
                                            target="_blank" 
                                            rel="noreferrer"
                                            className="text-lg hover:opacity-70 transition-opacity"
                                        >
                                            LinkedIn
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Bar */}
                        <div className="border-t border-white/20 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                            <p className="text-sm text-white/60">© 2024 Rianna Lei. All rights reserved.</p>
                            <div className="flex gap-6">
                                <a 
                                    href="/Rianna_Lei_Resume.pdf" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-sm text-white/80 hover:text-white transition-colors"
                                >
                                    Resume
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 0.1, scale: 1 }}
                        transition={{ duration: 1.5 }}
                        className="absolute -right-40 -bottom-40 w-96 h-96 rounded-full bg-white"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 0.1, scale: 1 }}
                        transition={{ duration: 1.5, delay: 0.2 }}
                        className="absolute -left-40 -top-40 w-96 h-96 rounded-full bg-white"
                    />
                </motion.div>
            </div>
        </>
    );
};

export default Footer;
