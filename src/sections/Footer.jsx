const Footer = () => {
    return (
        <footer className="w-full bg-white py-8 border-t border-gray-100">
            <div className="max-w-6xl mx-auto px-4 flex justify-between items-center flex-wrap gap-5">
                <div className="text-gray-600 flex gap-4">
                    <p>Terms & Conditions</p>
                    <p>|</p>
                    <p>Privacy Policy</p>
                </div>

                <div className="flex gap-4">
                    {/* GitHub Link */}
                    <a
                        href="https://github.com/riannalei"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 hover:bg-[#B7C4AC] transition-colors group"
                    >
                        <img src="/assets/github.svg" alt="github" className="w-5 h-5 brightness-0 opacity-60 group-hover:brightness-0 group-hover:invert" />
                    </a>

                    {/* LinkedIn Link */}
                    <a
                        href="https://www.linkedin.com/in/rianna-lei-6b6664216/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 hover:bg-[#B7C4AC] transition-colors group"
                    >
                        <img src="/assets/linkedin.svg" alt="linkedin" className="w-5 h-5 brightness-0 opacity-60 group-hover:brightness-0 group-hover:invert" />
                    </a>
                </div>

                <p className="text-gray-600">© 2025 Rianna Lei. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
