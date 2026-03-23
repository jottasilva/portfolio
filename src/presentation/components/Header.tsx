'use client';

import { css } from 'styled-system/css';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = ['Início', 'Skills', 'Projetos', 'Formação', 'Trajetória', 'Contato'];
  const anchorMap: Record<string, string> = {
    'Início': '',
    'Skills': 'skills',
    'Projetos': 'projects',
    'Formação': 'formacao',
    'Trajetória': 'trajetoria',
    'Contato': 'contact'
  };

  return (
    <nav className={css({
      position: 'fixed', top: 0, width: 'full', zIndex: 50,
      bg: scrolled ? 'rgba(0,0,0,0.9)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      transition: 'all 0.3s ease'
    })}>
      <div className={css({ maxW: { base: '90vw', md: '70vw' }, mx: 'auto', px: 8, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'space-between' })}>

        {/* Logo Node */}
        <div className={css({ display: 'flex', alignItems: 'center', gap: 2, flexShrink: 0 })}>
          <img src="/logo.svg" alt="JRSN Logo" className={css({ h: 12, w: 'auto' })} />
        </div>

        {/* Right Actions Container (Grouped to push everything right) */}
        <div className={css({ display: 'flex', alignItems: 'center', gap: 6 })}>
          {/* Navigation Core (Desktop) */}
          <div className={css({ display: { base: 'none', md: 'flex' }, gap: 10, alignItems: 'center' })}>
            {['Início', 'Skills', 'Projetos', 'Formação', 'Trajetória'].map((item) => (
              <a
                key={item}
                href={`#${anchorMap[item]}`}
                className={css({
                  fontFamily: 'headline',
                  fontSize: 'sm',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'white',
                  opacity: 0.6,
                  transition: 'all 0.3s',
                  position: 'relative',
                  cursor: 'pointer',
                  _hover: { opacity: 1, color: 'primary', _after: { width: 'full' } },
                  _after: {
                    content: '""',
                    position: 'absolute',
                    bottom: '-4px',
                    left: 0,
                    width: '0%',
                    height: '1px',
                    bg: 'primary',
                    transition: 'width 0.3s ease-out',
                  }
                })}
              >
                {item}
              </a>
            ))}
            <a
              href="#contact"
              className={css({
                fontFamily: 'headline',
                fontSize: 'sm',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'primary',
                opacity: 0.9,
                transition: 'all 0.3s',
                position: 'relative',
                cursor: 'pointer',
                fontWeight: 'bold',
                _hover: { opacity: 1, _after: { width: 'full' } },
                _after: {
                  content: '""',
                  position: 'absolute',
                  bottom: '-4px',
                  left: 0,
                  width: '0%',
                  height: '1px',
                  bg: 'primary',
                  transition: 'width 0.3s ease-out',
                }
              })}
            >
              + CONECTAR
            </a>
          </div>

          <div className={css({ display: { base: 'flex', md: 'none' }, alignItems: 'center' })}>
            {/* Toggle Button for Mobile */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={css({ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'primary', bg: 'rgba(255,255,255,0.02)', border: '1px solid rgba(0,230,118,0.2)', p: 2, rounded: 'md', cursor: 'pointer' })}
            >
              <span className="material-symbols-outlined">{menuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Framer Motion) */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className={css({ position: 'fixed', inset: 0, bg: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 90 })}
            />
            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
              className={css({ position: 'fixed', top: 0, right: 0, width: '280px', height: '100vh', bg: '#0b0b0b', zIndex: 100, borderLeft: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDir: 'column', p: 8, gap: 8, shadow: '-10px 0 30px rgba(0,0,0,0.5)' })}
            >
              <div className={css({ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 6, borderBottom: '1px solid rgba(255,255,255,0.03)' })}>
                <span className={css({ fontFamily: 'label', color: 'primary', fontSize: 'xs', letterSpacing: '0.2em' })}>NAVEGAÇÃO</span>
                <button onClick={() => setMenuOpen(false)} className={css({ color: 'white', bg: 'transparent', border: 'none', cursor: 'pointer' })}>
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className={css({ display: 'flex', flexDir: 'column', alignItems: 'flex-end', gap: 5 })}>
                {menuItems.map((item) => (
                  <a
                    key={item}
                    href={`#${anchorMap[item]}`}
                    onClick={() => setMenuOpen(false)}
                    className={css({ fontFamily: 'headline', fontSize: 'md', color: 'white', letterSpacing: '0.05em', _hover: { color: 'primary' }, transition: 'colors' })}
                  >
                    {item}
                  </a>
                ))}
              </div>

              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className={css({ mt: 'auto', textAlign: 'center', p: 3, rounded: 'lg', bg: 'primary', color: 'black', fontWeight: 'bold', fontFamily: 'label', fontSize: 'sm', cursor: 'pointer' })}
              >
                CONECTAR
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
