'use client';

import { css, cx } from 'styled-system/css';
import { motion, useInView } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { supabaseService } from '@/domain/services/supabaseService';
import Image from 'next/image';

const Counter = ({ target }: { target: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = target;
    const duration = 1400;
    const startTime = performance.now();

    const tick = (now: number) => {
      const p = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 4); // easeOutQuart
      setCount(Math.round(ease * end));
      if (p < 1) requestAnimationFrame(tick);
      else setCount(end);
    };

    requestAnimationFrame(tick);
  }, [isInView, target]);

  return <span ref={ref}>{count}</span>;
};

export default function HeroSection() {
  const [aboutData, setAboutData] = useState<any>(null);
  const [isGlitched, setIsGlitched] = useState(false);

  useEffect(() => {
    supabaseService.getAbout().then(setAboutData).catch(() => { });

    // Periodic HUD Name glitch
    const intv = setInterval(() => {
      setIsGlitched(true);
      setTimeout(() => setIsGlitched(false), 200);
    }, 5000);

    return () => clearInterval(intv);
  }, []);

  const tags = ['Node.js', 'TypeScript', 'React', 'Python', 'LLMs', 'OpenAI', 'n8n', 'Docker', 'SaaS', 'APIs'];

  return (
    <section
      id="home"
      className={css({
        minH: '100vh',
        display: 'flex',
        alignItems: { base: 'flex-start', lg: 'center' },
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        bg: 'transparent',
        px: { base: 4, md: 8 },
        pt: { base: '100px', lg: '60px' },
        pb: 12,
        cursor: 'crosshair',
        '&::after': {
          content: '""',
          position: 'fixed', inset: 0,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'300\' height=\'300\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")',
          opacity: 0.032, pointerEvents: 'none', zIndex: 999
        }
      })}
    >
      <style>{`
        @keyframes glitch1 { 0%,100%{transform:translateX(-3px) skewX(0deg)} 50%{transform:translateX(-5px) skewX(-2deg)} }
        @keyframes glitch2 { 0%,100%{transform:translateX(3px) skewX(0deg)} 50%{transform:translateX(5px) skewX(2deg)} }
      `}</style>

      {/* ── CONTAINER WRAPPER ── */}
      <div className={css({ width: '100%', maxW: { base: '100%', lg: '70vw' }, position: 'relative', zIndex: 5 })}>

        {/* ── LOGO (Above Hero) ── */}
        <div className={css({ display: 'flex', justifyContent: 'flex-start', mb: '50px', px: { base: 6, md: 0 } })}>
          <Image src="/logo.svg" alt="Logo" width={200} height={200} className={css({ w: { base: '30vw', md: '20vw' }, maxW: '220px', h: 'auto', objectFit: 'contain' })} />
        </div>

        <div className={css({
          display: { base: 'flex', lg: 'grid' },
          flexDir: 'column',
          gridTemplateColumns: '1fr 380px',
          border: '1px solid rgba(57,255,110,0.08)',
          bg: '#080e0a', // var(--s1)
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""', position: 'absolute', top: '-200px', left: '-200px',
            w: '600px', h: '600px', border: '1px solid rgba(57,255,110,0.04)',
            rounded: 'full', pointerEvents: 'none'
          }
        })}>

          {/* ── MAIN CONTENT (LEFT) ── */}
          <div className={cx('group', css({
            padding: { base: '36px 28px', md: '52px 56px 48px' },
            borderRight: { lg: '1px solid rgba(57,255,110,0.08)' },
            borderBottom: '1px solid rgba(57,255,110,0.08)',
            position: 'relative',
            display: 'flex',
            flexDir: 'column'
          }))}>

            {/* System ID */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={css({ display: 'flex', alignItems: 'center', gap: '16px', mb: 10 })}
            >
              <div className={css({ w: '24px', h: '1px', bg: '#39ff6e' })} />
              <span className={css({ fontFamily: 'label', fontSize: '11px', letterSpacing: '0.22em', color: '#00c44e', textTransform: 'uppercase' })}>
                sistema.manifesto
              </span>
              <span className={css({ marginLeft: 'auto', fontFamily: 'label', fontSize: '11px', letterSpacing: '0.15em', color: '#3d5e42' })}>
                ver_3.0 // 2026
              </span>
            </motion.div>

            {/* Headline with Glitch Effect on Hover */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className={css({
                position: 'relative', mb: '6px', cursor: 'default',
                '&:hover .hl-bot::before, &:hover .hl-bot::after': {
                  content: 'attr(data-text)', position: 'absolute', top: 0, left: 0, fontFamily: 'inherit', fontSize: 'inherit', lineHeight: 'inherit', letterSpacing: 'inherit'
                },
                '&:hover .hl-bot::before': {
                  color: '#ff003c', clipPath: 'polygon(0 20%,100% 20%,100% 40%,0 40%)', transform: 'translateX(-3px)', animation: 'glitch1 0.15s infinite'
                },
                '&:hover .hl-bot::after': {
                  color: '#00f7ff', clipPath: 'polygon(0 60%,100% 60%,100% 80%,0 80%)', transform: 'translateX(3px)', animation: 'glitch2 0.15s 0.05s infinite'
                }
              })}
            >
              <span className={css({
                fontFamily: 'headline', fontSize: { base: '44px', md: '64px', lg: '78px' },
                lineHeight: 0.9, letterSpacing: '0.02em', color: '#cee8d2', display: 'block',
                fontWeight: '800', textTransform: 'uppercase'
              })}>
                ARQUITETANDO
              </span>
              <span className={cx('hl-bot', css({
                fontFamily: 'headline', fontSize: { base: '44px', md: '64px', lg: '78px' },
                lineHeight: 0.9, letterSpacing: '0.02em', color: '#39ff6e', display: 'block', position: 'relative',
                fontWeight: '400', textTransform: 'uppercase'
              }))} data-text="SISTEMAS">
                SISTEMAS
              </span>
            </motion.div>

            {/* Rule with sub-txt */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className={css({ display: 'flex', alignItems: 'center', gap: '16px', margin: '36px 0 32px' })}
            >
              <div className={css({ flex: 1, height: '1px', background: 'linear-gradient(90deg, #39ff6e, transparent)' })} />
              <span className={css({ fontFamily: 'label', fontSize: '10px', letterSpacing: '0.2em', color: '#3d5e42', textTransform: 'uppercase', whiteSpace: 'nowrap' })}>
                engenharia · automação · ia
              </span>
            </motion.div>

            {/* Role / Tech Narrative */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={css({ display: 'flex', alignItems: 'center', gap: '10px', mb: '22px' })}
            >
              <div className={css({ w: '6px', h: '6px', rounded: 'full', bg: '#39ff6e', animation: 'blink 2s ease-in-out infinite' })} />
              <span className={css({ fontFamily: 'label', fontSize: '11px', letterSpacing: '0.16em', color: '#00c44e', textTransform: 'uppercase' })}>
                A narrativa do terminal &nbsp;//&nbsp; {aboutData?.role || 'Full Stack Sênior & IA'}
              </span>
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className={css({
                fontFamily: 'label', fontSize: '14px', fontWeight: '300', lineHeight: 1.9,
                color: '#7da882', maxW: '420px', flex: 1
              })}
            >
              {aboutData?.bio_summary || 'Mais de 8 anos construindo aplicações web, mobile e sistemas de automação escaláveis. Especialista em APIs de alta performance e plataformas SaaS multi-tenant. Eliminando processos manuais com IA e reduzindo custos operacionais.'}
            </motion.p>

            {/* Tech Matrix Grid */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className={css({
                display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)',
                gap: '1px', bg: 'rgba(57,255,110,0.08)', mt: 9, border: '1px solid rgba(57,255,110,0.08)'
              })}
            >
              {tags.map(tag => (
                <div key={tag} className={css({
                  bg: '#040906', padding: '10px 8px', textAlign: 'center',
                  fontFamily: 'label', fontSize: '10px', letterSpacing: '0.15em',
                  color: '#3d5e42', textTransform: 'uppercase', cursor: 'default',
                  transition: 'all 0.2s', _hover: { bg: 'rgba(57,255,110,0.06)', color: '#39ff6e' }
                })}>
                  {tag}
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT PANEL (PHOTO) ── */}
          <div className={cx('photo-col', css({
            position: 'relative', borderBottom: '1px solid rgba(57,255,110,0.08)',
            bg: 'black', display: 'flex', flexDir: 'column', overflow: 'hidden'
          }))}>

            <div className={cx('photo-inner', css({
              position: 'relative', flex: 1, overflow: 'hidden',
              '&::after': {
                content: '""', position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, transparent 40%, rgba(0,15,5,0.7) 80%, black), linear-gradient(45deg, rgba(57,255,110,0.04) 0%, transparent 60%)',
                pointerEvents: 'none'
              }
            }))}>
              <div className={css({
                w: 'full', h: 'full', position: 'relative', scale: 1.03, transition: 'transform 1.2s ease, filter 1.2s ease',
                '.photo-col:hover &': { scale: 1, '& img': { filter: 'grayscale(85%) contrast(1.1) brightness(0.85)' } }
              })}>
                <Image
                  src={aboutData?.photo_url || '/img-profile.jpg'}
                  alt="Jeferson S. Paulino"
                  fill
                  className={css({
                    objectFit: 'cover', objectPosition: 'center top',
                    filter: 'grayscale(100%) contrast(1.2) brightness(0.75)',
                    transition: 'all 0.6s'
                  })}
                />
              </div>

              {/* Scanlines layer */}
              <div className={css({
                position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2,
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 4px)'
              })} />

              {/* Angle HUD Brackets */}
              <div className={css({ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none', '& i': { position: 'absolute', w: '16px', h: '16px', borderColor: 'rgba(57,255,110,0.45)', borderStyle: 'solid' } })}>
                <i className={css({ top: '12px', left: '12px', borderTopWidth: '1px', borderLeftWidth: '1px' })} />
                <i className={css({ top: '12px', right: '12px', borderTopWidth: '1px', borderRightWidth: '1px' })} />
                <i className={css({ bottom: '12px', left: '12px', borderBottomWidth: '1px', borderLeftWidth: '1px' })} />
                <i className={css({ bottom: '12px', right: '12px', borderBottomWidth: '1px', borderRightWidth: '1px' })} />
              </div>

              {/* Target Reticle */}
              <div className={css({
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                w: '40px', h: '40px', border: '1px solid rgba(57,255,110,0.15)', rounded: 'full', zIndex: 3, pointerEvents: 'none',
                '&::before, &::after': { content: '""', position: 'absolute', bg: 'rgba(57,255,110,0.2)' },
                '&::before': { top: '50%', left: '-8px', right: '-8px', height: '1px', transform: 'translateY(-50%)' },
                '&::after': { left: '50%', top: '-8px', bottom: '-8px', width: '1px', transform: 'translateX(-50%)' }
              })} />
            </div>

            {/* Name Card */}
            <div className={css({
              padding: '20px 24px', borderTop: '1px solid rgba(57,255,110,0.18)', bg: 'rgba(0,0,0,0.9)',
              display: 'flex', alignItems: 'center', gap: '14px', backdropFilter: 'blur(10px)', position: 'relative', zIndex: 4
            })}>
              <div className={css({ w: '3px', h: '48px', bg: '#39ff6e', flexShrink: 0, position: 'relative', '&::after': { content: '""', position: 'absolute', top: 0, left: 0, w: '100%', h: '50%', bg: 'rgba(255,255,255,0.25)' } })} />
              <div className={css({ flex: 1 })}>
                <div className={css({
                  fontFamily: 'label', fontSize: '13px', fontWeight: '700', letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: 'white', lineHeight: 1.2,
                  opacity: isGlitched ? 0.4 : 1, transition: 'opacity 0.05s'
                })}>
                  Jeferson S. Paulino
                </div>
                <div className={css({ fontFamily: 'label', fontSize: '10px', letterSpacing: '0.18em', color: '#00c44e', textTransform: 'uppercase', mt: 1 })}>
                  {aboutData?.role || 'Sênior Full Stack & IA'}
                </div>
              </div>
              <div className={css({ display: 'flex', alignItems: 'center', gap: '5px', border: '1px solid rgba(57,255,110,0.2)', bg: 'rgba(57,255,110,0.04)', px: '10px', py: '6px', flexShrink: 0 })}>
                <div className={css({ w: '4px', h: '4px', rounded: 'full', bg: '#39ff6e', animation: 'blink 2s ease-in-out infinite' })} />
                <span className={css({ fontFamily: 'label', fontSize: '9px', letterSpacing: '0.2em', color: '#00c44e', textTransform: 'uppercase' })}>Disponível</span>
              </div>
            </div>
          </div>

          {/* ── STATS ROW ── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className={css({
              gridColumn: '1/-1', display: 'grid', gridTemplateColumns: { base: '1fr 1fr', lg: 'repeat(3, 1fr) 2fr' },
              borderTop: '1px solid rgba(57,255,110,0.08)', bg: '#0d160f'
            })}
          >
            {[
              { label: 'Repositórios', value: 43 },
              { label: 'Total de Commits', value: 352 },
              { label: 'GitHub', value: '@jottasilva', isLink: true },
              { label: 'Foco Atual', caption: true, value: 'Construindo sistemas que escalam sozinhos. Integrando IA como infra-estrutura, não como feature. Arquitetando para zero intervenção manual.' }
            ].map((stat, index) => (
              <div key={index} className={css({
                padding: '28px 36px',
                borderRight: index < 3 ? '1px solid rgba(57,255,110,0.08)' : 'none',
                borderBottom: { base: index < 2 ? '1px solid rgba(57,255,110,0.08)' : 'none', lg: 'none' },
                gridColumn: stat.caption ? { base: '1/-1', lg: 'auto' } : 'auto',
                position: 'relative', overflow: 'hidden', transition: 'background 0.3s',
                _hover: { bg: 'rgba(57,255,110,0.06)', '&::after': { w: 'full' } },
                '&::after': { content: '""', position: 'absolute', bottom: 0, left: 0, height: '2px', w: 0, bg: '#39ff6e', transition: 'width 0.5s ease' }
              })}>
                <div className={css({ fontFamily: 'label', fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#3d5e42', mb: '10px' })}>
                  {stat.label}
                </div>
                {stat.caption ? (
                  <p className={css({ fontFamily: 'label', fontSize: '13px', fontWeight: '300', lineHeight: 1.8, color: '#3d5e42', maxW: '340px', '& strong': { color: '#00c44e', fontWeight: '500' } })}>
                    Construindo sistemas que <strong>escalam sozinhos</strong>. Integrando IA como infra-estrutura, não como feature. Arquitetando para <strong>zero intervenção manual</strong>.
                  </p>
                ) : (
                  <div className={css({
                    fontFamily: stat.isLink ? 'label' : 'headline',
                    fontSize: stat.isLink ? '14px' : '56px',
                    fontWeight: stat.isLink ? '700' : '500',
                    color: stat.isLink ? '#39ff6e' : '#cee8d2',
                    lineHeight: 1,
                    pt: stat.isLink ? '10px' : '0'
                  })}>
                    {stat.isLink ? stat.value : <Counter target={stat.value as number} />}
                  </div>
                )}
              </div>
            ))}
          </motion.div>

        </div>

        {/* ── FOOTER ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className={css({
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '12px 36px', bg: '#040906', border: '1px solid rgba(57,255,110,0.08)', borderTop: 'none'
          })}
        >
          <div className={css({ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' })}>
            {[
              { b: 'Brasil', t: '· Remoto' },
              { b: 'SaaS', t: 'Multi-tenant' },
              { b: 'IA', t: '& Automação' },
              { b: '8+', t: 'Anos de Exp.' }
            ].map((item, index) => (
              <div key={index} className={css({ display: 'flex', alignItems: 'center', gap: 6 })}>
                {index > 0 && <div className={css({ w: '1px', h: '12px', bg: 'rgba(57,255,110,0.18)' })} />}
                <span className={css({ fontFamily: 'label', fontSize: '10px', letterSpacing: '0.18em', color: '#3d5e42', textTransform: 'uppercase', '& b': { color: '#7da882', fontWeight: 700 } })}>
                  <b>{item.b}</b> {item.t}
                </span>
              </div>
            ))}
          </div>
          <div className={css({ fontFamily: 'label', fontSize: '10px', letterSpacing: '0.2em', color: '#3d5e42', textTransform: 'uppercase' })}>
            sys.manifesto // jottasilva.dev
          </div>
        </motion.div>

        {/* ── SIDE TAG ── */}
        <div className={css({
          position: 'absolute', right: '-52px', top: '50%', transform: 'translateY(-50%) rotate(90deg)',
          fontFamily: 'label', fontSize: '10px', letterSpacing: '0.3em', color: '#3d5e42', textTransform: 'uppercase',
          whiteSpace: 'nowrap', display: { base: 'none', lg: 'block' }
        })}>
          full stack · ia · automação · saas · arquitetura
        </div>

      </div>
    </section>
  );
}
