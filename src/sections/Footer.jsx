const Footer = () => {
    return (
        <footer className="c-space pt-7 pb-3 mt-10 border-t border-black-300 flex justify-between items-center flex-wrap gap-5">
            <div className="text-white-500 flex gap-2">
                <p>Terms & Conditions</p>
                <p>|</p>
                <p>Privacy Policy</p>
            </div>

            <div className="flex gap-3">
                {/* GitHub Link */}
                <a
                    href="https://github.com/riannalei"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                >
                    <img src="/assets/github.svg" alt="github" className="w-1/2 h-1/2" />
                </a>

                {/* LinkedIn Link */}
                <a
                    href="https://www.linkedin.com/in/rianna-lei-6b6664216/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                >
                    <img src="/assets/linkedin.svg" alt="linkedin" className="w-1/2 h-1/2" />
                </a>
            </div>

            <p className="text-white-500">© 2024 Rianna Lei. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
