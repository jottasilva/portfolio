'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { css } from 'styled-system/css';
import { ReactNode, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  // Bloquear scroll do body quando aberto
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className={css({
            position: 'fixed', inset: 0, bg: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, p: 4
          })}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className={css({
              bg: '#141414', border: '1px solid rgba(255,255,255,0.06)', rounded: '4px',
              w: '100%', maxW: 'lg', maxH: '90vh', overflowY: 'auto', position: 'relative',
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)'
            })}
          >
            {/* Header */}
            <div className={css({ p: 6, borderBottom: '1px solid rgba(255,255,255,0.03)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' })}>
              <h3 className={css({ color: 'white', fontWeight: 'bold', fontSize: 'lg', fontFamily: 'headline' })}>{title}</h3>
              <button 
                onClick={onClose}
                className={css({ color: 'gray.500', cursor: 'pointer', _hover: { color: 'white' }, fontSize: 'lg', bg: 'transparent', border: 'none' })}
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className={css({ p: 6 })}>
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
