'use client';

import { css, cx } from 'styled-system/css';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { supabaseService } from '@/domain/services/supabaseService';

const DEFAULT_CATEGORIES = [
  { title: 'Backend & APIs', skills: [] },
  { title: 'IA & Automação', skills: [] },
  { title: 'Frontend & UX', skills: [] },
  { title: 'Mobile & Cloud', skills: [] },
];

export default function SkillsSection() {
  const [categories, setCategories] = useState<any[]>(DEFAULT_CATEGORIES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const skillsFromDB = await supabaseService.getSkills();
        if (skillsFromDB.length > 0) {
           const grouped = [
             { title: 'Backend & APIs', skills: skillsFromDB.filter((s:any) => s.category === 'Backend & APIs') },
             { title: 'IA & Automação', skills: skillsFromDB.filter((s:any) => s.category === 'IA & Automação') },
             { title: 'Frontend & UX', skills: skillsFromDB.filter((s:any) => s.category === 'Frontend & UX') },
             { title: 'Mobile & Cloud', skills: skillsFromDB.filter((s:any) => s.category === 'Mobile & Cloud') },
           ];
           setCategories(grouped);
        } else {
           setCategories([
             { 
               title: 'Backend & APIs', 
               skills: [
                 { name: 'Node.js / Go / Python', value: '98%' }, 
                 { name: 'PHP / Python (Django)', value: '94%' },
                 { name: 'Supabase / Firebase', value: '96%' },
                 { name: 'PostgreSQL / MySQL', value: '95%' },
                 { name: 'Redis / OAuth2 / JWT', value: '94%' }
               ] 
             },
             { 
               title: 'IA & Automação', 
               skills: [
                 { name: 'n8n Workflows', value: '98%' }, 
                 { name: 'OpenAI API / Agentic', value: '97%' },
                 { name: 'Prompt Engineering', value: '96%' },
                 { name: 'LLM RAG & Embeddings', value: '95%' },
                 { name: 'AI Assistants', value: '95%' }
               ] 
             },
             { 
               title: 'Frontend & UX', 
               skills: [
                 { name: 'Next.js / React', value: '98%' }, 
                 { name: 'TypeScript / Vue.js', value: '95%' },
                 { name: 'GraphQL / WebSockets', value: '94%' },
                 { name: 'Panda CSS / Tailwind', value: '97%' }
               ] 
             },
             { 
               title: 'Mobile & Cloud', 
               skills: [
                 { name: 'Flutter / React Native', value: '94%' }, 
                 { name: 'Docker / CI/CD', value: '95%' },
                 { name: 'Nginx / Linux (VPS)', value: '93%' },
                 { name: 'Git Flow / Kanban', value: '95%' }
               ] 
             }
           ]);
        }
      } catch (err) {
         console.error(err);
      } finally {
         setLoading(false);
      }
    }
    fetchSkills();
  }, []);

  const backend = categories.find(c => c.title === 'Backend & APIs') || { skills: [] };
  const ia = categories.find(c => c.title === 'IA & Automação') || { skills: [] };
  const frontend = categories.find(c => c.title === 'Frontend & UX') || { skills: [] };
  const cloud = categories.find(c => c.title === 'Mobile & Cloud') || { skills: [] };

  if (loading) return null;

  return (
    <section id="skills" className={css({ position: 'relative', overflow: 'hidden', py: 20 })}>
      {/* Background Blobs */}
      <div className={css({ position: 'absolute', pointerEvents: 'none', filter: 'blur(90px)', borderRadius: '50%', w: '420px', h: '420px', bg: '#00e676', opacity: 0.04, top: '10%', left: '-8%' })} />
      <div className={css({ position: 'absolute', pointerEvents: 'none', filter: 'blur(90px)', borderRadius: '50%', w: '340px', h: '340px', bg: '#ec4899', opacity: 0.04, top: '5%', right: '5%' })} />
      
      <div className={css({ maxW: { base: '90vw', md: '70vw' }, mx: 'auto', px: { base: 6, md: 8 }, position: 'relative', zIndex: 1 })}>
        <p className={css({ fontFamily: 'label', fontSize: '10px', letterSpacing: '0.16em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', opacity: 0.7, mb: 3 })}>
          PARÂMETROS_DE_SISTEMA // CAPACIDADES
        </p>
        <h2 className={css({ fontFamily: 'headline', fontSize: { base: '44px', md: '56px', lg: '70px' }, fontWeight: '800', lineHeight: 0.93, letterSpacing: '-0.02em', mb: 14, color: '#dde8e0' })}>
          TECH <span className={css({ fontWeight: '300', color: 'rgba(255,255,255,0.6)' })}>STACK.</span>
        </h2>

        {/* Grid */}
        <div className={css({ display: 'grid', gridTemplateColumns: { base: '1fr', lg: '5fr 4fr 4fr' }, gridTemplateRows: { base: 'none', lg: '1fr 1fr' }, gap: '10px' })}>
          
          {/* 01 BACKEND */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className={cx(css({ gridColumn: { lg: 1 }, gridRow: { lg: '1 / 3' }, bg: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', rounded: '2px', p: 7, display: 'flex', flexDir: 'column', gap: 5, position: 'relative', overflow: 'hidden', backdropFilter: 'blur(20px)', cursor: 'default', transition: 'all 0.35s', _hover: { borderColor: 'rgba(0, 230, 118, 0.4)', bg: 'rgba(255,255,255,0.065)', transform: 'translateY(-3px)' }, justifyContent: 'space-between' }), 'glass-panel')}
          >
            <div className={css({ display: 'flex', alignItems: 'center', justifyContent: 'space-between' })}>
              <div className={css({ display: 'flex', alignItems: 'center', gap: 3 })}>
                <div className={css({ w: '44px', h: '44px', border: '1px solid rgba(0, 230, 118, 0.28)', rounded: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00e676', bg: 'rgba(0, 230, 118, 0.09)' })}>
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" className={css({ w: '18px', h: '18px' })}><ellipse cx="8" cy="4" rx="6" ry="2"/><path d="M2 4v4c0 1.1 2.7 2 6 2s6-.9 6-2V4"/><path d="M2 8v4c0 1.1 2.7 2 6 2s6-.9 6-2V8"/></svg>
                </div>
                <span className={css({ fontFamily: 'headline', fontSize: '13px', fontWeight: 'bold', color: 'white' })}>Backend & APIs</span>
              </div>
              <span className={css({ fontFamily: 'label', fontSize: '9px', color: 'rgba(255,255,255,0.12)' })}>01</span>
            </div>
            <div className={css({ h: '1px', bg: 'rgba(255,255,255,0.06)' })} />
            <div className={css({ display: 'flex', flexDir: 'column', gap: 4 })}>
              {backend.skills.map((s: any) => (
                <div key={s.name} className={css({ display: 'flex', flexDir: 'column', gap: 2 })}>
                  <div className={css({ display: 'flex', justifyContent: 'space-between', fontFamily: 'label', fontSize: '12px', color: 'rgba(255,255,255,0.85)', fontWeight: '500' })}><span>{s.name}</span><span className={css({ color: '#00e676', fontWeight: 'bold' })}>{s.value}</span></div>
                  <div className={css({ h: '4px', bg: 'rgba(0, 230, 118, 0.14)', overflow: 'hidden', rounded: 'full' })}>
                    <motion.div initial={{ width: 0 }} whileInView={{ width: String(s.value).endsWith('%') ? s.value : `${s.value}%` }} viewport={{ once: true }} transition={{ duration: 1 }} className={css({ h: 'full', bg: 'linear-gradient(90deg, rgba(0, 230, 118, 0.3) 0%, #00e676 100%)', rounded: 'full' })} />
                  </div>
                </div>
              ))}
            </div>
            <div className={css({ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 'auto' })}>
              {['REST', 'GraphQL', 'OAuth2', 'WebSockets'].map(t => <span key={t} className={css({ fontFamily: 'label', fontSize: '9px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(0, 230, 118, 0.55)', border: '1px solid rgba(0, 230, 118, 0.18)', bg: 'rgba(0, 230, 118, 0.05)', px: 2.5, py: 1, rounded: '2px' })}>{t}</span>)}
            </div>
            <span className={css({ fontFamily: 'label', fontSize: { base: '52px', lg: '80px' }, fontWeight: '700', color: '#00e676', opacity: 0.18, alignSelf: 'flex-end', lineHeight: 1, letterSpacing: '-0.03em', position: 'absolute', bottom: 4, right: 6, zIndex: -1 })}>98</span>
          </motion.div>

          {/* 03 IA */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            className={cx(css({ gridColumn: { lg: '2 / 4' }, gridRow: { lg: 1 }, bg: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', rounded: '2px', p: 7, display: 'flex', flexDir: 'column', gap: 5, position: 'relative', overflow: 'hidden', backdropFilter: 'blur(20px)', cursor: 'default', transition: 'all 0.35s', _hover: { borderColor: 'rgba(236, 72, 153, 0.4)', bg: 'rgba(255,255,255,0.065)', transform: 'translateY(-3px)' } }), 'glass-panel')}
          >
            <div className={css({ display: 'flex', alignItems: 'center', justifyContent: 'space-between' })}>
              <div className={css({ display: 'flex', alignItems: 'center', gap: 3 })}>
                <div className={css({ w: '44px', h: '44px', border: '1px solid rgba(236, 72, 153, 0.28)', rounded: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ec4899', bg: 'rgba(236, 72, 153, 0.09)' })}>
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" className={css({ w: '18px', h: '18px' })}><rect x="2" y="2" width="12" height="12" rx="1"/><circle cx="8" cy="8" r="2"/><path d="M8 2v2M8 12v2M2 8h2M12 8h2"/></svg>
                </div>
                <span className={css({ fontFamily: 'headline', fontSize: '13px', fontWeight: 'bold', color: 'white' })}>IA & Automação</span>
              </div>
              <span className={css({ fontFamily: 'label', fontSize: '9px', color: 'rgba(255,255,255,0.12)' })}>03</span>
            </div>
            <div className={css({ h: '1px', bg: 'rgba(255,255,255,0.06)' })} />
            <div className={css({ display: 'grid', gridTemplateColumns: { base: '1fr', md: '1fr 1fr' }, gap: 4 })}>
              {ia.skills.map((s: any) => (
                <div key={s.name} className={css({ display: 'flex', flexDir: 'column', gap: 2 })}>
                  <div className={css({ display: 'flex', justifyContent: 'space-between', fontFamily: 'label', fontSize: '12px', color: 'rgba(255,255,255,0.85)', fontWeight: '500' })}><span>{s.name}</span><span className={css({ color: '#ec4899', fontWeight: 'bold' })}>{s.value}</span></div>
                  <div className={css({ h: '4px', bg: 'rgba(236, 72, 153, 0.14)', overflow: 'hidden', rounded: 'full' })}>
                    <motion.div initial={{ width: 0 }} whileInView={{ width: String(s.value).endsWith('%') ? s.value : `${s.value}%` }} viewport={{ once: true }} transition={{ duration: 1 }} className={css({ h: 'full', bg: 'linear-gradient(90deg, rgba(236, 72, 153, 0.3) 0%, #ec4899 100%)', rounded: 'full' })} />
                  </div>
                </div>
              ))}
            </div>
            <div className={css({ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 'auto' })}>
              {['LLM', 'RAG', 'Agents', 'Prompting'].map(t => <span key={t} className={css({ fontFamily: 'label', fontSize: '9px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(236, 72, 153, 0.55)', border: '1px solid rgba(236, 72, 153, 0.18)', bg: 'rgba(236, 72, 153, 0.05)', px: 2.5, py: 1, rounded: '2px' })}>{t}</span>)}
            </div>
          </motion.div>

          {/* 02 FRONTEND */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
            className={cx(css({ gridColumn: { lg: 2 }, gridRow: { lg: 2 }, bg: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', rounded: '2px', p: 7, display: 'flex', flexDir: 'column', gap: 5, position: 'relative', overflow: 'hidden', backdropFilter: 'blur(20px)', cursor: 'default', transition: 'all 0.35s', _hover: { borderColor: 'rgba(168, 85, 247, 0.4)', bg: 'rgba(255,255,255,0.065)', transform: 'translateY(-3px)' } }), 'glass-panel')}
          >
            <div className={css({ display: 'flex', alignItems: 'center', justifyContent: 'space-between' })}>
              <div className={css({ display: 'flex', alignItems: 'center', gap: 3 })}>
                <div className={css({ w: '44px', h: '44px', border: '1px solid rgba(168, 85, 247, 0.28)', rounded: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a855f7', bg: 'rgba(168, 85, 247, 0.09)' })}>
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" className={css({ w: '18px', h: '18px' })}><rect x="1" y="2" width="14" height="10" rx="1"/><path d="M5 15h6M8 12v3"/></svg>
                </div>
                <span className={css({ fontFamily: 'headline', fontSize: '13px', fontWeight: 'bold', color: 'white' })}>Frontend & UX</span>
              </div>
              <span className={css({ fontFamily: 'label', fontSize: '9px', color: 'rgba(255,255,255,0.12)' })}>02</span>
            </div>
            <div className={css({ h: '1px', bg: 'rgba(255,255,255,0.06)' })} />
            <div className={css({ display: 'flex', flexDir: 'column', gap: 4 })}>
              {frontend.skills.map((s: any) => (
                <div key={s.name} className={css({ display: 'flex', flexDir: 'column', gap: 2 })}>
                  <div className={css({ display: 'flex', justifyContent: 'space-between', fontFamily: 'label', fontSize: '12px', color: 'rgba(255,255,255,0.85)', fontWeight: '500' })}><span>{s.name}</span><span className={css({ color: '#a855f7', fontWeight: 'bold' })}>{s.value}</span></div>
                  <div className={css({ h: '4px', bg: 'rgba(168, 85, 247, 0.14)', overflow: 'hidden', rounded: 'full' })}>
                    <motion.div initial={{ width: 0 }} whileInView={{ width: String(s.value).endsWith('%') ? s.value : `${s.value}%` }} viewport={{ once: true }} transition={{ duration: 1 }} className={css({ h: 'full', bg: 'linear-gradient(90deg, rgba(168, 85, 247, 0.3) 0%, #a855f7 100%)', rounded: 'full' })} />
                  </div>
                </div>
              ))}
            </div>
            <div className={css({ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 'auto' })}>
              {['React', 'Next.js', 'Vue', 'WS'].map(t => <span key={t} className={css({ fontFamily: 'label', fontSize: '9px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(168, 85, 247, 0.55)', border: '1px solid rgba(168, 85, 247, 0.18)', bg: 'rgba(168, 85, 247, 0.05)', px: 2.5, py: 1, rounded: '2px' })}>{t}</span>)}
            </div>
          </motion.div>

          {/* 04 CLOUD */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
            className={cx(css({ gridColumn: { lg: 3 }, gridRow: { lg: 2 }, bg: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', rounded: '2px', p: 7, display: 'flex', flexDir: 'column', gap: 5, position: 'relative', overflow: 'hidden', backdropFilter: 'blur(20px)', cursor: 'default', transition: 'all 0.35s', _hover: { borderColor: 'rgba(6, 182, 212, 0.4)', bg: 'rgba(255,255,255,0.065)', transform: 'translateY(-3px)' } }), 'glass-panel')}
          >
            <div className={css({ display: 'flex', alignItems: 'center', justifyContent: 'space-between' })}>
              <div className={css({ display: 'flex', alignItems: 'center', gap: 3 })} >
                <div className={css({ w: '44px', h: '44px', border: '1px solid rgba(6, 182, 212, 0.28)', rounded: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#06b6d4', bg: 'rgba(6, 182, 212, 0.09)' })}>
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" className={css({ w: '18px', h: '18px' })}><path d="M13 10a3 3 0 0 0-3-3 4 4 0 0 0-7.8 1A3 3 0 0 0 3 14h10a3 3 0 0 0 0-6z"/></svg>
                </div>
                <span className={css({ fontFamily: 'headline', fontSize: '13px', fontWeight: 'bold', color: 'white' })}>Mobile & Cloud</span>
              </div>
              <span className={css({ fontFamily: 'label', fontSize: '9px', color: 'rgba(255,255,255,0.012)' })}>04</span>
            </div>
            <div className={css({ h: '1px', bg: 'rgba(255,255,255,0.06)' })} />
            <div className={css({ display: 'flex', flexDir: 'column', gap: 4 })}>
              {cloud.skills.map((s: any) => (
                <div key={s.name} className={css({ display: 'flex', flexDir: 'column', gap: 2 })}>
                  <div className={css({ display: 'flex', justifyContent: 'space-between', fontFamily: 'label', fontSize: '12px', color: 'rgba(255,255,255,0.85)', fontWeight: '500' })}><span>{s.name}</span><span className={css({ color: '#06b6d4', fontWeight: 'bold' })}>{s.value}</span></div>
                  <div className={css({ h: '4px', bg: 'rgba(6, 182, 212, 0.14)', overflow: 'hidden', rounded: 'full' })}>
                    <motion.div initial={{ width: 0 }} whileInView={{ width: String(s.value).endsWith('%') ? s.value : `${s.value}%` }} viewport={{ once: true }} transition={{ duration: 1 }} className={css({ h: 'full', bg: 'linear-gradient(90deg, rgba(6, 182, 212, 0.3) 0%, #06b6d4 100%)', rounded: 'full' })} />
                  </div>
                </div>
              ))}
            </div>
            <div className={css({ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 'auto' })}>
              {['Docker', 'CI/CD', 'Kanban', 'Scrum'].map(t => <span key={t} className={css({ fontFamily: 'label', fontSize: '9px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(6, 182, 212, 0.55)', border: '1px solid rgba(6, 182, 212, 0.18)', bg: 'rgba(6, 182, 212, 0.05)', px: 2.5, py: 1, rounded: '2px' })}>{t}</span>)}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
