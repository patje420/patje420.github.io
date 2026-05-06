import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaDiscord, FaSteam, FaSpotify } from 'react-icons/fa';

const socialLinks = [
  { icon: <FaDiscord />, url: 'https://discord.com/users/470226314129965097', color: '#5865F2', label: 'Discord' },
  { icon: <FaSteam />, url: 'https://steamcommunity.com/id/0g_patje420', color: '#1b2838', label: 'Steam' },
  { icon: <FaSpotify />, url: 'https://open.spotify.com/user/lescouhier1001', color: '#1DB954', label: 'Spotify' },
];

const MagneticButton = ({ children, url, color }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15 };
  const mouseX = useSpring(x, springConfig);
  const mouseY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Magnetic pull: move the button towards the cursor
    x.set(distanceX * 0.4);
    y.set(distanceY * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="social-link-anchor"
      style={{ x: mouseX, y: mouseY }}
    >
      {/* Liquid Glow Aura */}
      <motion.div
        className="aura"
        initial={{ opacity: 0, scale: 0.8 }}
        whileHover={{
          opacity: 0.6,
          scale: 1.5,
          filter: `blur(20px) brightness(1.5)`,
          backgroundColor: color
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: '50%',
          zIndex: -1,
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        }}
      />

      {/* Button Body */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 'var(--social-icon-size)',
          color: 'white',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: '24px', // Liquid-ish rounded squares
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
          transition: 'all 0.3s ease',
        }}
      >
        {children}
      </motion.div>
    </motion.a>
  );
};

const SocialLinks = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 1, type: 'spring' }}
      className="social-links"
    >
      {socialLinks.map((link, index) => (
        <MagneticButton key={index} url={link.url} color={link.color}>
          {link.icon}
        </MagneticButton>
      ))}
    </motion.div>
  );
};

export default SocialLinks;
