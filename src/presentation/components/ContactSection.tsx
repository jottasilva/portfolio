'use client';

import { css, cx } from 'styled-system/css';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { appwriteService } from '@/domain/services/appwriteService';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', projectType: 'Geral' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await appwriteService.sendContactMessage(formData);
      alert('Sinal enviado com sucesso!');
      setFormData({ name: '', email: '', message: '', projectType: 'Geral' });
    } catch (error) {
      alert('Erro ao enviar sinal de transmissão.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className={css({ minH: '100vh', pt: 8, pb: 24, px: 8, maxW: { base: '90vw', md: '70vw' }, mx: 'auto' })}>
      <motion.header 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className={css({ w: 'full', mb: 24 })}
      >
        <div className={css({ display: 'flex', alignItems: 'center', gap: 4, mb: 6 })}>
          <div className={css({ h: '1px', w: 12, bg: 'rgba(139, 92, 246, 0.5)' })}></div>
          <span className={css({ fontFamily: 'label', color: 'secondary', textTransform: 'uppercase', letterSpacing: '0.4em', fontSize: '10px', fontWeight: 'bold' })}>
            Protocolo: Comunicação
          </span>
        </div>
        <h1 className={css({ fontFamily: 'headline', fontSize: { base: '4xl', md: '5xl', lg: '6xl' }, letterSpacing: 'tight', color: 'white', fontWeight: 'bold' })}>
          Inicializar <br/>
          <span className={cx(css({ color: 'transparent', bgClip: 'text', bgGradient: 'to-r', gradientFrom: 'primary', gradientTo: 'secondary' }), 'neon-glow')}>
            Conectividade.
          </span>
        </h1>
      </motion.header>

      <div className={css({ w: 'full', display: 'grid', gridTemplateColumns: { base: '1fr', lg: 'repeat(12, 1fr)' }, gap: 16, alignItems: 'start' })}>
        {/* Contact Form Section */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={css({ gridColumn: { lg: 'span 7' }, w: 'full' })}
        >
          <form onSubmit={handleSubmit} className={cx(css({ display: 'flex', flexDir: 'column', gap: 10, p: { base: 8, lg: 12 }, rounded: 'xl', position: 'relative', overflow: 'hidden', bg: 'rgba(15,15,15,0.4)', border: '1px solid rgba(255,255,255,0.02)' }), 'glass-panel')}>
            <div className={css({ position: 'absolute', top: 0, left: 0, w: 'full', h: '2px', bgGradient: 'to-r', gradientFrom: 'transparent', gradientVia: 'primary', gradientTo: 'transparent' })}></div>
            
            <div className={css({ display: 'grid', gridTemplateColumns: { base: '1fr', md: 'repeat(2, 1fr)' }, gap: 8 })}>
              <div className="relative group">
                <label className={css({ display: 'block', fontFamily: 'label', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(200,255,0,0.7)', mb: 3 })}>Identificador do Usuário</label>
                <input type="text" required value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} placeholder="Nome..." className={css({ w: 'full', bg: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.06)', rounded: 'lg', py: 3, px: 4, color: 'white' })} />
              </div>
              <div className="relative group">
                <label className={css({ display: 'block', fontFamily: 'label', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(200,255,0,0.7)', mb: 3 })}>Canal de Retorno</label>
                <input type="email" required value={formData.email} onChange={e=>setFormData({...formData, email: e.target.value})} placeholder="usuario@servidor.com" className={css({ w: 'full', bg: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.06)', rounded: 'lg', py: 3, px: 4, color: 'white' })} />
              </div>
            </div>

            <div className="relative group">
              <label className={css({ display: 'block', fontFamily: 'label', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(200,255,0,0.7)', mb: 3 })}>Dados de Transmissão</label>
              <textarea rows={5} required value={formData.message} onChange={e=>setFormData({...formData, message: e.target.value})} placeholder="Descreva os detalhes..." className={css({ w: 'full', bg: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.06)', rounded: 'lg', py: 3, px: 4, color: 'white' })}></textarea>
            </div>

            <div className={css({ pt: 4 })}>
              <button disabled={loading} type="submit" className={css({ w: { base: 'full', md: 'auto' }, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 3, bg: 'primary', color: 'black', fontFamily: 'label', fontSize: 'xs', fontWeight: 'bold', textTransform: 'uppercase', px: 10, py: 4, rounded: 'lg', cursor: loading?'not-allowed':'pointer' })}>
                {loading ? 'Transmitindo...' : 'Executar Transmissão'}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Direct Contact & Socials */}
        <motion.aside 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={css({ gridColumn: { lg: 'span 5' }, display: 'flex', flexDir: 'column', gap: 12, pl: { lg: 12 } })}
        >
          <div className={css({ display: 'flex', flexDir: 'column', gap: 4 })}>
            <div className={css({ display: 'flex', alignItems: 'center', gap: 3 })}>
              <span className={css({ w: 2, h: 2, rounded: 'full', bg: 'primary', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' })}></span>
              <h3 className={css({ fontFamily: 'headline', fontSize: 'xl', fontWeight: 'bold', color: 'white', letterSpacing: 'tight', textTransform: 'uppercase' })}>Pontos de Acesso</h3>
            </div>
            <p className={css({ fontFamily: 'body', color: 'gray.400', lineHeight: 'relaxed', fontSize: 'sm' })}>
              Acesso direto ao nó disponível para colaborações prioritárias. Criptografia ponta-a-ponta nativa para transmissões seguras.
            </p>
          </div>

          <div className={css({ display: 'flex', flexDir: 'column', gap: 4 })}>
            <div className={css({ display: 'flex', alignItems: 'center', gap: 6, p: 6, rounded: 'xl', border: '1px solid rgba(255,255,255,0.03)', bg: 'rgba(20,20,20,0.3)', transition: 'all 0.3s', _hover: { bg: 'rgba(200,255,0,0.03)', borderColor: 'rgba(200,255,0,0.1)' } })}>
              <div className={css({ w: 12, h: 12, rounded: 'lg', display: 'flex', alignItems: 'center', justifyContent: 'center', bg: 'rgba(0,0,0,0.5)', color: 'primary', border: '1px solid rgba(200,255,0,0.1)' })}>
                <span className="material-symbols-outlined text-xl">account_tree</span>
              </div>
              <div>
                <span className={css({ display: 'block', fontFamily: 'label', fontSize: '8px', textTransform: 'uppercase', letterSpacing: '0.3em', color: 'primary', mb: 1 })}>LinkedIn</span>
                <a href="https://www.linkedin.com/in/jrsndev" target="_blank" rel="noopener noreferrer" className={css({ fontFamily: 'headline', fontSize: 'md', color: 'white', fontWeight: 'medium', transition: 'colors', _hover: { color: 'primary' } })}>jefferson-silva</a>
              </div>
            </div>

            <div className={css({ display: 'flex', alignItems: 'center', gap: 6, p: 6, rounded: 'xl', border: '1px solid rgba(255,255,255,0.03)', bg: 'rgba(20,20,20,0.3)', transition: 'all 0.3s', _hover: { bg: 'rgba(200,255,0,0.03)', borderColor: 'rgba(200,255,0,0.1)' } })}>
              <div className={css({ w: 12, h: 12, rounded: 'lg', display: 'flex', alignItems: 'center', justifyContent: 'center', bg: 'rgba(0,0,0,0.5)', color: 'primary', border: '1px solid rgba(200,255,0,0.1)' })}>
                <span className="material-symbols-outlined text-xl">verified_user</span>
              </div>
              <div>
                <span className={css({ display: 'block', fontFamily: 'label', fontSize: '8px', textTransform: 'uppercase', letterSpacing: '0.3em', color: 'primary', mb: 1 })}>Certificados</span>
                <a href="https://jrsncertificates.vercel.app/" target="_blank" rel="noopener noreferrer" className={css({ fontFamily: 'headline', fontSize: 'md', color: 'white', fontWeight: 'medium', transition: 'colors', _hover: { color: 'primary' } })}>jrsncertificates</a>
              </div>
            </div>

            <div className={css({ display: 'flex', alignItems: 'center', gap: 6, p: 6, rounded: 'xl', border: '1px solid rgba(255,255,255,0.03)', bg: 'rgba(20,20,20,0.3)', transition: 'all 0.3s', _hover: { bg: 'rgba(200,255,0,0.03)', borderColor: 'rgba(200,255,0,0.1)' } })}>
              <div className={css({ w: 12, h: 12, rounded: 'lg', display: 'flex', alignItems: 'center', justifyContent: 'center', bg: 'rgba(0,0,0,0.5)', color: 'primary', border: '1px solid rgba(200,255,0,0.1)' })}>
                <span className="material-symbols-outlined text-xl">chat</span>
              </div>
              <div>
                <span className={css({ display: 'block', fontFamily: 'label', fontSize: '8px', textTransform: 'uppercase', letterSpacing: '0.3em', color: 'primary', mb: 1 })}>WhatsApp</span>
                <a href="https://wa.me/5543991359790" target="_blank" rel="noopener noreferrer" className={css({ fontFamily: 'headline', fontSize: 'md', color: 'white', fontWeight: 'bold', transition: 'colors', _hover: { color: 'primary' } })}>MANDAR PROMPT</a>
              </div>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
