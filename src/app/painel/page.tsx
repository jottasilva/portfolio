'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/presentation/contexts/AuthContext';
import { supabaseService } from '@/domain/services/supabaseService';
import { css, cx } from 'styled-system/css';
import { motion, AnimatePresence } from 'framer-motion';
import { Modal } from '@/presentation/components/Modal';
import { ConfirmModal } from '@/presentation/components/ConfirmModal';

export default function PainelDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'skills' | 'messages' | 'about' | 'certifications' | 'experiences' | 'chat'>('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  
  const [messages, setMessages] = useState<any[]>([]);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [certifications, setCertifications] = useState<any[]>([]);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [about, setAbout] = useState({ title: '', subtitle: '', bio: '', resumeUrl: '' });
  const [loading, setLoading] = useState(false);
  const [visitStats, setVisitStats] = useState<{ total: number; uniqueVisitors: number; topCities: { city: string; count: number }[] }>({ total: 0, uniqueVisitors: 0, topCities: [] });
  const [recentVisits, setRecentVisits] = useState<any[]>([]);
  const [filterText, setFilterText] = useState('');
  const [globalSearch, setGlobalSearch] = useState('');
  const [chatError, setChatError] = useState(false);

  // Form States
  const [editId, setEditId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState<{ type: 'project' | 'skill' | 'cert' | 'experience' | 'chat' | 'contact'; id: string } | null>(null);
  const [newProject, setNewProject] = useState({ title: '', description: '', link: '', github: '', category: 'Sistemas', node: '', image: '' });
  const [newSkill, setNewSkill] = useState({ name: '', category: 'Backend & APIs', value: '90%' });
  const [newCert, setNewCert] = useState({ title: '', issuer: '', date: '', link: '', category: 'Geral' });
  const [newExperience, setNewExperience] = useState({ type: 'Trabalho', title: '', institution: '', period: '', description: '', activities: '' });
  const [newContact, setNewContact] = useState({ name: '', email: '', message: '' });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    setEditId(null); 
    try {
      if (activeTab === 'overview' || activeTab === 'messages') {
        const msgs = await supabaseService.getContactMessages();
        setMessages(msgs);
      }
      if (activeTab === 'overview' || activeTab === 'chat') {
        const chats = await supabaseService.getChatMessages();
        if (chats && (chats as any).error === 'collection_missing') {
          setChatMessages([]);
          setChatError(true);
        } else {
          setChatMessages(chats);
          setChatError(false);
        }
      }
      if (activeTab === 'overview') {
        const [stats, visits] = await Promise.all([
          supabaseService.getVisitStats(),
          supabaseService.getVisits(20),
        ]);
        setVisitStats(stats as any);
        setRecentVisits(visits);
      }
      if (activeTab === 'projects') {
        const projs = await supabaseService.getProjects();
        setProjects(projs);
      }
      if (activeTab === 'skills') {
        const sks = await supabaseService.getSkills();
        setSkills(sks);
      }
      if (activeTab === 'certifications') {
        const certs = await supabaseService.getCertifications();
        setCertifications(certs);
      }
      if (activeTab === 'experiences') {
        const exps = await supabaseService.getExperiences();
        setExperiences(exps);
      }
      if (activeTab === 'about') {
        const abt = await supabaseService.getAbout();
        if (abt) setAbout({ ...about, ...abt });
      }
    } catch (error) {
       console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await supabaseService.updateAbout(about);
      toast.success('Dados de Sobre salvos com sucesso!');
    } catch { toast.error('Erro ao salvar Sobre'); }
  };

  const handleSaveCert = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await supabaseService.updateCertification(editId, newCert);
      } else {
        await supabaseService.createCertification(newCert);
      }
      setNewCert({ title: '', issuer: '', date: '', link: '', category: 'Geral' });
      setEditId(null);
      toast.success('Certificação salva com sucesso!');
      loadData();
    } catch { toast.error('Erro ao salvar certificado'); }
  };

  const handleSeedCerts = async () => {
    const mock = [
      { category: 'Desenvolvimento & Engenharia de Soft.', items: ['React Native (NLW Expert - Trilha)','Go (Golang) Udemy','PHP (Rocketseat)','Angular (Udemy)','TypeScript, Git & GitHub (Refatorando)','HTML5, CSS & JS','Node.js & React','Desenvolvimento Web Completo','Cronapp Responsivo','HTML & CSS Básico'] },
      { category: 'Dados & Inteligência Artificial', items: ['SQL (Motion Academy)','Ciência de Dados','Python Avançado','Trading com Dados Python','Python Enpowerdata','Python Masterclass'] },
      { category: 'Segurança da Informação', items: ['Hacker Ético (Udemy)','Pentest (Solyd / DESEC)','Ameaça Hacker Cybersec','LGPD (Sebrae)','Analista de Redes','Intelbras CFTV'] },
      { category: 'Design, Marketing & Outros', items: ['Design Gráfico','Identidade Visual','Flyer Creator','Marketing Digital','Inteligência Social','Gestão de Projetos','Trabalhando com Computadores','Escola Virtual'] }
    ];
    
    try {
      toast.loading('Importando certificados... Aguarde.');
      for (const cat of mock) {
        for (const item of cat.items) {
          await supabaseService.createCertification({
            title: item, issuer: 'Fábrica / Mock', category: cat.category, date: '2024'
          });
        }
      }
      toast.success('Certificados importados com sucesso!');
      loadData();
    } catch { toast.error('Erro ao importar certificados'); }
  };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      toast.loading('Fazendo upload da imagem...', { id: 'upload' });
      const url = await supabaseService.uploadImage(file);
      if (url) {
        setNewProject({ ...newProject, image: url });
        toast.success('Upload concluído!', { id: 'upload' });
      } else {
        toast.error('Erro no upload. Verifique as políticas do Storage no Supabase.', { id: 'upload' });
      }
    } catch {
      toast.error('Erro inesperado no upload', { id: 'upload' });
    }
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await supabaseService.updateProject(editId, newProject);
      } else {
        await supabaseService.createProject(newProject);
      }
      setNewProject({ title: '', description: '', link: '', github: '', category: 'Sistemas', node: '', image: '' });
      setEditId(null);
      toast.success('Projeto salvo com sucesso!');
      loadData();
    } catch (error) { toast.error('Erro ao salvar projeto'); }
  };

  const handleSaveExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await supabaseService.updateExperience(editId, newExperience);
      } else {
        await supabaseService.createExperience(newExperience);
      }
      setNewExperience({ type: 'Trabalho', title: '', institution: '', period: '', description: '', activities: '' });
      setEditId(null);
      toast.success('Trajetória salva com sucesso!');
      loadData();
    } catch { toast.error('Erro ao salvar trajetória'); }
  };

    const handleSaveContact = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await supabaseService.updateContactMessage(editId, newContact);
        toast.success('Mensagem atualizada com sucesso!');
        loadData();
      }
      setIsModalOpen(false);
      setEditId(null);
    } catch { toast.error('Erro ao salvar atualização'); }
  };

  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        const val = parseInt(newSkill.value) || 0;
        await supabaseService.updateSkill(editId, { ...newSkill, value: val });
      } else {
        const val = parseInt(newSkill.value) || 0;
        await supabaseService.createSkill({ ...newSkill, value: val });
      }
      setNewSkill({ name: '', category: 'Backend & APIs', value: '90%' });
      setEditId(null);
      toast.success('Skill salva com sucesso!');
      loadData();
    } catch (error) { toast.error('Erro ao salvar skill'); }
  };

  const triggerDelete = (type: 'project' | 'skill' | 'cert' | 'experience' | 'chat' | 'contact', id: string) => {
    setDeleteItem({ type, id });
  };

  const confirmDelete = async () => {
    if (!deleteItem) return;
    const { type, id } = deleteItem;
    try {
      if (type === 'project') await supabaseService.deleteProject(id);
      else if (type === 'skill') await supabaseService.deleteSkill(id);
      else if (type === 'cert') await supabaseService.deleteCertification(id);
      else if (type === 'chat') await supabaseService.deleteChatMessage(id);
      else if (type === 'contact') await supabaseService.deleteContactMessage(id);
      else await supabaseService.deleteExperience(id);
      toast.success('Item excluído com sucesso!');
      loadData();
    } catch (error) { toast.error('Erro ao deletar'); }
    finally { setDeleteItem(null); }
  };

  return (
    <div className={css({ display: 'flex', minH: '100vh', bg: '#0e0e0e', fontFamily: 'body' })}>
      
      {/* Mobile Backdrop & Sidebar */}
      {isMobileMenuOpen && (
        <div 
          onClick={() => setIsMobileMenuOpen(false)}
          className={css({ position: 'fixed', inset: 0, bg: 'rgba(0,0,0,0.6)', zIndex: 40, display: { base: 'block', lg: 'none' } })}
        />
      )}
      
      <div className={css({
        position: { base: 'fixed', lg: 'static' },
        top: 0, left: 0, h: '100vh',
        w: '260px', bg: '#161616',
        zIndex: 50,
        transform: { base: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)', lg: 'none' },
        transition: 'transform 0.3s ease-in-out',
        display: 'flex', flexDir: 'column', gap: 8,
        p: 6,
        boxShadow: { base: '2xl', lg: 'none' }
      })}>
        <div>
          <span className={cx(css({ fontFamily: 'label', color: 'primary', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase' }), 'neon-glow')}>Painel.Sistema</span>
          <p className={css({ color: 'white', fontWeight: 'bold', fontSize: 'lg', mt: 1 })}>Jefferson S.</p>
        </div>

        <nav className={css({ display: 'flex', flexDir: 'column', gap: 2, flex: 1, overflowY: 'auto' })}>
          {[
            { id: 'overview', label: 'Visão Geral' },
            { id: 'about', label: 'Sobre' },
            { id: 'messages', label: 'Mensagens' },
            { id: 'chat', label: 'Conversas AI' },
            { id: 'projects', label: 'Projetos' },
            { id: 'skills', label: 'Habilidades' },
            { id: 'certifications', label: 'Certificações' },
            { id: 'experiences', label: 'Trajetória' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={css({
                w: 'full', textAlign: 'left', p: 3, rounded: '8px', fontSize: 'sm', fontFamily: 'headline',
                bg: activeTab === tab.id ? 'primary' : 'transparent',
                color: activeTab === tab.id ? '#1e1e2d' : 'gray.400',
                cursor: 'pointer', transition: 'all 0.2s',
                fontWeight: activeTab === tab.id ? 'bold' : 'normal',
                _hover: { bg: activeTab === tab.id ? 'primary' : 'rgba(255,255,255,0.05)', color: activeTab === tab.id ? '#1e1e2d' : 'white' }
              })}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <button onClick={() => logout()} className={css({ w: 'full', p: 3, rounded: '8px', bg: 'rgba(255,0,0,0.1)', color: '#ff4444', border: '1px solid rgba(255,0,0,0.2)', fontSize: 'xs', cursor: 'pointer', _hover: { bg: 'rgba(255,0,0,0.2)' } })}>
          Sair do Sistema
        </button>
      </div>

      {/* Main Content */}
      <div className={css({ flex: 1, display: 'flex', flexDir: 'column', h: '100vh', overflow: 'hidden' })}>
        
        {/* Top Header */}
        <header className={css({ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: { base: 4, lg: 8 }, pb: { base: 4, lg: 4 } })}>
          <div className={css({ display: 'flex', alignItems: 'center', gap: 4 })}>
            <button onClick={() => setIsMobileMenuOpen(true)} className={css({ display: { base: 'flex', lg: 'none' }, color: 'white', alignItems: 'center', justifyContent: 'center', p: 2, bg: '#161616', rounded: '8px', cursor: 'pointer' })}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
            <h1 className={css({ fontFamily: 'headline', fontSize: { base: '2xl', lg: '3xl' }, fontWeight: 'bold', color: 'white' })}>
              {activeTab === 'overview' ? 'Visão Geral' : activeTab === 'messages' ? 'Mensagens' : activeTab === 'chat' ? 'Conversas AI' : activeTab === 'projects' ? 'Projetos' : activeTab === 'skills' ? 'Habilidades' : activeTab === 'about' ? 'Sobre' : activeTab === 'certifications' ? 'Certificações' : 'Trajetória'}
            </h1>
          </div>

          <div className={css({ display: { base: 'none', md: 'flex' }, alignItems: 'center', gap: 6 })}>
             <div className={css({ position: 'relative' })}>
               <input 
                 type="text" 
                 value={globalSearch}
                 onChange={(e) => setGlobalSearch(e.target.value)}
                 placeholder="Pesquisar..." 
                 className={css({ bg: '#161616', color: 'white', rounded: 'full', pl: 4, pr: 10, py: 2, fontSize: 'sm', outline: 'none', w: '250px', border: '1px solid rgba(255,255,255,0.05)', _focus: { borderColor: 'primary' }, transition: 'all 0.2s' })} 
               />
               <svg className={css({ position: 'absolute', right: 3, top: '50%', transform: 'translateY(-50%)', color: 'gray.500' })} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
             </div>
             <div className={css({ display: 'flex', gap: 4, color: 'gray.400' })}>
               <svg onClick={() => toast.info('Nenhuma nova notificação 🎉')} className={css({ cursor: 'pointer', _hover: { color: 'white' } })} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
               <svg onClick={() => toast.info('Configurações do painel em desenvolvimento ⚙️')} className={css({ cursor: 'pointer', _hover: { color: 'white' } })} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
             </div>
          </div>
        </header>

        <div className={css({ flex: 1, overflowY: 'auto', p: { base: 4, lg: 8 } })}>
          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            {loading && <div className={css({ color: 'primary', fontSize: 'sm', mb: 4 })}>Buscando dados no Supabase...</div>}

            {/* Overview — Metrics Dashboard */}
            {activeTab === 'overview' && !loading && (
              <div className={css({ display: 'flex', flexDir: 'column', gap: 8 })}>

                {/* KPI Cards */}
                <div className={css({ display: 'grid', gridTemplateColumns: { base: '1fr', md: 'repeat(2, 1fr)', xl: 'repeat(4, 1fr)' }, gap: 5 })}>
                  {[
                    { label: 'Total Visitas', value: visitStats.total, color: '#22c55e' },
                    { label: 'Visitantes Únicos', value: visitStats.uniqueVisitors, color: '#3b82f6' },
                    { label: 'Mensagens', value: messages.length, color: '#8b5cf6' },
                    { label: 'Cidades Dist.', value: visitStats.topCities.length, color: '#f59e0b' },
                  ].map((kpi) => (
                    <div key={kpi.label} className={css({ bg: kpi.color as any, p: 6, rounded: '16px', color: 'white', position: 'relative', overflow: 'hidden', boxShadow: '0 4px 14px rgba(0,0,0,0.25)' })}>
                      <span className={css({ fontSize: 'sm', opacity: 0.9 })}>{kpi.label}</span>
                      <p className={css({ fontSize: '4xl', fontWeight: 'bold', mt: 2 })}>{kpi.value.toLocaleString('pt-BR')}</p>
                      <div className={css({ mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 'xs', opacity: 0.8 })}>
                        <span>↑ Registros Base</span>
                        <span className={css({ bg: 'rgba(255,255,255,0.2)', px: 2, py: 1, rounded: 'full' })}>Detalhes</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Top Cities + Recent Visits */}
                <div className={css({ display: 'grid', gridTemplateColumns: { base: '1fr', xl: '300px 1fr' }, gap: 6 })}>
                  
                  {/* Top Cidades (AdSense Statistic equivalent) */}
                  <div className={css({ bg: '#161616', p: 6, rounded: '16px', border: '1px solid rgba(255,255,255,0.05)' })}>
                    <h3 className={css({ color: 'white', fontWeight: 'bold', mb: 5, fontSize: 'sm', textTransform: 'uppercase', letterSpacing: 'wider' })}>🌎 Top Cidades</h3>
                    <div className={css({ display: 'flex', flexDir: 'column', gap: 4 })}>
                      {visitStats.topCities.length === 0 && <p className={css({ color: 'gray.500', fontSize: 'xs' })}>Aguardando primeiras visitas...</p>}
                      {visitStats.topCities.map((c, i) => {
                        const pct = visitStats.total > 0 ? Math.round((c.count / visitStats.total) * 100) : 0;
                        return (
                          <div key={c.city}>
                            <div className={css({ display: 'flex', justifyContent: 'space-between', mb: 2 })}>
                              <span className={css({ fontSize: 'sm', color: 'gray.300' })}>{i + 1}. {c.city}</span>
                              <span className={css({ fontSize: 'sm', color: 'white', fontWeight: 'bold' })}>{c.count} ({pct}%)</span>
                            </div>
                            <div className={css({ h: '6px', bg: 'rgba(255,255,255,0.05)', rounded: 'full' })}>
                              <div style={{ width: `${pct}%` }} className={css({ h: 'full', bg: '#f59e0b', rounded: 'full', transition: 'width 0.5s' })} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Visitas Recentes (Recent Activity equivalent) */}
                  <div className={css({ bg: '#161616', p: 6, rounded: '16px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' })}>
                    <div className={css({ display: 'flex', flexDir: { base: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { base: 'flex-start', md: 'center' }, gap: 4, mb: 5 })}>
                      <h3 className={css({ color: 'white', fontWeight: 'bold', fontSize: 'sm', textTransform: 'uppercase', letterSpacing: 'wider' })}>📡 Visitas Recentes</h3>
                      <input 
                        type="text" 
                        placeholder="Pesquisar..." 
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                        className={css({ bg: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', rounded: 'full', px: 4, py: 2, fontSize: 'xs', color: 'white', outline: 'none', _focus: { borderColor: 'primary' }, w: { base: 'full', md: 'auto' } })}
                      />
                    </div>
                    <div className={css({ overflowX: 'auto' })}>
                      <table className={css({ w: 'full', borderCollapse: 'collapse', fontSize: 'sm', minWidth: '600px' })}>
                        <thead>
                          <tr>
                            {['ID', 'Cidade/País', 'Página', 'Data'].map(h => (
                              <th key={h} className={css({ textAlign: 'left', color: 'gray.400', pb: 3, pr: 4, fontWeight: 'normal', borderBottom: '1px solid rgba(255,255,255,0.1)' })}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {recentVisits.length === 0 && (
                            <tr><td colSpan={4} className={css({ color: 'gray.500', pt: 4 })}>Aguardando primeiras visitas...</td></tr>
                          )}
                          {recentVisits
                            .filter(v => v.visitor_id?.toLowerCase().includes(filterText.toLowerCase()) || v.city?.toLowerCase().includes(filterText.toLowerCase()))
                            .map((v) => (
                            <tr key={v.id} className={css({ borderBottom: '1px solid rgba(255,255,255,0.05)', _hover: { bg: 'rgba(255,255,255,0.02)' } })}>
                              <td className={css({ py: 4, pr: 4, color: 'gray.400', fontFamily: 'mono', fontSize: 'xs' })}>{v.visitor_id?.slice(0, 8)}…</td>
                              <td className={css({ py: 4, pr: 4 })}>
                                <span className={css({ color: 'white', display: 'block', fontWeight: 'bold' })}>{v.city || 'Desconhecido'}</span>
                                <span className={css({ color: 'gray.500', fontSize: 'xs' })}>{v.country || 'N/A'}</span>
                              </td>
                              <td className={css({ py: 4, pr: 4, color: 'primary' })}>{v.pathname}</td>
                              <td className={css({ py: 4, color: 'gray.400' })}>{new Date(v.visited_at).toLocaleString('pt-BR')}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Mensagens recebidas quick view */}
                {messages.length > 0 && (
                  <div className={css({ bg: '#161616', p: 6, rounded: '16px', border: '1px solid rgba(255,255,255,0.05)' })}>
                    <h3 className={css({ color: 'white', fontWeight: 'bold', mb: 4, fontSize: 'sm', textTransform: 'uppercase', letterSpacing: 'wider' })}>💬 Últimas Mensagens</h3>
                    <div className={css({ display: 'grid', gridTemplateColumns: { base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 4 })}>
                      {messages.slice(0, 3).map((m) => (
                        <div key={m.id} className={css({ p: 4, bg: 'rgba(255,255,255,0.02)', rounded: '8px', borderLeft: '3px solid #8b5cf6' })}>
                          <span className={css({ color: 'white', fontSize: 'sm', fontWeight: 'bold', display: 'block' })}>{m.name}</span>
                          <span className={css({ color: 'gray.500', fontSize: 'xs', mb: 2, display: 'block' })}>{m.email}</span>
                          <span className={css({ color: 'gray.400', fontSize: 'xs' })}>{new Date(m.submitted_at).toLocaleDateString('pt-BR')}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Messages List */}
          {activeTab === 'messages' && !loading && (
            <div className={css({ display: 'flex', flexDir: 'column', gap: 6 })}>
              <div className={css({ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 })}>
                <p className={css({ color: 'gray.400', fontSize: 'sm' })}>{messages.length} mensagens de contato</p>
              </div>

              <div className={css({ display: 'flex', flexDir: 'column', gap: 4 })}>
                {messages.length === 0 && <p className={css({ color: 'gray.500', fontSize: 'sm', fontStyle: 'italic' })}>Nenhuma mensagem recebida.</p>}
                
                {messages
                  .filter(m => !globalSearch || m.name?.toLowerCase().includes(globalSearch.toLowerCase()) || m.email?.toLowerCase().includes(globalSearch.toLowerCase()) || m.message?.toLowerCase().includes(globalSearch.toLowerCase()))
                  .map((m) => (
                  <div key={m.id} className={css({ bg: '#161616', p: 5, rounded: '8px', borderLeft: '3px solid token(colors.secondary)', borderTop: '1px solid rgba(255,255,255,0.02)', borderRight: '1px solid rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', _hover: { bg: 'rgba(255,255,255,0.01)' } })}>
                    <div className={css({ flex: 1, pr: 4 })}>
                      <div className={css({ display: 'flex', justifyContent: 'space-between', mb: 1 })}>
                        <span className={css({ fontWeight: 'bold', color: 'white' })}>{m.name}</span>
                        <span className={css({ fontSize: 'xs', color: 'gray.500' })}>{new Date(m.submitted_at).toLocaleString('pt-BR')}</span>
                      </div>
                      <p className={css({ fontSize: 'xs', color: 'secondary', mb: 3 })}>{m.email}</p>
                      <p className={css({ fontSize: 'sm', color: 'gray.300' })}>{m.message}</p>
                    </div>
                    <div className={css({ display: 'flex', flexDir: 'column', gap: 2, alignItems: 'flex-end', w: '100px' })}>
                      <button onClick={() => { setEditId(m.id); setNewContact({ name: m.name, email: m.email, message: m.message }); setIsModalOpen(true); }} className={css({ w: 'full', p: 2, bg: 'rgba(0,230,118,0.1)', color: 'primary', rounded: '8px', cursor: 'pointer', fontSize: 'xs' })}>Editar</button>
                      <button onClick={()=>triggerDelete('contact', m.id)} className={css({ w: 'full', p: 2, bg: 'rgba(255,0,0,0.1)', color: '#ff4444', rounded: '8px', cursor: 'pointer', fontSize: 'xs' })}>Excluir</button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Modal de Mensagem */}
              <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditId(null); }} title="Editar Mensagem de Contato">
                <form onSubmit={handleSaveContact} className={css({ display: 'flex', flexDir: 'column', gap: 4 })}>
                  <input required value={newContact.name} onChange={e=>setNewContact({...newContact, name:e.target.value})} placeholder="Nome" className={css({ bg: '#0e0e0e', p: 3, rounded: '8px', border: '1px solid rgba(255,255,255,0.05)', color: 'white', outline: 'none', _focus: { border: '1px solid token(colors.primary)' } })}/>
                  <input required type="email" value={newContact.email} onChange={e=>setNewContact({...newContact, email:e.target.value})} placeholder="Email" className={css({ bg: '#0e0e0e', p: 3, rounded: '8px', border: '1px solid rgba(255,255,255,0.05)', color: 'white', outline: 'none', _focus: { border: '1px solid token(colors.primary)' } })}/>
                  <textarea required value={newContact.message} onChange={e=>setNewContact({...newContact, message:e.target.value})} placeholder="Mensagem" className={css({ bg: '#0e0e0e', p: 3, rounded: '8px', border: '1px solid rgba(255,255,255,0.05)', color: 'white', h: 32, resize: 'none', outline: 'none', _focus: { border: '1px solid token(colors.primary)' } })}/>
                  <button type="submit" className={css({ bg: 'primary', p: 3, rounded: '8px', fontWeight: 'bold', color: 'black', cursor: 'pointer', mt: 2 })}>
                    Salvar Alterações
                  </button>
                </form>
              </Modal>
            </div>
          )}

          {/* Chat Messages List */}
          {activeTab === 'chat' && !loading && (
            <div className={css({ display: 'flex', flexDir: 'column', gap: 4 })}>
              
              {chatError && (
                <div className={css({ bg: 'rgba(255,152,0,0.1)', p: 5, rounded: '8px', borderLeft: '3px solid #ff9800', mb: 2 })}>
                  <p className={css({ color: '#ff9800', fontWeight: 'bold', fontSize: 'sm', mb: 1 })}>⚠️ Configuração Pendente no Supabase</p>
                  <p className={css({ color: 'gray.300', fontSize: 'xs' })}>A tabela <code className={css({ color: 'primary' })}>{'chat_messages'}</code> não foi encontrada ou não está acessível.</p>
                  <p className={css({ color: 'gray.400', fontSize: 'xs', mt: 1 })}>Para ativar os logs, execute o script de setup mestre no seu Supabase Studio.</p>
                </div>
              )}

              {chatMessages.length === 0 && !chatError && <p className={css({ color: 'gray.500', fontSize: 'sm' })}>Nenhum log de chat registrado.</p>}
              {chatMessages
                .filter(m => !globalSearch || m.prompt?.toLowerCase().includes(globalSearch.toLowerCase()) || m.response?.toLowerCase().includes(globalSearch.toLowerCase()))
                .map((m) => (
                <div key={m.id} className={css({ bg: '#161616', p: 5, rounded: '8px', borderLeft: '3px solid token(colors.primary)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' })}>
                  <div className={css({ flex: 1, pr: 4 })}>
                    <div className={css({ display: 'flex', justifyContent: 'space-between', mb: 1 })}>
                       <span className={css({ fontSize: 'xs', color: 'gray.500' })}>{new Date(m.submitted_at).toLocaleString('pt-BR')}</span>
                    </div>
                    <p className={css({ fontSize: 'xs', color: 'primary', fontWeight: 'bold', mb: 1 })}>Visitante:</p>
                    <p className={css({ fontSize: 'sm', color: 'white', mb: 3 })}>{m.prompt}</p>
                    
                    <p className={css({ fontSize: 'xs', color: 'secondary', fontWeight: 'bold', mb: 1 })}>IA Response:</p>
                    <p className={css({ fontSize: 'sm', color: 'gray.300' })}>{m.response}</p>
                  </div>
                  <button 
                    onClick={() => triggerDelete('chat', m.id)} 
                    className={css({ p: 2, bg: 'rgba(255,0,0,0.1)', color: '#ff4444', rounded: '8px', cursor: 'pointer', fontSize: 'xs', ml: 4, height: 'fit-content' })}
                  >
                    Excluir
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Projects Management */}
          {activeTab === 'projects' && !loading && (
            <div className={css({ display: 'flex', flexDir: 'column', gap: 6 })}>
              <div className={css({ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 })}>
                <p className={css({ color: 'gray.400', fontSize: 'sm' })}>{projects.length} projetos cadastrados</p>
                <button 
                  onClick={() => { setEditId(null); setNewProject({ title: '', description: '', link: '', github: '', category: 'Sistemas', node: '', image: '' }); setIsModalOpen(true); }}
                  className={css({ bg: 'rgba(0,230,118,0.1)', color: 'primary', px: 4, py: 2, rounded: '8px', fontSize: 'sm', fontWeight: 'bold', cursor: 'pointer', border: '1px solid rgba(0,230,118,0.2)', _hover: { bg: 'rgba(0,230,118,0.2)' } })}
                >
                  + Adicionar Projeto
                </button>
              </div>

              <div className={css({ display: 'flex', flexDir: 'column', gap: 3 })}>
                  {projects.length === 0 && <p className={css({ color: 'gray.500', fontSize: 'sm', fontStyle: 'italic' })}>Nenhum projeto cadastrado.</p>}
                  {projects
                    .filter(p => !globalSearch || p.title?.toLowerCase().includes(globalSearch.toLowerCase()) || p.category?.toLowerCase().includes(globalSearch.toLowerCase()))
                    .map(p => (
                    <div key={p.id} className={css({ bg: '#161616', p: 5, rounded: '8px', border: '1px solid rgba(255,255,255,0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', _hover: { bg: 'rgba(255,255,255,0.01)' } })}>
                      <div>
                        <p className={css({ fontWeight: 'bold', color: 'white' })}>{p.title}</p>
                        <span className={css({ color: 'primary', fontSize: '10px', textTransform: 'uppercase' })}>{p.category}</span>
                      </div>
                      <div className={css({ display: 'flex', gap: 2 })}>
                        <button onClick={() => { setEditId(p.id); setNewProject({ title: p.title, description: p.description, link: p.link || '', github: p.github || '', category: p.category || 'Sistemas', node: p.node || '', image: p.image || '' }); setIsModalOpen(true); }} className={css({ p: 2, bg: 'rgba(0,230,118,0.1)', color: 'primary', rounded: '8px', cursor: 'pointer', fontSize: 'xs' })}>Editar</button>
                        <button onClick={()=>triggerDelete('project', p.id)} className={css({ p: 2, bg: 'rgba(255,0,0,0.1)', color: '#ff4444', rounded: '8px', cursor: 'pointer', fontSize: 'xs' })}>Excluir</button>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Modal de Formulário */}
              <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditId(null); }} title={editId ? 'Editar Projeto' : 'Adicionar Projeto'}>
                <form onSubmit={async (e) => { await handleSaveProject(e); setIsModalOpen(false); }} className={css({ display: 'flex', flexDir: 'column', gap: 4 })}>
                  <input required value={newProject.title} onChange={e=>setNewProject({...newProject, title:e.target.value})} placeholder="Título" className={css({ bg: '#0e0e0e', p: 3, rounded: '8px', border: '1px solid rgba(255,255,255,0.05)', color: 'white', outline: 'none', _focus: { border: '1px solid token(colors.primary)' } })}/>
                  <select value={newProject.category} onChange={e=>setNewProject({...newProject, category:e.target.value})} className={css({ bg: '#0e0e0e', p: 3, rounded: '8px', border: '1px solid rgba(255,255,255,0.05)', color: 'white' })}>
                     <option value="Sistemas">Sistemas</option>
                     <option value="IA">IA & Automação</option>
                  </select>
                  <input required value={newProject.node} onChange={e=>setNewProject({...newProject, node:e.target.value})} placeholder="Subtítulo / Nó (Ex: Automação, Finanças)" className={css({ bg: '#0e0e0e', p: 3, rounded: '8px', border: '1px solid rgba(255,255,255,0.05)', color: 'white' })}/>
                  <textarea required value={newProject.description} onChange={e=>setNewProject({...newProject, description:e.target.value})} placeholder="Descrição" className={css({ bg: '#0e0e0e', p: 3, rounded: '8px', border: '1px solid rgba(255,255,255,0.05)', color: 'white', h: 32, resize: 'none' })}/>
                  <input value={newProject.link} onChange={e=>setNewProject({...newProject, link:e.target.value})} placeholder="Link do Projeto" className={css({ bg: '#0e0e0e', p: 3, rounded: '8px', border: '1px solid rgba(255,255,255,0.05)', color: 'white' })}/>
                  <input value={newProject.github} onChange={e=>setNewProject({...newProject, github:e.target.value})} placeholder="Link GitHub" className={css({ bg: '#0e0e0e', p: 3, rounded: '8px', border: '1px solid rgba(255,255,255,0.05)', color: 'white' })}/>
                  
                  <div>
                    <label className={css({ color: 'gray.400', fontSize: 'xs', mb: 1, display: 'block' })}>Capa do Projeto</label>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setUploading(true);
                        try {
                          const url = await supabaseService.uploadImage(file);
                          setNewProject({ ...newProject, image: url });
                          toast.success('Upload concluído!');
                        } catch { toast.error('Erro no upload'); }
                        finally { setUploading(false); }
                      }} 
                    />
                    {uploading && <span className={css({ fontSize: 'xs', color: 'primary', mt: 1, display: 'block' })}>Enviando...</span>}
                    {newProject.image && <p className={css({ fontSize: '10px', color: 'gray.500', mt: 1, textOverflow: 'ellipsis', overflow: 'hidden' })}>{newProject.image}</p>}
                  </div>

                  <button type="submit" className={css({ bg: 'primary', p: 3, rounded: '8px', fontWeight: 'bold', color: 'black', cursor: 'pointer', mt: 2 })} disabled={uploading}>
                    {editId ? 'Salvar Alterações' : 'Salvar'}
                  </button>
                </form>
              </Modal>
            </div>
          )}

          {/* Skills Management */}
          {activeTab === 'skills' && !loading && (
            <div className={css({ display: 'flex', flexDir: 'column', gap: 6 })}>
              <div className={css({ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 })}>
                <p className={css({ color: 'gray.400', fontSize: 'sm' })}>{skills.length} habilidades cadastradas</p>
                <button 
                  onClick={() => { setEditId(null); setNewSkill({ name: '', category: 'Backend & APIs', value: '90%' }); setIsModalOpen(true); }}
                  className={css({ bg: 'rgba(0,230,118,0.1)', color: 'primary', px: 4, py: 2, rounded: '8px', fontSize: 'sm', fontWeight: 'bold', cursor: 'pointer', border: '1px solid rgba(0,230,118,0.2)', _hover: { bg: 'rgba(0,230,118,0.2)' } })}
                >
                  + Adicionar Habilidade
                </button>
              </div>

              <div className={css({ display: 'flex', flexDir: 'column', gap: 3 })}>
                  {skills.length === 0 && <p className={css({ color: 'gray.500', fontSize: 'sm', fontStyle: 'italic' })}>Nenhuma habilidade cadastrada.</p>}
                  {skills
                    .filter(s => !globalSearch || s.name?.toLowerCase().includes(globalSearch.toLowerCase()) || s.category?.toLowerCase().includes(globalSearch.toLowerCase()))
                    .map(s => (
                    <div key={s.id} className={css({ bg: '#161616', p: 4, rounded: '8px', border: '1px solid rgba(255,255,255,0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', _hover: { bg: 'rgba(255,255,255,0.01)' } })}>
                      <div>
                        <p className={css({ color: 'white', fontSize: 'sm', fontWeight: 'bold' })}>{s.name}</p>
                        <span className={css({ color: 'secondary', fontSize: '10px' })}>{s.category} ({s.value}%)</span>
                      </div>
                      <div className={css({ display: 'flex', gap: 2 })}>
                        <button onClick={() => { setEditId(s.id); setNewSkill({ name: s.name, category: s.category, value: String(s.value) }); setIsModalOpen(true); }} className={css({ p: 2, bg: 'rgba(0,230,118,0.1)', color: 'primary', rounded: '8px', cursor: 'pointer', fontSize: 'xs' })}>Editar</button>
                        <button onClick={()=>triggerDelete('skill', s.id)} className={css({ p: 2, bg: 'rgba(255,0,0,0.1)', color: '#ff4444', rounded: '8px', cursor: 'pointer', fontSize: 'xs' })}>Excluir</button>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Modal de Habilidade */}
              <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditId(null); }} title={editId ? 'Editar Habilidade' : 'Adicionar Habilidade'}>
                <form onSubmit={async (e) => { await handleSaveSkill(e); setIsModalOpen(false); }} className={css({ display: 'flex', flexDir: 'column', gap: 4 })}>
                  <input required value={newSkill.name} onChange={e=>setNewSkill({...newSkill, name:e.target.value})} placeholder="Nome (Ex: Node.js)" className={css({ bg: '#0e0e0e', p: 3, rounded: '8px', border: '1px solid rgba(255,255,255,0.05)', color: 'white', outline: 'none', _focus: { border: '1px solid token(colors.primary)' } })}/>
                  <select value={newSkill.category} onChange={e=>setNewSkill({...newSkill, category:e.target.value})} className={css({ bg: '#0e0e0e', p: 3, rounded: '8px', border: '1px solid rgba(255,255,255,0.05)', color: 'white' })}>
                     <option value="Backend & APIs">Backend & APIs</option>
                     <option value="Frontend & UX">Frontend & UX</option>
                     <option value="IA & Automação">IA & Automação</option>
                     <option value="Mobile & Cloud">Mobile & Cloud</option>
                  </select>
                  <input required value={newSkill.value} onChange={e=>setNewSkill({...newSkill, value:e.target.value})} placeholder="Porcentagem (Ex: 95%)" className={css({ bg: '#0e0e0e', p: 3, rounded: '8px', border: '1px solid rgba(255,255,255,0.05)', color: 'white' })}/>
                  <button type="submit" className={css({ bg: 'secondary', p: 3, rounded: '8px', fontWeight: 'bold', color: 'white', cursor: 'pointer', mt: 2 })}>
                    {editId ? 'Salvar Alterações' : 'Salvar'}
                  </button>
                </form>
              </Modal>
            </div>
          )}

          {/* About Management */}
          {activeTab === 'about' && !loading && (
            <form onSubmit={handleSaveAbout} className={css({ bg: '#161616', p: 6, rounded: '8px', display: 'flex', flexDir: 'column', gap: 4, maxW: '3xl' })}>
              <h3 className={css({ fontWeight: 'bold', color: 'white' })}>Informações do Sobre</h3>
              
              <div>
                <label className={css({ color: 'gray.400', fontSize: 'xs' })}>Nome de Exibição</label>
                <input required value={(about as any).name || ''} onChange={e=>setAbout({ ...about, name: e.target.value } as any)} className={css({ w: 'full', bg: '#0e0e0e', p: 3, rounded: '8px', border: '1px solid rgba(255,255,255,0.05)', color: 'white', mt: 1 })}/>
              </div>

              <div>
                <label className={css({ color: 'gray.400', fontSize: 'xs' })}>Cargo / Especialidade</label>
                <input required value={(about as any).role || ''} onChange={e=>setAbout({ ...about, role: e.target.value } as any)} className={css({ w: 'full', bg: '#0e0e0e', p: 3, rounded: '8px', border: '1px solid rgba(255,255,255,0.05)', color: 'white', mt: 1 })} placeholder="Ex: Sênior Full Stack & IA"/>
              </div>

              <div>
                <label className={css({ color: 'gray.400', fontSize: 'xs' })}>Título Principal</label>
                <input required value={about.title} onChange={e=>setAbout({...about, title:e.target.value})} className={css({ w: 'full', bg: '#0e0e0e', p: 3, rounded: '8px', border: '1px solid rgba(255,255,255,0.05)', color: 'white', mt: 1 })}/>
              </div>
              <div>
                <label className={css({ color: 'gray.400', fontSize: 'xs' })}>Subtítulo</label>
                <input required value={about.subtitle} onChange={e=>setAbout({...about, subtitle:e.target.value})} className={css({ w: 'full', bg: '#0e0e0e', p: 3, rounded: '8px', border: '1px solid rgba(255,255,255,0.05)', color: 'white', mt: 1 })}/>
              </div>
              <div>
                <label className={css({ color: 'gray.400', fontSize: 'xs' })}>Biografia (Bio)</label>
                <textarea rows={6} required value={about.bio} onChange={e=>setAbout({...about, bio:e.target.value})} className={css({ w: 'full', bg: '#0e0e0e', p: 3, rounded: '8px', border: '1px solid rgba(255,255,255,0.05)', color: 'white', mt: 1, resize: 'none' })}/>
              </div>

              <div>
                <label className={css({ color: 'gray.400', fontSize: 'xs', mb: 1, display: 'block' })}>Foto de Perfil</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setUploading(true);
                    try {
                      const url = await supabaseService.uploadImage(file);
                      setAbout({ ...about, imageUrl: url } as any);
                    } catch { toast.error('Erro no upload'); }
                    finally { setUploading(false); }
                  }} 
                />
                {uploading && <span className={css({ fontSize: 'xs', color: 'primary', mt: 1, display: 'block' })}>Enviando...</span>}
                {(about as any).imageUrl && (
                  <div className={css({ mt: 2, position: 'relative', w: '100px', h: '100px', rounded: '4px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' })}>
                    <img src={(about as any).imageUrl} alt="Foto de Perfil" className={css({ w: 'full', h: 'full', objectFit: 'cover' })} />
                  </div>
                )}
              </div>

              <button type="submit" className={css({ bg: 'primary', p: 3, rounded: '8px', fontWeight: 'bold', color: 'black', cursor: 'pointer', mt: 2 })} disabled={uploading}>Salvar Alterações</button>
            </form>
          )}

          {/* Certifications Management */}
          {activeTab === 'certifications' && !loading && (
            <div className={css({ display: 'flex', flexDir: 'column', gap: 6 })}>
              <div className={css({ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 })}>
                <div className={css({ display: 'flex', gap: 3, alignItems: 'center' })}>
                  <p className={css({ color: 'gray.400', fontSize: 'sm' })}>{certifications.length} certificados</p>
                  <button type="button" onClick={handleSeedCerts} className={css({ bg: 'rgba(0,230,118,0.05)', color: 'primary', px: 2, py: 1, rounded: '8px', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer', border: '1px solid rgba(0,230,118,0.1)', _hover: { bg: 'rgba(0,230,118,0.1)' } })}>Importar Mocks</button>
                </div>
                <button 
                  onClick={() => { setEditId(null); setNewCert({ title: '', issuer: '', date: '', link: '', category: 'Geral' }); setIsModalOpen(true); }}
                  className={css({ bg: 'rgba(0,230,118,0.1)', color: 'primary', px: 4, py: 2, rounded: '8px', fontSize: 'sm', fontWeight: 'bold', cursor: 'pointer', border: '1px solid rgba(0,230,118,0.2)', _hover: { bg: 'rgba(0,230,118,0.2)' } })}
                >
                  + Adicionar Certificado
                </button>
              </div>

              <div className={css({ display: 'flex', flexDir: 'column', gap: 3 })}>
                  {certifications.length === 0 && <p className={css({ color: 'gray.500', fontSize: 'sm', fontStyle: 'italic' })}>Nenhum certificado cadastrado.</p>}
                  {certifications
                    .filter(c => !globalSearch || c.title?.toLowerCase().includes(globalSearch.toLowerCase()) || c.issuer?.toLowerCase().includes(globalSearch.toLowerCase()))
                    .map(c => (
                    <div key={c.id} className={css({ bg: '#161616', p: 4, rounded: '8px', border: '1px solid rgba(255,255,255,0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', _hover: { bg: 'rgba(255,255,255,0.01)' } })}>
                      <div>
                        <p className={css({ color: 'white', fontSize: 'sm', fontWeight: 'bold' })}>{c.title}</p>
                        <p className={css({ color: 'gray.400', fontSize: 'xs' })}>{c.issuer} • {c.date} <span className={css({ color: 'secondary', ml: 1 })}>({c.category || 'Geral'})</span></p>
                      </div>
                      <div className={css({ display: 'flex', gap: 2 })}>
                        <button onClick={() => { setEditId(c.id); setNewCert({ title: c.title, issuer: c.issuer, date: c.date, link: c.link || '', category: c.category || 'Geral' }); setIsModalOpen(true); }} className={css({ p: 2, bg: 'rgba(0,230,118,0.1)', color: 'primary', rounded: '8px', cursor: 'pointer', fontSize: 'xs' })}>Editar</button>
                        <button onClick={()=>triggerDelete('cert', c.id)} className={css({ p: 2, bg: 'rgba(255,0,0,0.1)', color: '#ff4444', rounded: '8px', cursor: 'pointer', fontSize: 'xs' })}>Excluir</button>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Modal de Certificado */}
              <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditId(null); }} title={editId ? 'Editar Certificado' : 'Adicionar Certificado'}>
                <form onSubmit={async (e) => { await handleSaveCert(e); setIsModalOpen(false); }} className={css({ display: 'flex', flexDir: 'column', gap: 4 })}>
                  <input required value={newCert.title} onChange={e=>setNewCert({...newCert, title:e.target.value})} placeholder="Título da Certificação" className={css({ bg: '#0e0e0e', p: 3, rounded: '8px', border: '1px solid rgba(255,255,255,0.05)', color: 'white', outline: 'none', _focus: { border: '1px solid token(colors.primary)' } })}/>
                  <input required value={newCert.issuer} onChange={e=>setNewCert({...newCert, issuer:e.target.value})} placeholder="Emissor (Ex: AWS, Google)" className={css({ bg: '#0e0e0e', p: 3, rounded: '8px', border: '1px solid rgba(255,255,255,0.05)', color: 'white' })}/>
                  <select value={newCert.category} onChange={e=>setNewCert({...newCert, category:e.target.value})} className={css({ bg: '#0e0e0e', p: 3, rounded: '8px', border: '1px solid rgba(255,255,255,0.05)', color: 'white' })}>
                      <option value="DevSecOps & Cloud">DevSecOps & Cloud</option>
                      <option value="Dados & IA">Dados & IA</option>
                      <option value="Segurança da Informação">Segurança da Informação</option>
                      <option value="Geral">Geral</option>
                  </select>
                  <input required value={newCert.date} onChange={e=>setNewCert({...newCert, date:e.target.value})} placeholder="Data (Ex: Jan 2025)" className={css({ bg: '#0e0e0e', p: 3, rounded: '8px', border: '1px solid rgba(255,255,255,0.05)', color: 'white' })}/>
                  <input value={newCert.link || ''} onChange={e=>setNewCert({...newCert, link:e.target.value})} placeholder="Link do Certificado (Opcional)" className={css({ bg: '#0e0e0e', p: 3, rounded: '8px', border: '1px solid rgba(255,255,255,0.05)', color: 'white' })}/>
                  <button type="submit" className={css({ bg: 'secondary', p: 3, rounded: '8px', fontWeight: 'bold', color: 'white', cursor: 'pointer', mt: 2 })}>
                    {editId ? 'Salvar Alterações' : 'Salvar'}
                  </button>
                </form>
              </Modal>
            </div>
          )}
          {/* Experiences Management */}
          {activeTab === 'experiences' && !loading && (
            <div className={css({ display: 'flex', flexDir: 'column', gap: 6 })}>
              <div className={css({ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 })}>
                <p className={css({ color: 'gray.400', fontSize: 'sm' })}>{experiences.length} itens na trajetória</p>
                <button 
                  onClick={() => { setEditId(null); setNewExperience({ type: 'Trabalho', title: '', institution: '', period: '', description: '', activities: '' }); setIsModalOpen(true); }}
                  className={css({ bg: 'rgba(0,230,118,0.1)', color: 'primary', px: 4, py: 2, rounded: '8px', fontSize: 'sm', fontWeight: 'bold', cursor: 'pointer', border: '1px solid rgba(0,230,118,0.2)', _hover: { bg: 'rgba(0,230,118,0.2)' } })}
                >
                  + Adicionar Trajetória
                </button>
              </div>

              <div className={css({ display: 'flex', flexDir: 'column', gap: 3 })}>
                  {experiences.length === 0 && <p className={css({ color: 'gray.500', fontSize: 'sm', fontStyle: 'italic' })}>Nenhuma experiência cadastrada.</p>}
                  {experiences
                    .filter(e => !globalSearch || e.title?.toLowerCase().includes(globalSearch.toLowerCase()) || e.institution?.toLowerCase().includes(globalSearch.toLowerCase()))
                    .map(e => (
                    <div key={e.id} className={css({ bg: '#161616', p: 4, rounded: '8px', border: '1px solid rgba(255,255,255,0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', _hover: { bg: 'rgba(255,255,255,0.01)' } })}>
                      <div>
                        <p className={css({ color: 'white', fontSize: 'sm', fontWeight: 'bold' })}>{e.title}</p>
                        <p className={css({ color: 'gray.400', fontSize: 'xs' })}>{e.institution} • {e.period} <span className={css({ color: 'primary', ml: 1 })}>({e.type})</span></p>
                      </div>
                      <div className={css({ display: 'flex', gap: 2 })}>
                        <button onClick={() => { setEditId(e.id); setNewExperience({ type: e.type, title: e.title, institution: e.institution, period: e.period, description: e.description, activities: e.activities || '' }); setIsModalOpen(true); }} className={css({ p: 2, bg: 'rgba(0,230,118,0.1)', color: 'primary', rounded: '8px', cursor: 'pointer', fontSize: 'xs' })}>Editar</button>
                        <button onClick={()=>triggerDelete('experience', e.id)} className={css({ p: 2, bg: 'rgba(255,0,0,0.1)', color: '#ff4444', rounded: '8px', cursor: 'pointer', fontSize: 'xs' })}>Excluir</button>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Modal de Experiência */}
              <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditId(null); }} title={editId ? 'Editar Trajetória' : 'Adicionar Trajetória'}>
                <form onSubmit={async (e) => { await handleSaveExperience(e); setIsModalOpen(false); }} className={css({ display: 'flex', flexDir: 'column', gap: 4 })}>
                  <select value={newExperience.type} onChange={e=>setNewExperience({...newExperience, type:e.target.value})} className={css({ bg: '#0e0e0e', p: 3, rounded: '8px', border: '1px solid rgba(255,255,255,0.05)', color: 'white' })}>
                      <option value="Trabalho">Experiência Profissional</option>
                      <option value="Acadêmico">Formação Acadêmica</option>
                  </select>
                  <input required value={newExperience.title} onChange={e=>setNewExperience({...newExperience, title:e.target.value})} placeholder="Título / Cargo (Ex: Software Engineer)" className={css({ bg: '#0e0e0e', p: 3, rounded: '8px', border: '1px solid rgba(255,255,255,0.05)', color: 'white', outline: 'none', _focus: { border: '1px solid token(colors.primary)' } })}/>
                  <input required value={newExperience.institution} onChange={e=>setNewExperience({...newExperience, institution:e.target.value})} placeholder="Instituição / Empresa" className={css({ bg: '#0e0e0e', p: 3, rounded: '8px', border: '1px solid rgba(255,255,255,0.05)', color: 'white' })}/>
                  <input required value={newExperience.period} onChange={e=>setNewExperience({...newExperience, period:e.target.value})} placeholder="Período (Ex: 2022 - Presente)" className={css({ bg: '#0e0e0e', p: 3, rounded: '8px', border: '1px solid rgba(255,255,255,0.05)', color: 'white' })}/>
                  <textarea required value={newExperience.description} onChange={e=>setNewExperience({...newExperience, description:e.target.value})} placeholder="Descrição geral" className={css({ bg: '#0e0e0e', p: 3, rounded: '8px', border: '1px solid rgba(255,255,255,0.05)', color: 'white', h: 24, resize: 'none' })}/>
                  <textarea value={newExperience.activities} onChange={e=>setNewExperience({...newExperience, activities:e.target.value})} placeholder="Atividades (Uma por linha)" className={css({ bg: '#0e0e0e', p: 3, rounded: '8px', border: '1px solid rgba(255,255,255,0.05)', color: 'white', h: 32, resize: 'none' })}/>
                  <button type="submit" className={css({ bg: 'primary', p: 3, rounded: '8px', fontWeight: 'bold', color: 'black', cursor: 'pointer', mt: 2 })}>
                    {editId ? 'Salvar Alterações' : 'Salvar'}
                  </button>
                </form>
              </Modal>
            </div>
          )}
          </motion.div>
        </div>

        {/* Modais de Confirmação */}
        <ConfirmModal 
          isOpen={deleteItem !== null} 
          onClose={() => setDeleteItem(null)} 
          onConfirm={confirmDelete}
          title="Confirmar Exclusão"
          message="Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita."
        />

      </div>
    </div>
  );
}
