import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import Button from './Button';
import Nav from './Nav';
import styles from './style.module.scss';

export default function Index() {
    const [isActive, setIsActive] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: 768 });

    // Desktop menu animation
    const desktopMenu = {
        open: {
            width: "480px",
            height: "650px",
            top: "-25px",
            right: "-25px",
            transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1]}
        },
        closed: {
            width: "100px",
            height: "40px",
            top: "0px",
            right: "0px",
            transition: { duration: 0.75, delay: 0.35, type: "tween", ease: [0.76, 0, 0.24, 1]}
        }
    };

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isActive) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isActive]);

    // Mobile: Simple hamburger menu
    if (isMobile) {
        return (
            <>
                {/* Hamburger Button */}
                <button
                    onClick={() => setIsActive(!isActive)}
                    className="fixed top-6 right-6 z-50 w-10 h-10 flex flex-col justify-center items-center gap-1.5 group touch-manipulation"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                    aria-label="Toggle menu"
                >
                    <motion.span
                        animate={{
                            rotate: isActive ? 45 : 0,
                            y: isActive ? 8 : 0,
                        }}
                        initial={false}
                        className="w-6 h-0.5 bg-gray-900 transition-colors group-hover:bg-[#B7C4AC] will-change-transform"
                    />
                    <motion.span
                        animate={{
                            opacity: isActive ? 0 : 1,
                        }}
                        initial={false}
                        className="w-6 h-0.5 bg-gray-900 transition-colors group-hover:bg-[#B7C4AC] will-change-transform"
                    />
                    <motion.span
                        animate={{
                            rotate: isActive ? -45 : 0,
                            y: isActive ? -8 : 0,
                        }}
                        initial={false}
                        className="w-6 h-0.5 bg-gray-900 transition-colors group-hover:bg-[#B7C4AC] will-change-transform"
                    />
                </button>

                {/* Full Screen Mobile Menu */}
                <AnimatePresence>
                    {isActive && (
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                            className="fixed inset-0 bg-[#B7C4AC] z-40"
                        >
                            <Nav closeMenu={() => setIsActive(false)} isMobile={true} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </>
        );
    }

    // Desktop: Awwwards-style menu
    return (
        <div className={styles.header}>
            <motion.div 
                className={styles.menu}
                variants={desktopMenu}
                animate={isActive ? "open" : "closed"}
                initial="closed"
            >
                <AnimatePresence>
                    {isActive && <Nav closeMenu={() => setIsActive(false)} isMobile={false} />}
                </AnimatePresence>
            </motion.div>
            <Button isActive={isActive} toggleMenu={() => {setIsActive(!isActive)}}/>
        </div>
    )
}

