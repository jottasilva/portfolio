'use client';

import { css, cx } from 'styled-system/css';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const menuItems = ['Início', 'Skills', 'Projetos', 'Formação', 'Trajetória', 'Contato'];
  const anchorMap: Record<string, string> = {
    'Início': '',
    'Skills': 'skills',
    'Projetos': 'projects',
    'Formação': 'formacao',
    'Trajetória': 'trajetoria',
    'Contato': 'contact'
  };

  const iconMap: Record<string, string> = {
    'Início': 'home',
    'Skills': 'terminal',
    'Projetos': 'grid_view',
    'Formação': 'school',
    'Trajetória': 'timeline',
    'Contato': 'alternate_email'
  };

  const navItems = ['Início', 'Skills', 'Projetos', 'Formação', 'Trajetória'];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);

      if (window.scrollY < 100) {
        setActiveSection('');
      }
    };
    window.addEventListener('scroll', handleScroll);

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const ids = Object.values(anchorMap).filter(Boolean);
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <nav className={css({
      position: 'fixed', left: 0, top: 0, 
      width: { base: '100%', md: '88px' }, 
      height: { base: scrolled ? '72px' : '88px', md: '100vh' }, 
      zIndex: 100,
      bg: { base: scrolled ? 'rgba(4,9,6,0.95)' : 'rgba(4,9,6,0.6)', md: 'rgba(4,9,6,0.85)' },
      backdropFilter: 'blur(16px)',
      borderRight: { md: '1px solid rgba(57,255,110,0.08)' },
      borderBottom: { base: '1px solid rgba(57,255,110,0.08)', md: 'none' },
      transition: 'all 0.3s ease',
      display: 'flex',
      flexDir: { base: 'row', md: 'column' },
      alignItems: 'center',
      justifyContent: { base: 'space-between', md: 'flex-start' },
      py: { base: 2, md: 8 },
      px: { base: 6, md: 2 }
    })} aria-label="Navegação principal">
      


      {/* ── NAVIGATION (DESKTOP) ── */}
      <div className={css({ 
        display: { base: 'none', md: 'flex' }, 
        flexDir: 'column', 
        gap: 8, 
        alignItems: 'center', 
        flex: 1, 
        justifyContent: 'center' 
      })}>
        {navItems.map((item) => {
          const isActive = anchorMap[item] === activeSection || (item === 'Início' && !activeSection);
          return (
            <a
              key={item}
              href={`#${anchorMap[item]}`}
              className={css({
                display: 'flex', flexDir: 'column', alignItems: 'center', gap: 1,
                fontFamily: 'headline', fontSize: '9px', letterSpacing: '0.1em',
                textTransform: 'uppercase', 
                color: isActive ? 'primary' : 'gray.400', 
                opacity: 1,
                transition: 'all 0.2s', cursor: 'pointer',
                _hover: { opacity: 1, color: 'primary', '& span': { transform: 'scale(1.1)' } }
              })}
            >
              <span className={cx("material-symbols-outlined", css({ fontSize: '20px', transition: 'all 0.2s', color: isActive ? 'primary' : 'gray.400', transform: isActive ? 'scale(1.1)' : 'none' }))}>
                {iconMap[item]}
              </span>
              <span className={css({ mt: 0.5 })}>{item}</span>
            </a>
          );
        })}
        
        {/* Contact directly in stream? */}
        <a
          href="#contact"
          className={css({
            display: 'flex', flexDir: 'column', alignItems: 'center', gap: 1,
            fontFamily: 'headline', fontSize: '10px', letterSpacing: '0.1em',
            textTransform: 'uppercase', 
            color: activeSection === 'contact' ? '#fff' : 'primary', 
            opacity: activeSection === 'contact' ? 1 : 0.9,
            bg: activeSection === 'contact' ? 'rgba(0,230,118,0.1)' : 'transparent',
            p: activeSection === 'contact' ? '4px 8px' : '0px',
            rounded: '4px',
            transition: 'all 0.2s', cursor: 'pointer', mt: activeSection === 'contact' ? 3 : 4,
            _hover: { opacity: 1, '& span': { transform: 'scale(1.1)' } }
          })}
        >
          <span className={cx("material-symbols-outlined", css({ fontSize: '22px', transition: 'all 0.2s', color: 'primary' }))}>
            {iconMap['Contato']}
          </span>
          <span className={css({ fontWeight: 'bold' })}>{activeSection === 'contact' ? 'ATIVO' : '+ CONECTAR'}</span>
        </a>
      </div>

      {/* ── MOBILE ACTIONS (Right) ── */}
      <div className={css({ display: { base: 'flex', md: 'none' }, alignItems: 'center' })}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          className={css({ 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            color: 'primary', bg: 'rgba(255,255,255,0.02)', 
            border: '1px solid rgba(57,255,110,0.2)', p: 2, rounded: '2px', cursor: 'pointer' 
          })}
        >
          <span className="material-symbols-outlined" aria-hidden="true">{menuOpen ? 'close' : 'menu'}</span>
        </button>
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
              role="dialog"
              aria-modal="true"
              aria-label="Menu de navegação mobile"
              id="mobile-menu"
              className={css({ position: 'fixed', top: 0, right: 0, width: '280px', height: '100vh', bg: '#0b0b0b', zIndex: 100, borderLeft: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDir: 'column', p: 8, gap: 8, shadow: '-10px 0 30px rgba(0,0,0,0.5)' })}
            >
              <div className={css({ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 6, borderBottom: '1px solid rgba(255,255,255,0.03)' })}>
                <span className={css({ fontFamily: 'label', color: 'primary', fontSize: 'xs', letterSpacing: '0.2em' })}>NAVEGAÇÃO</span>
                <button onClick={() => setMenuOpen(false)} aria-label="Fechar menu" className={css({ color: 'white', bg: 'transparent', border: 'none', cursor: 'pointer' })}>
                  <span className="material-symbols-outlined" aria-hidden="true">close</span>
                </button>
              </div>

              <div className={css({ display: 'flex', flexDir: 'column', alignItems: 'flex-end', gap: 5 })}>
                {menuItems.map((item) => {
                  const isActive = anchorMap[item] === activeSection || (item === 'Início' && !activeSection);
                  return (
                    <a
                      key={item}
                      href={`#${anchorMap[item]}`}
                      onClick={() => setMenuOpen(false)}
                      className={css({ 
                        fontFamily: 'headline', fontSize: 'md', 
                        color: isActive ? 'primary' : 'gray.400', 
                        fontWeight: isActive ? 'bold' : 'normal',
                        letterSpacing: '0.05em', _hover: { color: 'primary' }, transition: 'colors' 
                      })}
                    >
                      {item}
                    </a>
                  );
                })}
              </div>

              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className={css({ mt: 'auto', textAlign: 'center', p: 3, rounded: '2px', bg: 'primary', color: 'black', fontWeight: 'bold', fontFamily: 'label', fontSize: 'sm', cursor: 'pointer' })}
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
