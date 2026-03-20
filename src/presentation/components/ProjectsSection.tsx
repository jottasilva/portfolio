'use client';

import { useState, useEffect } from 'react';
import { css, cx } from 'styled-system/css';
import { motion } from 'framer-motion';

import { appwriteService } from '@/domain/services/appwriteService';

const HARDCODED_PROJECTS = [
  {
    id: '1',
    category: 'IA',
    node: 'Automação',
    title: 'Gerenc-AI (ZapPDV)',
    description: 'Automação inteligente para WhatsApp que funciona como um PDV completo. Gerenciamento de pedidos, estoque e relatórios direto no chat.',
    image: '/projects/gerencia.png',
    size: 'large',
    link: 'https://gerencia.ogerente.site/'
  },
  {
    id: '2',
    category: 'Sistemas',
    node: 'Finanças',
    title: 'Finzap',
    description: 'Plataforma de gestão financeira minimalista para controle de receitas e despesas, ideal para substituir planilhas com eficiência.',
    image: '/projects/finzap.png',
    size: 'normal',
    link: 'https://finzap-one.vercel.app/'
  }
];

const CATEGORIES = [
  { label: 'Todos os Nós', value: 'Todos_Nós' },
  { label: 'SaaS / Multi-Tenant', value: 'Sistemas' },
  { label: 'IA & Automação', value: 'IA' },
];

