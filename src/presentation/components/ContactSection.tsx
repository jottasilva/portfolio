'use client';

import { css, cx } from 'styled-system/css';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { supabaseService } from '@/domain/services/supabaseService';

function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, 2000);
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', projectType: 'Geral' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: { name?: string; email?: string; message?: string } = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Mensagem é obrigatória';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    setLoading(true);
    try {
      await supabaseService.sendContactMessage({
        name: sanitizeInput(formData.name),
        email: formData.email.toLowerCase().trim(),
        message: sanitizeInput(formData.message),
        projectType: formData.projectType
      });
      alert('Sinal enviado com sucesso!');
      setFormData({ name: '', email: '', message: '', projectType: 'Geral' });
    } catch (error) {
      alert('Erro ao enviar sinal de transmissão.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className={css({ minH: '100vh', pt: 8, pb: 24, px: 8, maxW: { base: '90vw', md: '70vw' }, mx: 'auto' })}>
      <motion.header 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className={css({ w: 'full', mb: 24 })}
      >
        <div className={css({ display: 'flex', alignItems: 'center', gap: 4, mb: 6 })}>
          <div className={css({ h: '1px', w: 12, bg: 'rgba(255,255,255,0.2)' })}></div>
          <span className={css({ fontFamily: 'label', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.4em', fontSize: '13px' })}>
            Protocolo: Comunicação
          </span>
        </div>
        <h1 id="contact-heading" className={css({ fontFamily: 'headline', fontSize: { base: '4xl', md: '5xl', lg: '6xl' }, letterSpacing: 'tight', color: 'white', fontWeight: '800', lineHeight: 1 })}>
          Inicializar <br/>
          <span className={css({ fontWeight: '300', color: 'rgba(255,255,255,0.6)' })}>
            Conectividade.
          </span>
        </h1>
      </motion.header>

      <div className={css({ w: 'full', display: 'grid', gridTemplateColumns: { base: '1fr', lg: 'repeat(12, 1fr)' }, gap: { base: 12, lg: 0 }, alignItems: 'start' })}>
        
        {/* Column 1: Pontos de Acesso */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={css({ gridColumn: { lg: 'span 4' }, display: 'flex', flexDir: 'column', gap: 6, pr: { lg: 8 } })}
        >
          <div>
            <span className={css({ fontFamily: 'label', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#a855f7', mb: 8, display: 'block' })}>Pontos de Acesso</span>
            <h3 className={css({ fontFamily: 'headline', fontSize: '20px', fontWeight: 'bold', color: 'white', mb: 4, lineHeight: '1.3' })}>Acesso direto ao nó disponível para colaborações prioritárias.</h3>
            <p className={css({ fontFamily: 'body', fontSize: '13px', color: 'gray.500', lineHeight: '1.6' })}>Criptografia ponta-a-ponta nativa para transmissões seguras. Tempo de resposta médio inferior a 24h.</p>
          </div>
          <p className={css({ fontFamily: 'body', fontSize: '13px', color: 'gray.500', mt: 4 })}>Projetos de alta complexidade, parcerias estratégicas e consultorias sob demanda.</p>
          <div className={css({ mt: { lg: 'auto' }, display: 'flex', alignItems: 'center', gap: 2, pt: 8 })}>
            <div className={css({ w: 1.5, h: 1.5, rounded: 'full', bg: '#a855f7' })} />
            <span className={css({ fontFamily: 'label', fontSize: '10px', color: '#a855f7', letterSpacing: '0.1em' })}>Nó ativo – disponível</span>
          </div>
        </motion.div>

        {/* Column 2: Form */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={css({ gridColumn: { lg: 'span 5' }, borderLeft: { lg: '1px solid rgba(255,255,255,0.03)' }, borderRight: { lg: '1px solid rgba(255,255,255,0.03)' }, px: { lg: 8 }, w: 'full' })}
        >
          <form onSubmit={handleSubmit} aria-label="Formulário de contato" className={css({ display: 'flex', flexDir: 'column', gap: 6 })}>
            <div className="relative group">
              <label htmlFor="contact-name" className={css({ display: 'block', fontFamily: 'label', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'gray.400', mb: 2 })}>Identificador do Usuário</label>
              <input 
                id="contact-name"
                type="text" 
                required 
                value={formData.name} 
                onChange={e=>setFormData({...formData, name: e.target.value})} 
                placeholder="Nome..." 
                className={css({ w: 'full', bg: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', rounded: '2px', py: 3, px: 4, color: 'white', fontSize: '12px', _focus: { borderColor: '#a855f7', outline: 'none' } })} 
              />
            </div>

            <div className="relative group">
              <label htmlFor="contact-email" className={css({ display: 'block', fontFamily: 'label', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'gray.400', mb: 2 })}>Canal de Retorno</label>
              <input 
                id="contact-email"
                type="email" 
                required 
                value={formData.email} 
                onChange={e=>setFormData({...formData, email: e.target.value})} 
                placeholder="usuario@servidor.com" 
                className={css({ w: 'full', bg: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', rounded: '2px', py: 3, px: 4, color: 'white', fontSize: '12px', _focus: { borderColor: '#a855f7', outline: 'none' } })} 
              />
            </div>

            <div className="relative group">
              <label htmlFor="contact-message" className={css({ display: 'block', fontFamily: 'label', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'gray.400', mb: 2 })}>Dados de Transmissão</label>
              <textarea 
                id="contact-message"
                rows={5} 
                required 
                value={formData.message} 
                onChange={e=>setFormData({...formData, message: e.target.value})} 
                placeholder="Descreva os detalhes..." 
                className={css({ w: 'full', bg: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', rounded: '2px', py: 3, px: 4, color: 'white', fontSize: '12px', resize: 'none', _focus: { borderColor: '#a855f7', outline: 'none' } })}
              ></textarea>
            </div>

            <button disabled={loading} type="submit" className={css({ w: 'full', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 3, bg: '#a855f7', color: 'black', fontFamily: 'label', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', py: 4, rounded: '2px', cursor: loading?'not-allowed':'pointer', transition: 'all 0.3s', _hover: { filter: 'brightness(1.1)' } })}>
              {loading ? 'Transmitindo...' : 'Executar Transmissão'} <span className={css({ fontSize: '14px' })}>&rarr;</span>
            </button>
          </form>
        </motion.div>

        {/* Column 3: Redes */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={css({ gridColumn: { lg: 'span 3' }, display: 'flex', flexDir: 'column', gap: 6, pl: { lg: 8 } })}
        >
          <span className={css({ fontFamily: 'label', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#a855f7', mb: 2, display: 'block' })}>Redes</span>
          
          <div className={css({ display: 'flex', flexDir: 'column', gap: 4 })}>
            <div className={css({ display: 'flex', alignItems: 'center', gap: 4, p: 5, rounded: '2px', border: '1px solid rgba(255,255,255,0.02)', bg: 'rgba(255,255,255,0.01)', transition: 'all 0.3s', _hover: { bg: 'rgba(255,255,255,0.03)', borderColor: 'rgba(168, 85, 247, 0.2)' } })}>
              <div className={css({ w: 10, h: 10, rounded: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', bg: 'rgba(0,0,0,0.4)', color: '#a855f7', border: '1px solid rgba(255,255,255,0.03)' })}>
                <span className="material-symbols-outlined text-md">account_tree</span>
              </div>
              <div>
                <span className={css({ display: 'block', fontFamily: 'label', fontSize: '8px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'gray.500', mb: 1 })}>LinkedIn</span>
                <a href="https://www.linkedin.com/in/jrsndev" target="_blank" rel="noopener noreferrer" className={css({ fontFamily: 'headline', fontSize: '13px', color: 'white', fontWeight: 'bold', transition: 'colors', _hover: { color: '#a855f7' } })}>jefferson-silva</a>
              </div>
            </div>

            <div className={css({ display: 'flex', alignItems: 'center', gap: 4, p: 5, rounded: '2px', border: '1px solid rgba(255,255,255,0.02)', bg: 'rgba(255,255,255,0.01)', transition: 'all 0.3s', _hover: { bg: 'rgba(255,255,255,0.03)', borderColor: 'rgba(168, 85, 247, 0.2)' } })}>
              <div className={css({ w: 10, h: 10, rounded: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', bg: 'rgba(0,0,0,0.4)', color: '#a855f7', border: '1px solid rgba(255,255,255,0.03)' })}>
                <span className="material-symbols-outlined text-md">verified_user</span>
              </div>
              <div>
                <span className={css({ display: 'block', fontFamily: 'label', fontSize: '8px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'gray.500', mb: 1 })}>Certificados</span>
                <a href="https://jrsncertificates.vercel.app/" target="_blank" rel="noopener noreferrer" className={css({ fontFamily: 'headline', fontSize: '13px', color: 'white', fontWeight: 'bold', transition: 'colors', _hover: { color: '#a855f7' } })}>jrsncertificates</a>
              </div>
            </div>

            <div className={css({ display: 'flex', alignItems: 'center', gap: 4, p: 5, rounded: '2px', border: '1px solid rgba(255,255,255,0.02)', bg: 'rgba(255,255,255,0.01)', transition: 'all 0.3s', _hover: { bg: 'rgba(255,255,255,0.03)', borderColor: 'rgba(168, 85, 247, 0.2)' } })}>
              <div className={css({ w: 10, h: 10, rounded: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', bg: 'rgba(0,0,0,0.4)', color: '#a855f7', border: '1px solid rgba(255,255,255,0.03)' })}>
                <span className="material-symbols-outlined text-md">chat</span>
              </div>
              <div>
                <span className={css({ display: 'block', fontFamily: 'label', fontSize: '8px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'gray.500', mb: 1 })}>WhatsApp</span>
                <a href="https://wa.me/5543991359790" target="_blank" rel="noopener noreferrer" className={css({ fontFamily: 'headline', fontSize: '13px', color: 'white', fontWeight: 'bold', transition: 'colors', _hover: { color: '#a855f7' } })}>Mandar Prompt</a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
