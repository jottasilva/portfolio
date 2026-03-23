'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { css } from 'styled-system/css';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  loading?: boolean;
}

export const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, loading = false }: ConfirmModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className={css({
            position: 'fixed', inset: 0, bg: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99999, p: 4
          })}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => e.stopPropagation()}
            className={css({
              bg: '#141414', border: '1px solid rgba(255,255,255,0.06)', rounded: '4px',
              w: '100%', maxW: 'md', p: 6, textAlign: 'center', position: 'relative'
            })}
          >
            <div className={css({
              w: '48px', h: '48px', rounded: 'full', bg: 'rgba(255,0,0,0.1)', color: '#ff4444',
              display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 4, fontSize: 'xl'
            })}>
              ⚠️
            </div>

            <h3 className={css({ color: 'white', fontWeight: 'bold', fontSize: 'lg', mb: 2, fontFamily: 'headline' })}>{title}</h3>
            <p className={css({ color: 'gray.400', fontSize: 'sm', mb: 6 })}>{message}</p>

            <div className={css({ display: 'flex', gap: 3, justifyContent: 'center' })}>
              <button 
                onClick={onClose}
                disabled={loading}
                className={css({
                  px: 4, py: 2, rounded: '2px', bg: 'rgba(255,255,255,0.05)', color: 'white',
                  cursor: 'pointer', fontSize: 'sm', border: 'none', _hover: { bg: 'rgba(255,255,255,0.1)' }
                })}
              >
                Cancelar
              </button>
              <button 
                onClick={onConfirm}
                disabled={loading}
                className={css({
                  px: 4, py: 2, rounded: '2px', bg: '#ff4444', color: 'white',
                  cursor: 'pointer', fontSize: 'sm', fontWeight: 'bold', border: 'none',
                  _hover: { bg: '#ff3333' }, _disabled: { opacity: 0.5, cursor: 'not-allowed' }
                })}
              >
                {loading ? 'Excluindo...' : 'Confirmar'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
