'use client';

import { useState, useEffect } from 'react';
import { css, cx } from 'styled-system/css';
import { motion } from 'framer-motion';

const workExperiences = [
  {
    period: '2006 – Presente',
    title: 'JRSN DEV',
    role: 'Fundador & Software Engineer',
    activities: [
      'Entregou aplicações web/mobile para múltiplos setores ao longo de 8+ anos.',
      'Arquitetou APIs REST escaláveis com integrações e webhooks.',
      'Desenvolveu frontends modernos (React, Next) e backends robustos (Node.js, Go).',
      'Modelou infraestrutura completa com Docker, Linux, Nginx e CI/CD.'
    ]
  },
  {
    period: '01/2012 – Atual',
    title: 'Freelancer & Empresas',
    role: 'Desenvolvedor FullStack',
    description: 'Especialização em desenvolvimento completo de soluções digitais.',
    activities: [
      'Desenvolvimento de websites, sistemas e aplicativos mobile.',
      'Automação de processos e integração de APIs.',
      'Gerenciamento de projetos e liderança de equipes.',
      'Criação de identidade visual e materiais gráficos.'
    ]
  },
  {
    period: '11/2015 – 01/2019',
    title: 'Zip Informática',
    role: 'Técnico em Manutenção',
    description: 'Especialista em hardware e suporte técnico.',
    activities: [
      'Manutenção e reparo de computadores, notebooks e celulares.',
      'Diagnóstico e solução de problemas técnicos.',
      'Atendimento ao cliente e suporte técnico.'
    ]
  },
  {
    period: '09/2019 – 05/2020',
    title: 'I9 Ingressos',
    role: 'Designer Gráfico',
    description: 'Foco na criação visual e desenvolvimento de materiais promocionais.',
    activities: [
      'Criação de artes para impressão e itens personalizados.',
      'Desenvolvimento de identidade visual para marcas.',
      'Produção de materiais gráficas diversas.'
    ]
  },
  {
    period: '10/2020 – 02/2021',
    title: 'Delivery Much',
    role: 'Social Media',
    description: 'Responsável pela gestão completa das redes sociais.',
    activities: [
      'Criação de materiais gráficos para campanhas promocionais.',
      'Gerenciamento de redes sociais e engajamento do público.',
      'Desenvolvimento de estratégias de marketing digital.'
    ]
  },
  {
    period: '2024 – Presente',
    title: 'N9 Agência Digital',
    role: 'Fundador & Senior Full Stack Engineer',
    activities: [
      'Projetou e entregou sistemas de alta performance do backend ao deploy.',
      'Automatizou workflows complexos com n8n e APIs REST/Webhooks.',
      'Desenvolveu agente de IA para atendimento 24/7 via WhatsApp sem intervenção humana.',
      'Reduziu latência de APIs em 94% (800ms para 50ms) com cache Redis.'
    ]
  },
  {
    period: '01/06/2025 – 01/03/2026',
    title: 'Seven Brindes',
    role: 'Designer Gráfico & Programador CNC Laser',
    description: 'Operação de sistemas CNC e corte a laser, design de produtos e brindes corporativos.',
    activities: [
      'Desenvolvimento de layouts vetoriais precisos para displays e brindes corporativos.',
      'Operação, configuração e manutenção de maquinário de corte a laser.',
      'Criação de identidades visuais e artes gráficas para materiais promocionais.',
      'Controle de qualidade e acabamento técnico de peças em acrílico, MDF e metais.'
    ]
  }
];

