'use client';

import { useState, useEffect, useRef } from 'react';
import { css, cx } from 'styled-system/css';
import { motion } from 'framer-motion';
import Image from 'next/image';

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

  const workScrollRef = useRef<HTMLDivElement>(null);
  const eduScrollRef = useRef<HTMLDivElement>(null);

  const scroll = (ref: React.RefObject<HTMLDivElement | null>, dir: 'left' | 'right') => {
    if (ref.current) {
      const offset = 310; // Card width + gap
      ref.current.scrollBy({ left: dir === 'left' ? -offset : offset, behavior: 'smooth' });
    }
  };

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

  const combinedWork = [
    ...dynExps.filter((e: any) => e.type === 'Trabalho'),
    ...workExperiences.filter(f => !dynExps.some((d: any) => d.title === f.title && d.type === 'Trabalho'))
  ];

  const combinedEdu = [
    ...dynExps.filter((e: any) => e.type === 'Acadêmico'),
    ...academicEducation.filter(f => !dynExps.some((d: any) => d.title === f.title && d.type === 'Acadêmico'))
  ];

  return (
    <section id="about" className={css({ pt: { base: 20, md: 40 }, pb: 24, px: 8, maxW: { base: '90vw', md: '70vw' }, mx: 'auto', position: 'relative' })}>




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

        <div className={css({ display: 'flex', gap: 2, mb: 1, justifyContent: 'flex-end', pr: 2 })}>
          <button onClick={() => scroll(workScrollRef, 'left')} className={css({ w: '28px', h: '28px', rounded: 'full', border: '1px solid rgba(255,255,255,0.06)', bg: 'rgba(255,255,255,0.02)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', _hover: { borderColor: 'rgba(0,230,118,0.4)', bg: 'rgba(0,230,118,0.06)', color: 'primary' }, transition: 'all 0.2s' })}>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className={css({ w: '14px', h: '14px' })}><path d="M10 12l-4-4 4-4"/></svg>
          </button>
          <button onClick={() => scroll(workScrollRef, 'right')} className={css({ w: '28px', h: '28px', rounded: 'full', border: '1px solid rgba(255,255,255,0.06)', bg: 'rgba(255,255,255,0.02)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', _hover: { borderColor: 'rgba(0,230,118,0.4)', bg: 'rgba(0,230,118,0.06)', color: 'primary' }, transition: 'all 0.2s' })}>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className={css({ w: '14px', h: '14px' })}><path d="M6 4l4 4-4 4"/></svg>
          </button>
        </div>

        <div ref={workScrollRef} className={css({ display: 'flex', flexDir: 'row', gap: 4, overflowX: 'auto', pt: 2, pb: 6, mb: 16, '&::-webkit-scrollbar': { display: 'none' }, scrollbarWidth: 'none' })}>
          {combinedWork.map((job, index) => (
            <div key={job.$id || index} className={css({ flexShrink: 0, w: { base: '260px', md: '290px' }, display: 'flex', flexDir: 'column', gap: 3, p: 4, bg: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', rounded: '2px', transition: 'all 0.3s', _hover: { bg: 'rgba(255,255,255,0.04)', transform: 'translateY(-2px)' } })}>
              <div>
                <span className={css({ fontFamily: 'label', fontSize: 'xs', color: 'primary', letterSpacing: 'wider' })}>{job.period}</span>
                <h4 className={css({ fontFamily: 'headline', fontSize: '2xl', color: 'white', fontWeight: 'bold', mt: 1 })}>{job.title}</h4>
                <p className={css({ fontFamily: 'body', fontSize: 'sm', color: 'gray.400', mt: 1, fontWeight: 'medium', textTransform: 'uppercase', letterSpacing: 'wider' })}>{job.institution || (job as any).role}</p>
                {job.description && <p className={css({ fontFamily: 'body', fontSize: 'xs', color: 'gray.500', mt: 1, fontStyle: 'italic', maxWidth: 'xl' })}>{job.description}</p>}
              </div>
              <div className={css({ h: '1px', bg: 'rgba(255,255,255,0.04)', my: 2 })} />
              <ul className={css({ display: 'flex', flexDir: 'column', gap: 2, color: 'gray.400', fontFamily: 'body', fontSize: 'xs', listStyle: 'none' })}>
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

        <div className={css({ display: 'grid', gridTemplateColumns: { base: '1fr', md: '1fr 1fr' }, gap: 6, pt: 4, mb: 16 })}>
          {combinedEdu.map((edu, index) => (
            <div key={edu.$id || index} className={css({ display: 'flex', flexDir: 'column', gap: 4, p: 6, bg: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', rounded: '2px', transition: 'all 0.3s', _hover: { bg: 'rgba(255,255,255,0.04)', borderColor: 'rgba(0,230,118,0.3)', transform: 'translateY(-3px)' } })}>
              <div>
                <span className={css({ fontFamily: 'label', fontSize: 'xs', color: 'primary', letterSpacing: 'wider' })}>{edu.period}</span>
                <h4 className={css({ fontFamily: 'headline', fontSize: '2xl', color: 'white', fontWeight: 'bold', mt: 1 })}>{edu.title}</h4>
                <p className={css({ fontFamily: 'body', fontSize: 'sm', color: 'gray.400', mt: 1, fontWeight: 'medium', textTransform: 'uppercase', letterSpacing: 'wider' })}>{edu.institution || (edu as any).role}</p>
                {edu.description && <p className={css({ fontFamily: 'body', fontSize: 'xs', color: 'gray.500', mt: 1, fontStyle: 'italic', maxWidth: 'xl' })}>{edu.description}</p>}
              </div>
              <div className={css({ h: '1px', bg: 'rgba(255,255,255,0.04)', my: 2 })} />
              <ul className={css({ display: 'flex', flexDir: 'column', gap: 2, color: 'gray.400', fontFamily: 'body', fontSize: 'xs', listStyle: 'none' })}>
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
            <div key={index} className={css({ p: 5, bg: 'rgba(255,255,255,0.02)', rounded: '2px', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', flexDir: 'column', gap: 3, transition: 'all 0.3s', _hover: { bg: 'rgba(255,255,255,0.04)', transform: 'translateY(-2px)' } })}>
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
