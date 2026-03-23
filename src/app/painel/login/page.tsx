'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/presentation/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { css, cx } from 'styled-system/css';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, user } = useAuth();
  const router = useRouter();

  // Redireciona se a sessão já estiver ativa
  useEffect(() => {
    if (user) {
      router.push('/painel');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      router.push('/painel'); // AuthContext will trigger layout correctly
    } catch (err: any) {
      setError(err.message || 'Falha na autenticação. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css({ minH: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', px: 4, bg: '#090909', position: 'relative' })}>
      
      {/* Background Orbs */}
      <div className={css({ position: 'absolute', top: '10%', left: '20%', width: '400px', height: '400px', bg: 'rgba(0, 230, 118, 0.04)', filter: 'blur(80px)', borderRadius: '50%' })} />
      <div className={css({ position: 'absolute', bottom: '10%', right: '20%', width: '400px', height: '400px', bg: 'rgba(138, 0, 196, 0.04)', filter: 'blur(80px)', borderRadius: '50%' })} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={cx(
          css({
            w: 'full',
            maxW: 'md',
            bg: 'rgba(15,15,15,0.7)',
            border: '1px solid rgba(255,255,255,0.03)',
            backdropFilter: 'blur(20px)',
            p: 8,
            rounded: '2px',
            shadow: '2xl',
            position: 'relative',
            zIndex: 1
          }),
          'glass-panel'
        )}
      >
        <div className={css({ textAlign: 'center', mb: 10 })}>
          <span className={cx(css({ fontFamily: 'label', color: 'primary', letterSpacing: '0.3em', fontSize: '10px', textTransform: 'uppercase', mb: 2, display: 'block' }), 'neon-glow')}>
             Terminal_De_Segurança
          </span>
          <h1 className={css({ fontFamily: 'headline', fontSize: '3xl', fontWeight: 'bold', color: 'white', letterSpacing: 'tight' })}>
             Acessar <span className={css({ color: 'secondary' })}>Painel</span>
          </h1>
        </div>

        {error && (
          <div className={css({ bg: 'rgba(255,0,0,0.1)', border: '1px solid rgba(255,0,0,0.3)', color: '#ff4444', p: 3, rounded: '2px', mb: 6, fontSize: 'xs', fontFamily: 'body' })}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className={css({ display: 'flex', flexDir: 'column', gap: 6 })}>
          <div>
            <label className={css({ display: 'block', mb: 2, fontSize: 'xs', color: 'gray.400', fontFamily: 'label', textTransform: 'uppercase' })}>E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={css({ w: 'full', bg: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', p: 3, rounded: '2px', color: 'white', outline: 'none', fontSize: 'sm', transition: 'all 0.3s', _focus: { borderColor: 'primary', bg: 'rgba(255,255,255,0.05)' } })}
              placeholder="admin@exemplo.com"
            />
          </div>

          <div>
            <label className={css({ display: 'block', mb: 2, fontSize: 'xs', color: 'gray.400', fontFamily: 'label', textTransform: 'uppercase' })}>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={css({ w: 'full', bg: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', p: 3, rounded: '2px', color: 'white', outline: 'none', fontSize: 'sm', transition: 'all 0.3s', _focus: { borderColor: 'secondary', bg: 'rgba(255,255,255,0.05)' } })}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={css({
              w: 'full',
              py: 3,
              bg: 'primary',
              color: 'black',
              fontWeight: 'bold',
              rounded: '2px',
              cursor: 'pointer',
              transition: 'all 0.3s',
              fontFamily: 'headline',
              fontSize: 'sm',
              opacity: loading ? 0.7 : 1,
              _hover: { bg: 'emerald.400', transform: 'scale(1.02)' }
            })}
          >
            {loading ? 'Autenticando...' : 'Iniciar Sessão'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
