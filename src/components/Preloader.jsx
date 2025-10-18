import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './Preloader.css';

const words = ["Hello", "Ciao", "Bonjour", "こんにちは", "नमस्ते", "안녕하세요", "Hola", "مرحبا", "你好"];

const Preloader = ({ onComplete }) => {
    const [index, setIndex] = useState(0);
    const [dimension, setDimension] = useState({ width: 0, height: 0 });

    useEffect(() => {
        setDimension({ width: window.innerWidth, height: window.innerHeight });
    }, []);

    useEffect(() => {
        if (index === words.length - 1) {
            setTimeout(() => {
                if (onComplete) onComplete();
            }, 500);
            return;
        }
        const timer = setTimeout(() => {
            setIndex(index + 1);
        }, index === 0 ? 1000 : 120); // First word stays 1s, rest cycle at 120ms
        
        return () => clearTimeout(timer);
    }, [index, onComplete]);

    const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`;
    const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`;

    const curve = {
        initial: {
            d: initialPath
        },
        exit: {
            d: targetPath,
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 }
        }
    };

    const slideUp = {
        initial: {
            top: 0
        },
        exit: {
            top: "-100vh",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
        }
    };

    return (
        <motion.div
            variants={slideUp}
            initial="initial"
            exit="exit"
            className="preloader-intro"
        >
            <motion.p
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                {words[index]}
            </motion.p>
            {dimension.width > 0 && (
                <svg>
                    <motion.path
                        variants={curve}
                        initial="initial"
                        exit="exit"
                    />
                </svg>
            )}
        </motion.div>
    );
};

export default Preloader;
