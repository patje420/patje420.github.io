import React from 'react';
import { motion } from 'framer-motion';

const TrippyText = ({ text }) => {
  return (
    <div style={{ position: 'relative', textAlign: 'center' }}>
      {/* SVG filter for the wavy distortion */}
      <svg className="svg-filters">
        <defs>
          <filter id="wavyFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.01 0.05"
              numOctaves="3"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                values="0.01 0.05; 0.02 0.07; 0.01 0.05"
                dur="5s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" />
          </filter>
        </defs>
      </svg>

      <motion.h1
        initial={{ scale: 0.5, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 15,
          duration: 1.5
        }}
        style={{
          fontFamily: 'var(--font-trippy)',
          fontSize: 'clamp(4rem, 15vw, 10rem)',
          color: 'white',
          textShadow: `
            0 0 10px rgba(5, 4, 4, 0.8),
            0 0 20px rgba(66, 209, 30, 0.8),
            0 0 30px rgba(86, 246, 23, 0.8)
          `,
          filter: 'url(#wavyFilter)',
          margin: '0',
          cursor: 'default',
          userSelect: 'none',
          letterSpacing: '-0.02em',
          lineHeight: '1.2'
        }}
      >
        {text}
      </motion.h1>
    </div>
  );
};

export default TrippyText;
