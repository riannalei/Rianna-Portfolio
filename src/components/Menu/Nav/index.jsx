import styles from './style.module.scss';
import { motion } from 'framer-motion';
import { links, footerLinks } from './data';
import { perspective, slideIn } from "./anim";

export default function Nav({ closeMenu }) {
    const scrollToSection = (href) => {
        if (href.startsWith('#')) {
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else {
            window.open(href, '_blank');
        }
        closeMenu();
    };

    return (
        <div className={styles.nav}>
            <div className={styles.body}>
                {links.map((link, i) => {
                    const { title, href } = link;
                    return (
                        <div key={`b_${i}`} className={styles.linkContainer}>
                            <motion.div
                                custom={i}
                                variants={perspective}
                                initial="initial"
                                animate="enter"
                                exit="exit"
                            >
                                <button onClick={() => scrollToSection(href)}>
                                    {title}
                                </button>
                            </motion.div>
                        </div>
                    )
                })}
            </div>
            <motion.div className={styles.footer}>
                {footerLinks.map((link, i) => {
                    const { title, href } = link;
                    return (
                        <motion.button 
                            variants={slideIn}
                            custom={i} 
                            initial="initial"
                            animate="enter"
                            exit="exit"
                            key={`f_${i}`}
                            onClick={() => scrollToSection(href)}
                        >
                            {title}
                        </motion.button>
                    )
                })}
            </motion.div>
        </div>
    )
}

