import { motion } from 'framer-motion';

// Character-by-character animation - smoother, slower
export const AnimatedTextChars = ({ text, className = '', delay = 0 }) => {
  const chars = Array.from(text);
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
    hidden: {
      opacity: 0,
      y: 10,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
      viewport={{ once: false }}
    >
      {chars.map((char, index) => (
        <motion.span key={index} variants={child}>
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

// Word-by-word animation - slower, smoother
export const AnimatedTextWords = ({ text, className = '', delay = 0 }) => {
  const words = text.split(' ');
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: delay },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
    hidden: {
      opacity: 0,
      y: 10,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-100px" }}
    >
      {words.map((word, index) => (
        <motion.span key={index} variants={child} style={{ display: 'inline-block', marginRight: '0.25em' }}>
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

// Fade-slide animation for paragraphs - slower reveal
export const AnimatedParagraph = ({ children, className = '', delay = 0 }) => {
  return (
    <motion.p
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ 
        duration: 1.2, 
        delay, 
        ease: [0.25, 0.4, 0.25, 1]
      }}
    >
      {children}
    </motion.p>
  );
};

// Line-by-line reveal with mask effect
export const AnimatedTextReveal = ({ text, className = '', delay = 0 }) => {
  return (
    <div className="overflow-hidden">
      <motion.div
        className={className}
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, delay, ease: [0.33, 1, 0.68, 1] }}
      >
        {text}
      </motion.div>
    </div>
  );
};

// Gradient text animation
export const AnimatedGradientText = ({ text, className = '' }) => {
  return (
    <motion.span
      className={className}
      initial={{ 
        backgroundSize: '0% 100%',
        backgroundPosition: 'left'
      }}
      whileInView={{ 
        backgroundSize: '100% 100%',
        backgroundPosition: 'left'
      }}
      viewport={{ once: false }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      style={{
        backgroundImage: 'linear-gradient(90deg, currentColor 0%, currentColor 100%)',
        backgroundRepeat: 'no-repeat',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
      }}
    >
      {text}
    </motion.span>
  );
};

