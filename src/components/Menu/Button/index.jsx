import { motion } from 'framer-motion';
import styles from './style.module.scss';

export default function Button({isActive, toggleMenu}) {
  return (
    <div className={`${styles.button} ${isActive ? styles.active : ''}`} onClick={() => {toggleMenu()}}>
        <motion.div 
            key={isActive ? 'close' : 'menu'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={styles.text}
        >
            {isActive ? 'Close' : 'Menu'}
        </motion.div>
    </div>
  )
}

function PerspectiveText({label}) {
    return (    
        <div className={styles.perspectiveText}>
            <p>{label}</p>
        </div>
    )
}

