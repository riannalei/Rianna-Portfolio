import { motion } from 'framer-motion';
import { disperse } from './animation';
import { useState } from 'react';

const TextDisperseWord = ({ word, isAnimated }) => {
    const getChars = (word) => {
        let chars = [];
        word.split("").forEach((char, i) => {
            chars.push(
                <motion.span 
                    custom={i} 
                    variants={disperse} 
                    animate={isAnimated ? "open" : "closed"} 
                    key={char + i}
                    style={{ display: 'inline-block' }}
                >
                    {char}
                </motion.span>
            );
        });
        return chars;
    };

    return <span className="inline-block">{getChars(word)}</span>;
};

export default function TextDisperse({ children }) {
    const [hoveredWordIndex, setHoveredWordIndex] = useState(null);
    
    if (typeof children !== 'string') {
        return children;
    }

    const words = children.split(' ');

    return (
        <>
            {words.map((word, wordIndex) => (
                <span key={wordIndex}>
                    <span
                        onMouseEnter={() => setHoveredWordIndex(wordIndex)}
                        onMouseLeave={() => setHoveredWordIndex(null)}
                        onTouchStart={() => {
                            setHoveredWordIndex(wordIndex);
                            setTimeout(() => setHoveredWordIndex(null), 1000);
                        }}
                        onClick={() => {
                            setHoveredWordIndex(wordIndex);
                            setTimeout(() => setHoveredWordIndex(null), 1000);
                        }}
                        className="inline-block cursor-pointer"
                        style={{ 
                            WebkitTapHighlightColor: 'transparent',
                            userSelect: 'none'
                        }}
                    >
                        <TextDisperseWord 
                            word={word} 
                            isAnimated={hoveredWordIndex === wordIndex} 
                        />
                    </span>
                    {wordIndex < words.length - 1 && <span> </span>}
                </span>
            ))}
        </>
    );
}