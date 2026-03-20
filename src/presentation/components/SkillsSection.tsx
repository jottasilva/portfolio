'use client';

import { css, cx } from 'styled-system/css';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { appwriteService } from '@/domain/services/appwriteService';

const DEFAULT_CATEGORIES = [
  { title: 'Backend & APIs', skills: [] },
  { title: 'Frontend & UX', skills: [] },
  { title: 'IA & Automação', skills: [] },
  { title: 'Mobile & Cloud', skills: [] },
];

export default function SkillsSection() {
  const [categories, setCategories] = useState<any[]>(DEFAULT_CATEGORIES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const skillsFromDB = await appwriteService.getSkills();
        
        if (skillsFromDB.length > 0) {
           const grouped = [
             { title: 'Backend & APIs', skills: skillsFromDB.filter((s:any) => s.category === 'Backend & APIs') },
             { title: 'Frontend & UX', skills: skillsFromDB.filter((s:any) => s.category === 'Frontend & UX') },
             { title: 'IA & Automação', skills: skillsFromDB.filter((s:any) => s.category === 'IA & Automação') },
             { title: 'Mobile & Cloud', skills: skillsFromDB.filter((s:any) => s.category === 'Mobile & Cloud') },
           ];
           setCategories(grouped);
        } else {
           // Fallback para hardcoded se banco vazio
           setCategories([
             { title: 'Backend & APIs', skills: [{ name: 'Node.js / Go', value: '95%' }, { name: 'Python', value: '90%' }] },
             { title: 'Frontend & UX', skills: [{ name: 'Next.js / React', value: '98%' }] },
             { title: 'IA & Automação', skills: [{ name: 'n8n Workflow', value: '98%' }] },
             { title: 'Mobile & Cloud', skills: [{ name: 'Flutter', value: '90%' }] },
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

  return (
    <section id="skills" className={css({ pt: 40, pb: 24, px: 8, maxW: '8xl', mx: 'auto' })}>
      <motion.header 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className={css({ mb: 20 })}
      >
        <span className={cx(css({ fontFamily: 'label', color: 'secondary', letterSpacing: '0.3em', fontSize: 'xs', textTransform: 'uppercase', mb: 3, display: 'block' }), 'neon-glow')}>
          Parâmetros_De_Sistema // Capacidades
        </span>
        <h1 className={css({ fontFamily: 'headline', fontSize: { base: '5xl', md: '7xl' }, fontWeight: 'bold', letterSpacing: 'tighter', mb: 4, textTransform: 'uppercase' })}>
          Tech <span className={css({ color: 'secondary', fontStyle: 'italic' })}>Stack.</span>
        </h1>
      </motion.header>

      <div className={css({ display: 'grid', gridTemplateColumns: { base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 6 })}>
        {categories.map((category: any, catIndex: number) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: catIndex * 0.1 }}
            className={cx(
              css({
                bg: 'rgba(20,20,20,0.4)',
                border: '1px solid rgba(255,255,255,0.03)',
                p: 6,
                rounded: 'xl',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDir: 'column',
                gap: 5,
                transition: 'all 0.3s',
                _hover: { bg: 'rgba(139, 92, 246, 0.02)', borderColor: 'rgba(139, 92, 246, 0.15)' }
              }),
              'glass-panel'
            )}
          >
            <h3 className={css({ fontFamily: 'headline', fontSize: 'md', fontWeight: 'bold', color: 'white', borderBottom: '1px solid rgba(255,255,255,0.04)', pb: 3 })}>{category.title}</h3>
            
            <div className={css({ display: 'flex', flexDir: 'column', gap: 4 })}>
              {category.skills.map((skill: any) => (
                <div key={skill.name}>
                  <div className={css({ display: 'flex', justifyContent: 'space-between', mb: 1 })}>
                    <span className={css({ fontFamily: 'body', fontSize: 'xs', color: 'gray.300' })}>{skill.name}</span>
                    <span className={css({ fontFamily: 'label', fontSize: '10px', color: 'secondary' })}>{skill.value}</span>
                  </div>
                  <div className={css({ h: '3px', bg: 'rgba(255,255,255,0.05)', rounded: 'full', overflow: 'hidden' })}>
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: skill.value }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className={css({ h: 'full', bgGradient: 'to-r', gradientFrom: 'secondary', gradientTo: 'purple.500' })}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
