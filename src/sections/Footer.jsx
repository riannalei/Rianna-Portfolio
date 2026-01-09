import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <div 
            className="relative h-screen overflow-x-hidden"
            style={{clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"}}
        >
            <div className="fixed bottom-0 h-screen w-full overflow-x-hidden">
                <div className="h-full bg-[#B7C4AC] flex flex-col items-center justify-center text-white overflow-hidden"
                >
                    {/* Footer Content */}
                    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
                        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 sm:gap-12 mb-12 sm:mb-16">
                            {/* Left: Main CTA */}
                            <div className="flex-1 w-full">
                                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 font-heading break-words">
                                    Let's connect
                                </h2>
                                <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-xl font-body">
                                    I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                                </p>
                            </div>

                            {/* Right: Contact Info */}
                            <div className="flex-1 w-full flex flex-col gap-6 sm:gap-8">
                                <div>
                                    <h3 className="text-xs sm:text-sm uppercase tracking-wider text-white/60 mb-2 sm:mb-3 font-body">Email</h3>
                                    <a 
                                        href="mailto:riannalei@gmail.com" 
                                        className="text-lg sm:text-xl md:text-2xl hover:opacity-70 transition-opacity font-body break-all"
                                    >
                                        riannalei@gmail.com
                                    </a>
                                </div>

                                <div>
                                    <h3 className="text-xs sm:text-sm uppercase tracking-wider text-white/60 mb-2 sm:mb-3 font-body">Socials</h3>
                                    <div className="flex gap-4 sm:gap-6">
                                        <a 
                                            href="https://github.com/riannalei" 
                                            target="_blank" 
                                            rel="noreferrer"
                                            className="text-base sm:text-lg hover:opacity-70 transition-opacity font-body"
                                        >
                                            GitHub
                                        </a>
                                        <a 
                                            href="https://www.linkedin.com/in/riannalei/" 
                                            target="_blank" 
                                            rel="noreferrer"
                                            className="text-base sm:text-lg hover:opacity-70 transition-opacity font-body"
                                        >
                                            LinkedIn
                                        </a>
                                        <a 
                                            href="/Rianna_Lei_Resume.pdf" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-base sm:text-lg hover:opacity-70 transition-opacity font-body"
                                        >
                                            Resume
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Bar */}
                        <div className="border-t border-white/20 pt-4 sm:pt-6">
                            <div className="flex flex-col gap-2">
                                <p className="text-xs sm:text-sm text-white/60 font-body">© 2025 Rianna Lei. All rights reserved.</p>
                                <div className="flex flex-col gap-1.5">
                                    <p className="text-xs text-white/50 max-w-full sm:max-w-2xl font-body break-words">
                                        Credits: 3D models by ZoeChuiYan (Candleholder, Diorama), jackbaeten (MacBook Pro), 
                                        Jungle Jim (Ramen Bowl), 3Dji (Ramen Yatai Food Stall), Voyage (Cherry Blossom), 
                                        besturkan (Poké Ball) - CC Attribution-NonCommercial, 
                                        pokemon-cards-css by simeydotme - CC Attribution
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 0.1, scale: 1 }}
                        transition={{ duration: 1.5 }}
                        className="absolute -right-20 sm:-right-40 -bottom-20 sm:-bottom-40 w-48 h-48 sm:w-96 sm:h-96 rounded-full bg-white"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 0.1, scale: 1 }}
                        transition={{ duration: 1.5, delay: 0.2 }}
                        className="absolute -left-20 sm:-left-40 -top-20 sm:-top-40 w-48 h-48 sm:w-96 sm:h-96 rounded-full bg-white"
                    />
                </div>
            </div>
        </div>
    );
};

export default Footer;
