import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const gifFiles = [
  'cs1.gif',
  'cs2.gif',
  'leaf.gif',
  'mew.gif',
  'ohne.gif',
  'rayquaza.gif',
  'salsa.gif',
  'sixseven.gif',
  'sixsevensix.gif',
  'sixsevensixseven.gif',
  'snoop.gif',
  'ye.gif',
  'yeezy.gif'
];

const FloatingGifs = () => {
  const gifs = useMemo(() => {
    // Shuffle all GIFs
    const shuffled = [...gifFiles].sort(() => 0.5 - Math.random());

    return shuffled.map((file, index) => ({
      id: `${file}-${index}`,
      src: `/gifs/${file}`,
      // Randomize start positions across the entire screen
      x: Math.random() * 90,
      y: Math.random() * 90,
      // Randomize movement range
      moveX: Math.random() * 20 - 10,
      moveY: Math.random() * 20 - 10,
      // Randomize timing
      duration: Math.random() * 10 + 10, // 10-20 seconds
      delay: Math.random() * 5, // Random start delay for staggered appearance
      // Randomize size
      scale: Math.random() * 0.5 + 0.7, // 0.7 to 1.2
      rotation: Math.random() * 360,
    }));
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none',
      zIndex: 0,
      overflow: 'hidden'
    }}>
      {gifs.map((gif) => (
        <motion.img
          key={gif.id}
          src={gif.src}
          alt="trippy gif"
          loading="lazy"
          initial={{
            x: `${gif.x}vw`,
            y: `${gif.y}vh`,
            opacity: 0,
            scale: 0,
            rotate: gif.rotation
          }}
          animate={{
            opacity: [0, 0.7, 0.7, 0], // Pop in, stay, then pop out to rotate pool
            scale: [0, gif.scale, gif.scale, 0],
            x: [
              `${gif.x}vw`,
              `${gif.x + gif.moveX}vw`,
              `${gif.x}vw`
            ],
            y: [
              `${gif.y}vh`,
              `${gif.y + gif.moveY}vh`,
              `${gif.y}vh`
            ],
            rotate: [gif.rotation, gif.rotation + 180]
          }}
          transition={{
            duration: gif.duration,
            repeat: Infinity,
            delay: gif.delay,
            ease: "easeInOut",
          }}
          style={{
            position: 'absolute',
            width: '280px', // Large and prominent
            height: 'auto',
            filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))',
            mixBlendMode: 'screen',
            willChange: 'transform, opacity',
          }}
        />
      ))}
    </div>
  );
};

export default FloatingGifs;