export default function ProjectsSection() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Todos_Nós');
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const projs = await appwriteService.getProjects();
        setProjects(projs.length > 0 ? projs : HARDCODED_PROJECTS);
      } catch (err) {
        console.error(err);
        setProjects(HARDCODED_PROJECTS);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  useEffect(() => {
    setVisibleCount(6);
  }, [activeCategory]);

  const filteredProjects = activeCategory === 'Todos_Nós'
    ? projects
    : projects.filter((p: any) => p.category === activeCategory);

  return (
    <section id="projects" className={css({ pt: 48, pb: 24, px: 8, maxW: '8xl', mx: 'auto' })}>
      <motion.header 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className={css({ display: 'grid', gridTemplateColumns: { base: '1fr', md: 'repeat(12, 1fr)' }, gap: 8, alignItems: 'end', mb: 24 })}
      >
        <div className={css({ gridColumn: { md: 'span 8' } })}>
          <span className={cx(css({ fontFamily: 'label', color: 'primary', letterSpacing: '0.3em', fontSize: 'xs', textTransform: 'uppercase', mb: 4, display: 'block' }), 'neon-glow')}>
            Saída_Terminal // Projetos_Destaque
          </span>
          <h1 className={css({ fontFamily: 'headline', fontSize: { base: '4xl', md: '6xl', lg: '7xl' }, fontWeight: 'black', letterSpacing: 'tighter', color: 'white', lineHeight: 0.9, textTransform: 'uppercase' })}>
            SOBREPOSIÇÃO <br /> <span className={css({ color: 'primary', fontStyle: 'italic', fontWeight: 'light', opacity: 0.8 })}>DE SISTEMA.</span>
          </h1>
        </div>
        <div className={css({ gridColumn: { md: 'span 4' }, pb: 4 })}>
          <p className={css({ color: 'gray.400', fontFamily: 'body', fontSize: 'lg', lineHeight: 'relaxed', maxW: 'sm', borderLeft: '2px solid', borderColor: 'primary', pl: 6 })}>
            Workflows inteligentes e arquiteturas SaaS de alto padrão, desenhadas para eliminar gargalos e acelerar resultados.
          </p>
        </div>
      </motion.header>

      {/* Filters */}
      <div className={css({ bg: 'rgba(5,5,5,0.4)', px: 8, py: 6, borderY: '1px solid rgba(255,255,255,0.03)', backdropFilter: 'blur(12px)', mx: -8, mb: 24 })}>
        <div className={css({ maxW: '8xl', mx: 'auto', display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' })}>
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={css({
                fontFamily: 'label',
                fontSize: { base: 'xs', md: 'sm' },
                letterSpacing: 'wider',
                textTransform: 'uppercase',
                pb: 1,
                cursor: 'pointer',
                borderBottom: '1px solid',
                transition: 'all 0.3s',
                borderColor: activeCategory === cat.value ? 'primary' : 'transparent',
                color: activeCategory === cat.value ? 'primary' : 'gray.500',
                _hover: { color: 'primary', transform: 'translateY(-1px)' }
              })}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

       {/* Listagem Alternada Premium */}
      <div className={css({ display: 'flex', flexDir: 'column', gap: { base: 12, lg: 20 }, pt: 10 })}>
        {filteredProjects.slice(0, visibleCount).map((project, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div
              key={project.$id || `proj-${index}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={css({ display: 'grid', gridTemplateColumns: { base: '1fr', lg: 'repeat(12, 1fr)' }, gap: { base: 6, lg: 12 }, alignItems: 'center', pb: { base: 12, lg: 20 }, borderBottom: '1px solid rgba(255,255,255,0.03)' })}
            >
              {/* Image side */}
              <div className={css({ gridColumn: { lg: 'span 7' }, order: { base: 1, lg: isEven ? 1 : 2 }, position: 'relative', overflow: 'hidden', rounded: 'xl', border: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer', aspectRatio: '16/10', boxShadow: '2xl', transition: 'transform 0.5s', _hover: { transform: 'scale(1.01)' } })} onClick={() => project.link !== '#' && window.open(project.link, '_blank')}>
                <img src={project.image} alt={project.title} className={css({ w: 'full', h: 'full', objectFit: 'cover', transition: 'transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)', _hover: { transform: 'scale(1.04)' } })} />
                <div className={css({ position: 'absolute', inset: 0, bgGradient: 'to-t', gradientFrom: 'rgba(0,0,0,0.85)', gradientVia: 'rgba(0,0,0,0.2)', gradientTo: 'transparent' })} />
              </div>

              {/* Text side */}
              <div className={css({ gridColumn: { lg: 'span 5' }, order: { base: 2, lg: isEven ? 2 : 1 }, display: 'flex', flexDir: 'column', gap: 4 })}>
                <span className={css({ fontFamily: 'label', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.3em', color: 'primary' })}>{project.category?.replace('_', ' ') || 'Geral'}</span>
                <h3 className={css({ fontFamily: 'headline', fontSize: '2xl', fontWeight: 'bold', color: 'white' })}>{project.title}</h3>
                <p className={css({ fontFamily: 'body', fontSize: 'sm', color: 'gray.400', lineHeight: 'relaxed' })}>{project.description}</p>
                
                <div className={css({ display: 'flex', alignItems: 'center', gap: 3, mt: 2 })}>
                  <div className={css({ h: '1px', w: 10, bg: 'primary' })} />
                  <span className={css({ fontFamily: 'label', fontSize: '9px', letterSpacing: '0.2em', color: 'gray.500', textTransform: 'uppercase' })}>{project.node}</span>
                </div>

                <a href={project.link} target="_blank" className={css({ mt: 4, alignSelf: 'start', display: 'flex', alignItems: 'center', gap: 2, fontFamily: 'label', fontSize: '12px', letterSpacing: '0.1em', color: 'primary', fontWeight: 'bold', textTransform: 'uppercase', cursor: 'pointer', _hover: { gap: 4, color: 'white' }, transition: 'all 0.3s' })}>
                  {project.link !== '#' ? 'Ver Projeto' : 'Investigar Nó'} <span>→</span>
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>

      {visibleCount < filteredProjects.length && (
        <div className={css({ display: 'flex', justifyContent: 'center', mt: 16 })}>
          <button
            onClick={() => setVisibleCount(prev => prev + 2)}
            className={css({
              fontFamily: 'label',
              fontSize: 'xs',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              bg: 'transparent',
              border: '1px solid rgba(200,255,0,0.3)',
              color: 'primary',
              px: 8,
              py: 3,
              rounded: 'lg',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s',
              _hover: { bg: 'primary', color: 'black', transform: 'translateY(-2px)', boxShadow: '0 0 20px rgba(200,255,0,0.1)' }
            })}
          >
            Carregar Mais Experiências <span>+</span>
          </button>
        </div>
      )}
    </section>
  );
}
