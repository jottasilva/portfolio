'use client';

import { css } from 'styled-system/css';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section 
      id="home"
      className={css({ 
        minH: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        position: 'relative', 
        overflow: 'hidden',
        bg: '#000000'
      })}
    >
      {/* Background radial gradient mesh */}
      <div className={css({
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        w: '140vh',
        h: '140vh',
        bgGradient: 'radial',
        gradientFrom: 'rgba(0, 255, 127, 0.04)',
        gradientTo: 'rgba(56, 190, 239, 0.01)',
        filter: 'blur(100px)',
        zIndex: 1,
        pointerEvents: 'none'
      })} />

      {/* Glowing Orb 1 - Green (matching the print) */}
      <motion.div
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
        className={css({
          position: 'absolute',
          top: '30%',
          left: '25%',
          w: '400px',
          h: '400px',
          bg: 'rgba(0, 255, 127, 0.08)',
          filter: 'blur(80px)',
          rounded: 'circle',
          zIndex: 2,
          pointerEvents: 'none'
        })}
      />

      {/* Glowing Orb 2 - Purple/Pink (matching the print) */}
      <motion.div
        animate={{
          x: [0, -50, 20, 0],
          y: [0, 40, -30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear"
        }}
        className={css({
          position: 'absolute',
          bottom: '30%',
          right: '25%',
          w: '450px',
          h: '450px',
          bg: 'rgba(157, 78, 221, 0.08)',
          filter: 'blur(90px)',
          rounded: 'circle',
          zIndex: 2,
          pointerEvents: 'none'
        })}
      />

      {/* Bottom anchor spacer */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className={css({ 
          position: 'absolute', 
          bottom: 12, 
          display: 'flex', 
          justifyContent: 'center', 
          w: 'full', 
          zIndex: 10
        })}
      >
        <span className="material-symbols-outlined text-primary text-xl animate-bounce">
          expand_more
        </span>
      </motion.div>
    </section>
  );
}
