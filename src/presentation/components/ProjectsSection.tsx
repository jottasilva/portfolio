'use client';

import { useState, useEffect } from 'react';
import { css, cx } from 'styled-system/css';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

import { supabaseService } from '@/domain/services/supabaseService';

const HARDCODED_PROJECTS = [
  {
    id: '1',
    category: 'Sistemas',
    node: 'Automação',
    title: 'Gerenc-AI (ZapPDV)',
    description: 'Automação comercial e gestão de vendas 100% integradas ao WhatsApp.\nAgente de Atendimento IA 24/7 integrado a LLMs nativos\nPainel Dashboard Analítico de Vendas e rastreio de CAC\nControle de Estoque inteligente com webhooks escaláveis\nRelatórios Financeiros e de Conversão diários automatizados\nSuporte à Multi-Operadores e controle de caixa unificado\nGeração de Links de Pagamento integrado de ponta a ponta',
    image: '/projects/gerencia.png',
    size: 'large',
    link: 'https://gerencia.ogerente.site/',
    tech: ['WhatsApp API', 'Node.js', 'LLMs', 'Subgraphs']
  },
  {
    id: '2',
    category: 'Sistemas',
    node: 'Finanças',
    title: 'Finzap',
    description: 'Controle financeiro projetado para pequenas empresas e investidores.\nAPIs de Conciliação Bancária automáticas e seguras\nDashboards dinâmicos de Balanço Patrimonial em tempo real\nProjeção avançada de Fluxo de Caixa e Planejamento Orçamentário\nDRE Gerencial automático com rastreio de Ponto de Equilíbrio\nGestão de Contas a Pagar/Receber com alertas via webhook\nUX de alta performance com tempos de carga inferiores a 200ms',
    image: '/projects/finzap.png',
    size: 'normal',
    link: 'https://finzap-one.vercel.app/',
    tech: ['Next.js', 'Tailwind', 'Chart.js', 'Supabase']
  },
  {
    id: '3',
    category: 'IA',
    node: 'Plataforma',
    title: 'CaseLab',
    description: 'QA e Automação de Testes para ecossistemas de software escaláveis.\nIntegração ágil com esteiras de CI/CD (GitHub Actions)\nDiagnósticos Analíticos de estabilidade e carga estática\nVerificação de regressão visual e segurança via IA preditiva\nCobertura de código rastreada em tempo real por módulo\nGeração de Relatórios Técnicos homologados para auditorias\nDisparos de alertas via Slack/Teams sobre falhas críticas',
    image: '/projects/caselab.png',
    size: 'normal',
    link: '#',
    tech: ['GitHub Actions', 'Docker', 'React', 'Zod']
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
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const projs = await supabaseService.getProjects();
        const merged = projs.map((p: any) => {
          const fallback = (HARDCODED_PROJECTS.find(h => h.title === p.title) || {}) as any;
          return {
            ...fallback,
            ...p,
            description: p.description && p.description.length > 20 ? p.description : fallback.description,
            image: p.image && p.image !== '' ? p.image : fallback.image,
            tech: p.tech || fallback.tech
          };
        });
        setProjects(merged.length > 0 ? merged : HARDCODED_PROJECTS);
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
    setCurrentIndex(0); // Reset index ao trocar categoria
  }, [activeCategory]);

  const filteredProjects = activeCategory === 'Todos_Nós'
    ? projects
    : projects.filter((p: any) => p.category === activeCategory);

  const nextSlide = () => {
    if (filteredProjects.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  const prevSlide = () => {
    if (filteredProjects.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  const visibleProjects = [];
  const len = filteredProjects.length;
  if (len > 0) {
    visibleProjects.push(filteredProjects[currentIndex]);
    if (len > 1) visibleProjects.push(filteredProjects[(currentIndex + 1) % len]);
    if (len > 2) visibleProjects.push(filteredProjects[(currentIndex + 2) % len]);
  }

  if (loading) {
    return (
      <div className={css({ minH: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'gray.600', fontFamily: 'label', fontSize: 'xs' })}>
         CARREGANDO_WORKFLOWS...
      </div>
    );
  }

  return (
    <section id="projects" className={css({ pt: 40, pb: 24, px: { base: 6, md: 8 }, maxW: { base: '90vw', md: '70vw' }, mx: 'auto' })}>
      {/* HERO / HEADER */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className={css({ mb: 10 })}
      >
        <div>
          <div className={css({ display: 'flex', alignItems: 'center', gap: 4 })}>
             <div className={css({ h: '1px', w: 12, bg: 'rgba(255,255,255,0.2)' })}></div>
             <span className={css({ fontFamily: 'label', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.4em', fontSize: '13px' })}>PRODUTOS // SOLUÇÕES</span>
          </div>
        </div>
      </motion.div>

      {/* TABS (FILTROS) */}
      <div className={css({ mb: 10, display: 'flex', gap: 3 })}>
        {CATEGORIES.map(cat => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={css({
              fontFamily: 'label',
              fontSize: '9px',
              letterSpacing: 'wider',
              textTransform: 'uppercase',
              px: 4,
              py: 2,
              cursor: 'pointer',
              transition: 'all 0.2s',
              bg: activeCategory === cat.value ? 'rgba(0, 230, 118, 0.1)' : 'transparent',
              border: '1px solid',
              borderColor: activeCategory === cat.value ? 'rgba(0, 230, 118, 0.4)' : 'rgba(255,255,255,0.04)',
              color: activeCategory === cat.value ? 'white' : 'gray.400',
              _hover: { bg: 'rgba(255,255,255,0.03)', color: 'white' },
              fontWeight: activeCategory === cat.value ? 'bold' : 'normal'
            })}
          >
            {cat.label}
          </button>
        ))}
      </div>
      {/* PAGINATED GRID CONTAINER */}
      {filteredProjects.length > 0 ? (
        <div className={css({ position: 'relative' })}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex + activeCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className={css({ 
                display: 'grid', 
                gridTemplateColumns: { base: '1fr', lg: '1fr 1fr' }, 
                gap: '1px', 
                bg: 'rgba(255, 255, 255, 0.04)', 
                border: '1px solid rgba(255, 255, 255, 0.04)', 
                overflow: 'hidden',
                position: 'relative'
              })}
            >
              {visibleProjects.map((project, index) => {
                const isFeatured = index === 0;

                return (
                  <div
                    key={project.id || `proj-${index}`}
                    className={cx(
                      css({
                        gridColumn: isFeatured ? { lg: 'span 2' } : 'auto',
                        display: isFeatured ? 'grid' : 'flex',
                        gridTemplateColumns: isFeatured ? { base: '1fr', lg: '1.2fr 1fr' } : 'none',
                        flexDir: isFeatured ? 'none' : 'column',
                        gap: isFeatured ? { base: 6, lg: 12 } : 5,
                        p: { base: 6, md: 10 },
                        bg: '#080b0a', 
                        transition: 'background 0.3s',
                        position: 'relative',
                        _hover: { bg: 'rgba(255,255,255,0.015)' }
                      })
                    )}
                  >
                    {isFeatured && (
                      <div className={css({
                        position: 'absolute',
                        inset: 0,
                        bg: 'radial-gradient(circle at top right, rgba(0, 230, 118, 0.03) 0%, transparent 40%)',
                        pointerEvents: 'none'
                      })} />
                    )}

                    <div className={css({ display: 'flex', flexDir: 'column', gap: isFeatured ? 5 : 4, zIndex: 2 })}>
                      {isFeatured && project.node && (
                        <span className={css({ 
                          display: 'inline-flex', 
                          alignItems: 'center', 
                          gap: 1.5, 
                          fontFamily: 'label', 
                          fontSize: '9px', 
                          color: 'primary', 
                          bg: 'rgba(0, 230, 118, 0.08)', 
                          border: '1px solid rgba(0, 230, 118, 0.2)', 
                          px: 3, 
                          py: 1, 
                          rounded: '2px', 
                          alignSelf: 'start',
                          letterSpacing: '0.1em'
                        })}>
                          {project.node || 'AUTOMATION'}
                        </span>
                      )}

                      {!isFeatured && (
                        <div className={css({ display: 'flex', alignItems: 'center', gap: 2 })}>
                          <div className={css({ w: '20px', h: '1px', bg: 'primary', opacity: 0.5 })} />
                          <span className={css({ fontFamily: 'label', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'primary' })}>
                            {project.category || 'Geral'}
                          </span>
                        </div>
                      )}

                      <h2 className={css({ 
                        fontFamily: 'headline', 
                        fontSize: isFeatured ? { base: '28px', md: '36px' } : '20px', 
                        fontWeight: '800', 
                        color: 'white', 
                        lineHeight: '1.1' 
                      })}>
                        {project.title}
                      </h2>

                      <ul className={css({ display: 'flex', flexDir: 'column', gap: 2, listStyle: 'none' })}>
                         {(project.description || '').split('\n').map((line: string, i: number) => (
                            <li key={i} className={css({ display: 'flex', alignItems: 'start', gap: 2, fontFamily: 'body', fontSize: '13px', color: 'gray.400', lineHeight: '1.6', maxW: isFeatured ? '400px' : 'none' })}>
                               <span className={css({ color: 'primary', mt: 1 })}>▸</span> {line}
                            </li>
                         ))}
                      </ul>

                      {project.tech && (
                        <div className={css({ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 3, pt: 3, borderTop: '1px solid rgba(255,255,255,0.02)' })}>
                          {project.tech.map((t: string) => (
                             <span key={t} className={css({ fontSize: '9px', bg: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', px: 2, py: 0.5, rounded: '2px', color: 'gray.400', fontFamily: 'label', letterSpacing: '0.05em' })}>
                               {t}
                             </span>
                          ))}
                        </div>
                      )}

                      {project.link && project.link !== '#' && (
                        <a 
                          href={project.link} 
                          target="_blank" 
                          className={css({ 
                            mt: 'auto', 
                            pt: 4, 
                            borderTop: '1px solid rgba(255,255,255,0.04)', 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 2, 
                            fontFamily: 'label', 
                            fontSize: '10px', 
                            textTransform: 'uppercase', 
                            color: 'white', 
                            fontWeight: 'bold', 
                            _hover: { color: 'primary', gap: 4 }, 
                            transition: 'all 0.3s' 
                          })}
                        >
                          Ver Projeto 
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={css({ stroke: 'currentColor', transition: 'transform 0.2s' })}>
                            <path d="M1 6h10M6 1l5 5-5 5" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </a>
                      )}
                    </div>

                    {isFeatured && (
                      <div className={css({ display: 'flex', flexDir: 'column', gap: 4, zIndex: 2 })}>
                        <div className={css({ 
                          bg: 'rgba(20, 20, 20, 0.6)', 
                          border: '1px solid rgba(255, 255, 255, 0.05)', 
                          rounded: '2px', 
                          overflow: 'hidden', 
                          aspectRatio: '16/10', 
                          position: 'relative', 
                          boxShadow: '2xl' 
                        })}>
                          <div className={css({ h: '28px', bg: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', px: 3, gap: 1.5, borderBottom: '1px solid rgba(255,255,255,0.03)' })}>
                            <div className={css({ w: 1.5, h: 1.5, rounded: 'full', bg: 'gray.600', opacity: 0.6 })} />
                            <div className={css({ w: 1.5, h: 1.5, rounded: 'full', bg: 'gray.600', opacity: 0.6 })} />
                            <div className={css({ w: 1.5, h: 1.5, rounded: 'full', bg: 'gray.600', opacity: 0.6 })} />
                          </div>
                          <div className={css({ position: 'relative', w: 'full', h: 'calc(100% - 28px)', overflow: 'hidden' })}>
                            {project.image ? (
                              <Image src={project.image} fill className={css({ objectFit: 'cover' })} alt={project.title} />
                            ) : (
                              <div className={css({ display: 'flex', alignItems: 'center', justifyContent: 'center', h: 'full', color: 'gray.700', fontFamily: 'label', fontSize: '11px' })}>
                                PREVIEW_NÓ
                              </div>
                            )}
                            <div className={css({ position: 'absolute', inset: 0, bg: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' })} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Slider Navigation */}
          {filteredProjects.length > 1 && (
            <div className={css({ display: 'flex', gap: 1.5, mt: 4, justifyContent: 'flex-end' })}>
              <button 
                onClick={prevSlide}
                className={css({ 
                  p: 1.5, 
                  rounded: '2px', 
                  border: '1px solid rgba(255, 255, 255, 0.04)', 
                  bg: 'rgba(255, 255, 255, 0.01)', 
                  color: 'white', 
                  cursor: 'pointer', 
                  _hover: { bg: 'primary', color: 'black', borderColor: 'primary' }, 
                  transition: 'all 0.2s' 
                })}
                aria-label="Anterior"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              </button>
              <button 
                onClick={nextSlide}
                className={css({ 
                  p: 1.5, 
                  rounded: '2px', 
                  border: '1px solid rgba(255, 255, 255, 0.04)', 
                  bg: 'rgba(255, 255, 255, 0.01)', 
                  color: 'white', 
                  cursor: 'pointer', 
                  _hover: { bg: 'primary', color: 'black', borderColor: 'primary' }, 
                  transition: 'all 0.2s' 
                })}
                aria-label="Próximo"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className={css({ color: 'gray.600', fontFamily: 'label', fontSize: 'xs', textAlign: 'center', py: 20 })}>
          NENHUM_PROJETO_ENCONTRADO_PARA_ESTE_NÓ
        </div>
      )}
    </section>
  );
}
