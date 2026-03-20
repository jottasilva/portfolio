'use client';

import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useEffect } from 'react';

export default function FramerBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {/* Orb 1: Lime Fluid Drift */}
      <motion.div
        animate={{ 
          x: [0, 80, -40, 0], 
          y: [0, -80, 40, 0],
          scale: [1, 1.05, 0.95, 1] 
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 22, 
          ease: 'easeInOut' 
        }}
        style={{
          position: 'absolute',
          top: '15%',
          left: '10%',
          width: '850px',
          height: '850px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 230, 118, 0.18) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Orb 2: Purple Fluid Drift */}
      <motion.div
        animate={{ 
          x: [0, -90, 60, 0], 
          y: [0, 70, -70, 0],
          scale: [1, 0.98, 1.03, 1] 
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 28, 
          ease: 'easeInOut' 
        }}
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '10%',
          width: '950px',
          height: '950px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(138, 0, 196, 0.15) 0%, transparent 70%)',
          filter: 'blur(90px)',
        }}
      />


    </div>
  );
}