const academicEducation = [
  {
    period: '01/2024 – 01/2025',
    title: 'CENES',
    role: 'Formação Acadêmica (Especialização Engenharia de Software)',
    description: 'Especialização em Engenharia de Software.',
    activities: [
      'Aprofundamento em metodologias de desenvolvimento de software.',
      'Gestão de projetos de software e liderança técnica.',
      'Arquitetura de sistemas distribuídos e boas práticas de engenharia.'
    ]
  },
  {
    period: '08/2024 – 12/2024',
    title: 'Centro Universitário ETEP',
    role: 'Graduação - Gestão da Tecnologia da Informação',
    description: 'Título de Tecnólogo. Colação de Grau em 06/09/2024. Diploma registrado (Cód Validação: 5669.5669.c9d5294d8cfb2bfcb89b925f4a22131f44).',
    activities: [
      'Gestão estratégica de TI, análise de riscos e segurança da informação.',
      'Otimização de processos operacionais com tecnologias de ponta.',
      'Governança e auditoria de sistemas de software e infraestrutura.'
    ]
  }
];


import { supabaseService } from '@/domain/services/supabaseService';

export default function AboutSection() {
  const [githubStats, setGithubStats] = useState({ repos: '...', commits: '...', loading: true });
  const [aboutData, setAboutData] = useState<any>(null);
  const [dynCerts, setDynCerts] = useState<any[]>([]);
  const [dynExps, setDynExps] = useState<any[]>([]);

  useEffect(() => {
    const fetchGitHub = async () => {
      try {
        const data = await fetch('/api/github').then(r => r.json());
        
        setGithubStats({
          repos: String(data.repos || 0),
          commits: String(data.commits || '1.2k+'),
          loading: false
        });
      } catch (e) {
        setGithubStats({ repos: '28+', commits: '1300+', loading: false });
      }
    };

    const fetchAppwrite = async () => {
       try {
         const abt = await supabaseService.getAbout();
         if (abt) setAboutData(abt);
         const certs = await supabaseService.getCertifications();
         setDynCerts(certs);
         const exps = await supabaseService.getExperiences();
         setDynExps(exps);
       } catch {}
    };

    fetchGitHub();
    fetchAppwrite();
  }, []);

  const groupedCerts = dynCerts.reduce((acc: any, cert: any) => {
    const cat = cert.category || 'Geral';
    if (!acc[cat]) acc[cat] = { category: cat, items: [] };
    acc[cat].items.push(cert.title);
    return acc;
  }, {});
  const finalCerts = Object.values(groupedCerts);

  return (
    <section id="about" className={css({ pt: { base: 20, md: 40 }, pb: 24, px: 8, maxW: { base: '90vw', md: '70vw' }, mx: 'auto', position: 'relative' })}>
      {/* Technical About Header */}
      <motion.header
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className={css({ mt: { base: '40px', md: '100px' }, mb: { base: 20, lg: 48 }, position: 'relative' })}
      >
        <div className={css({ display: 'flex', alignItems: 'center', gap: 4, mb: 6 })}>
          <div className={css({ h: '1px', w: 12, bg: 'primary' })}></div>
          <span className={cx(css({ fontFamily: 'label', fontSize: 'xs', textTransform: 'uppercase', letterSpacing: '0.4em', color: 'primary' }), 'neon-glow')}>Sistema.Manifesto</span>
        </div>
        <h1 className={css({ fontFamily: 'headline', fontSize: { base: '3xl', md: '5xl', lg: '6xl' }, lineHeight: 'tight', fontWeight: 'bold', color: 'white', maxW: '7xl' })}>
          {aboutData?.title || 'Arquitetando Sistemas'} <span className={css({ color: 'primary', fontStyle: 'italic' })}>{aboutData ? '' : 'Escaláveis'}</span>{' '}
          <span className={css({ display: 'block', mt: 3, color: 'white', fontSize: { base: 'xl', md: '3xl', lg: '4xl' } })}>{aboutData?.subtitle || 'e Inteligência com IA.'}</span>
        </h1>
        <div className={css({ mt: 8, display: 'flex', gap: 2, overflow: 'hidden' })}>
          <div className={css({ h: 1, w: 32, bg: 'rgba(0,230,118,0.2)' })}>
            <div className={css({ h: 'full', bg: 'primary', w: '1/3', animation: 'slideRight 2s infinite' })}></div>
          </div>
        </div>
      </motion.header>

      {/* Dynamic Profile Section (Flipped) */}
      <div className={css({ display: 'grid', gridTemplateColumns: { base: '1fr', lg: 'repeat(12, 1fr)' }, gap: { base: 16, lg: 24 }, alignItems: 'start', mb: 32 })}>

        {/* Narrative Column (Left) */}
        <motion.div
          initial={{ opacity: 0, y: 30, x: -30 }}
          whileInView={{ opacity: 1, y: 0, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={css({ gridColumn: { lg: 'span 7' }, display: 'flex', flexDir: 'column', gap: 8, order: { base: 2, lg: 1 } })}
        >
          <div className={css({ display: 'flex', flexDir: 'column', gap: 5 })}>
            <h2 className={css({ fontFamily: 'label', fontSize: 'xs', textTransform: 'uppercase', letterSpacing: 'widest', color: 'rgba(200,255,0,0.8)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 3 })}>
              <span className={css({ w: 2, h: 2, rounded: 'full', bg: 'primary', animation: 'pulse 2s infinite' })}></span>
              A Narrativa do Terminal // Engenheiro Full Stack Sênior
            </h2>
            <div className={css({ display: 'flex', flexDir: 'column', gap: 4 })}>
              {aboutData?.bio ? (
                aboutData.bio.split('\n').map((paragraph: string, i: number) => (
                  <p key={i} className={css({ fontFamily: 'body', fontSize:paragraph.length>120?'md':'lg', lineHeight: 'relaxed', color: paragraph.length>120?'gray.400':'white' })}>
                    {paragraph}
                  </p>
                ))
              ) : (
                <>
                  <p className={css({ fontFamily: 'body', fontSize: { base: 'lg', md: 'xl' }, lineHeight: 'relaxed', color: 'white', fontWeight: 'medium' })}>
                    Mais de 8 anos de experiência no desenvolvimento de aplicações web, mobile e sistemas de automação escaláveis. Especializado em arquitetura de APIs de alta performance e plataformas SaaS multi-tenant.
                  </p>
                  <p className={css({ fontFamily: 'body', fontSize: 'md', lineHeight: 'relaxed', color: 'gray.400' })}>
                    Foco em eliminar processos manuais e automatização inteligente com IA (LLMs, OpenAI, n8n), reduzindo custos operacionais e entregando sistemas robustos para empresas de múltiplos setores.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Core Specs metrics */}
          <div className={css({ display: 'grid', gridTemplateColumns: { base: '1fr', md: 'repeat(3, 1fr)' }, gap: 8, pt: 8, textAlign: { base: 'center', md: 'left' }, borderTop: '1px solid rgba(255,255,255,0.06)' })}>
            <div>
              <h4 className={css({ fontFamily: 'label', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.3em', color: 'gray.500', mb: 1 })}>Repositórios</h4>
              <p className={css({ fontFamily: 'headline', fontSize: '3xl', color: 'white', fontWeight: 'bold' })}>{githubStats.repos}</p>
            </div>
            <div>
              <h4 className={css({ fontFamily: 'label', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.3em', color: 'gray.500', mb: 1 })}>Total de Commits</h4>
              <p className={css({ fontFamily: 'headline', fontSize: '3xl', color: 'white', fontWeight: 'bold' })}>{githubStats.commits}</p>
            </div>
            <div>
              <h4 className={css({ fontFamily: 'label', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.3em', color: 'gray.500', mb: 1 })}>GitHub</h4>
              <p className={css({ fontFamily: 'headline', fontSize: '2xl', color: 'white', fontWeight: 'bold', mt: 1 })}>
                <a href="https://github.com/jottasilva" target="_blank" className={css({ color: 'white', textDecoration: 'none', _hover: { color: 'primary' } })}>
                  @jottasilva
                </a>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Dynamic Photo Container (Right) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, x: 30 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={cx(css({ gridColumn: { lg: 'span 5' }, order: { base: 1, lg: 2 }, position: 'relative', mt: { lg: '-280px' } }), "group")}
        >
          <div className={cx(css({ position: 'relative', aspectRatio: '4/5', overflow: 'hidden', rounded: 'xl', border: '1px solid rgba(255,255,255,0.05)', bg: 'rgba(255,255,255,0.02)' }), 'glass-panel')}>
            <img
              src={aboutData?.imageUrl || '/img-profile.png'}
              alt="Jefferson Silva"
              className={css({ w: 'full', h: 'full', objectFit: 'cover', filter: 'grayscale(100%) brightness(0.8)', transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)', _groupHover: { transform: 'scale(1.05)', filter: 'grayscale(0) brightness(1)' } })}
            />
            <div className={css({ position: 'absolute', inset: 0, bgGradient: 'to-t', gradientFrom: 'black', gradientVia: 'transparent', gradientTo: 'transparent', opacity: 0.8 })}></div>
          </div>
          {/* Data Tag */}
          <div className={cx(css({ position: { base: 'relative', md: 'absolute' }, bottom: { base: 0, md: -6 }, right: { base: 0, md: -6 }, p: { base: 5, md: 8 }, mt: { base: 4, md: 0 }, bg: 'rgba(10,10,10,0.92)', backdropFilter: 'blur(16px)', rounded: 'xl', borderLeft: '6px solid token(colors.primary)', shadow: '2xl', transition: 'transform 0.3s', _groupHover: { transform: 'translateY(-10px)' } }), 'glass-panel')}>
            <p className={css({ fontFamily: 'headline', fontWeight: 'bold', fontSize: 'xl', color: 'white', mb: 2, textTransform: 'uppercase', letterSpacing: '0.05em' })}>{aboutData?.name || 'Jefferson S. Paulino'}</p>
            <p className={css({ fontFamily: 'body', fontSize: 'xs', color: 'primary', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 'widest' })}>{aboutData?.role || 'Sênior Full Stack & IA'}</p>
          </div>
        </motion.div>
      </div>

      {/* Split Component Timeline Sections */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className={css({ borderTop: '1px solid rgba(255,255,255,0.03)', pt: 20 })}
      >
        {/* [01] Work Experience */}
        <h3 id="trajetoria" className={css({ fontFamily: 'headline', fontSize: '2xl', fontWeight: 'bold', color: 'white', mb: 12, display: 'flex', alignItems: 'center', gap: 3, scrollMarginTop: '120px' })}>
          <span className={css({ h: '1px', w: 10, bg: 'primary' })}></span>
          [01] Trajetória_Profissional
        </h3>

        <div className={css({ display: 'flex', flexDir: 'column', gap: 10, pt: 4, mb: 16 })}>
          {(dynExps.filter(e => e.type === 'Trabalho').length > 0 ? dynExps.filter(e => e.type === 'Trabalho') : workExperiences).map((job, index) => (
            <div key={job.$id || index} className={css({ display: 'grid', gridTemplateColumns: { base: '1fr', lg: '360px 1fr' }, gap: { base: 2, lg: 12 }, pb: 10, borderBottom: '1px solid rgba(255,255,255,0.03)' })}>
              <div>
                <span className={css({ fontFamily: 'label', fontSize: 'xs', color: 'primary', letterSpacing: 'wider' })}>{job.period}</span>
                <h4 className={css({ fontFamily: 'headline', fontSize: '2xl', color: 'white', fontWeight: 'bold', mt: 1 })}>{job.title}</h4>
                <p className={css({ fontFamily: 'body', fontSize: 'md', color: 'gray.400', mt: 1, fontWeight: 'medium' })}>{job.institution || (job as any).role}</p>
                {job.description && <p className={css({ fontFamily: 'body', fontSize: 'sm', color: 'gray.500', mt: 2, fontStyle: 'italic', maxWidth: 'xl' })}>{job.description}</p>}
              </div>
              <ul className={css({ display: 'flex', flexDir: 'column', gap: 2, color: 'gray.300', fontFamily: 'body', fontSize: 'sm', listStyle: 'none' })}>
                {(job.activities && typeof job.activities === 'string' ? job.activities.split('\n') : (job as any).activities || []).map((act: string, idx: number) => (
                  <li key={idx} className={css({ display: 'flex', gap: 2, lineHeight: 'relaxed' })}><span className={css({ color: 'primary' })}>▸</span> {act}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* [02] Academic Education */}
        <h3 id="formacao" className={css({ fontFamily: 'headline', fontSize: '2xl', fontWeight: 'bold', color: 'white', mb: 12, display: 'flex', alignItems: 'center', gap: 3, pt: 12, borderTop: '1px solid rgba(255,255,255,0.03)', scrollMarginTop: '120px' })}>
          <span className={css({ h: '1px', w: 10, bg: 'primary' })}></span>
          [02] Formação_Acadêmica_&_Certificações
        </h3>

        <div className={css({ display: 'flex', flexDir: 'column', gap: 10, pt: 4, mb: 16 })}>
          {(dynExps.filter(e => e.type === 'Acadêmico').length > 0 ? dynExps.filter(e => e.type === 'Acadêmico') : academicEducation).map((edu, index) => (
            <div key={edu.$id || index} className={css({ display: 'grid', gridTemplateColumns: { base: '1fr', lg: '360px 1fr' }, gap: { base: 2, lg: 12 }, pb: 10, borderBottom: '1px solid rgba(255,255,255,0.03)' })}>
              <div>
                <span className={css({ fontFamily: 'label', fontSize: 'xs', color: 'primary', letterSpacing: 'wider' })}>{edu.period}</span>
                <h4 className={css({ fontFamily: 'headline', fontSize: '2xl', color: 'white', fontWeight: 'bold', mt: 1 })}>{edu.title}</h4>
                <p className={css({ fontFamily: 'body', fontSize: 'md', color: 'gray.400', mt: 1, fontWeight: 'medium' })}>{edu.institution || (edu as any).role}</p>
                {edu.description && <p className={css({ fontFamily: 'body', fontSize: 'sm', color: 'gray.500', mt: 2, fontStyle: 'italic', maxWidth: 'xl' })}>{edu.description}</p>}
              </div>
              <ul className={css({ display: 'flex', flexDir: 'column', gap: 2, color: 'gray.300', fontFamily: 'body', fontSize: 'sm', listStyle: 'none' })}>
                {(edu.activities && typeof edu.activities === 'string' ? edu.activities.split('\n') : (edu as any).activities || []).map((act: string, idx: number) => (
                  <li key={idx} className={css({ display: 'flex', gap: 2, lineHeight: 'relaxed' })}><span className={css({ color: 'primary' })}>▸</span> {act}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Certifications Dynamic Grid */}
        <div className={css({ display: 'grid', gridTemplateColumns: { base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 6, pt: 4 })}>
          {finalCerts.map((cert: any, index: number) => (
            <div key={index} className={css({ p: 5, bg: 'rgba(255,255,255,0.02)', rounded: 'xl', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', flexDir: 'column', gap: 3, transition: 'all 0.3s', _hover: { bg: 'rgba(255,255,255,0.04)', transform: 'translateY(-2px)' } })}>
              <h4 className={css({ fontFamily: 'headline', fontSize: 'sm', color: 'primary', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 'wider' })}>{cert.category}</h4>
              <ul className={css({ display: 'flex', flexDir: 'column', gap: 1.5, listStyle: 'none' })}>
                {cert.items.map((item: string, idx: number) => (
                  <li key={idx} className={css({ fontFamily: 'body', fontSize: 'sm', color: 'gray.300', display: 'flex', alignItems: 'start', gap: 2, letterSpacing: 'wider' })}>
                    <span className={css({ color: 'primary', mt: 0.5 })}>▸</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
