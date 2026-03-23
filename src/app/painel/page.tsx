'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/presentation/contexts/AuthContext';
import { supabaseService } from '@/domain/services/supabaseService';
import { css, cx } from 'styled-system/css';
import { motion, AnimatePresence } from 'framer-motion';

export default function PainelDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'skills' | 'messages' | 'about' | 'certifications' | 'experiences' | 'chat'>('overview');
  
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
  const [chatError, setChatError] = useState(false);

  // Form States
  const [editId, setEditId] = useState<string | null>(null);
  const [newProject, setNewProject] = useState({ title: '', description: '', link: '', github: '', category: 'Sistemas', node: '', image: '' });
  const [newSkill, setNewSkill] = useState({ name: '', category: 'Backend & APIs', value: '90%' });
  const [newCert, setNewCert] = useState({ title: '', issuer: '', date: '', link: '', category: 'Geral' });
  const [newExperience, setNewExperience] = useState({ type: 'Trabalho', title: '', institution: '', period: '', description: '', activities: '' });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
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
       await supabaseService.createCertification(newCert);
       setNewCert({ title: '', issuer: '', date: '', link: '', category: 'Geral' });
       setEditId(null);
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
      loadData();
    } catch { toast.error('Erro ao salvar trajetória'); }
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
      loadData();
    } catch (error) { toast.error('Erro ao salvar skill'); }
  };

  const handleDelete = async (type: 'project' | 'skill' | 'cert' | 'experience' | 'chat', id: string) => {
    if (!confirm('Tem certeza?')) return;
    try {
      if (type === 'project') await supabaseService.deleteProject(id);
      else if (type === 'skill') await supabaseService.deleteSkill(id);
      else if (type === 'cert') await supabaseService.deleteCertification(id);
      else if (type === 'chat') await supabaseService.deleteChatMessage(id);
      else await supabaseService.deleteExperience(id);
      loadData();
    } catch (error) { toast.error('Erro ao deletar'); }
  };

  return (
    <div className={css({ display: 'flex', minH: '100vh', bg: '#090909' })}>
      
      {/* Sidebar */}
      <div className={css({ w: '260px', bg: '#0d0d0d', borderRight: '1px solid rgba(255,255,255,0.03)', p: 6, display: 'flex', flexDir: 'column', gap: 8 })}>
        <div>
          <span className={cx(css({ fontFamily: 'label', color: 'primary', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase' }), 'neon-glow')}>Painel.Sistema</span>
          <p className={css({ color: 'white', fontWeight: 'bold', fontSize: 'lg', mt: 1 })}>Jefferson S. Paulino</p>
        </div>

        <nav className={css({ display: 'flex', flexDir: 'column', gap: 2, flex: 1 })}>
          {[
            { id: 'overview', label: 'Visão Geral' },
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
                w: 'full', textAlign: 'left', p: 3, rounded: 'lg', fontSize: 'sm', fontFamily: 'headline',
                bg: activeTab === tab.id ? 'rgba(0,230,118,0.05)' : 'transparent',
                color: activeTab === tab.id ? 'primary' : 'gray.400',
                borderLeft: activeTab === tab.id ? '3px solid token(colors.primary)' : '3px solid transparent',
                cursor: 'pointer', transition: 'all 0.2s',
                _hover: { bg: 'rgba(255,255,255,0.02)', color: 'white' }
              })}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <button onClick={() => logout()} className={css({ w: 'full', p: 3, rounded: 'lg', bg: 'rgba(255,0,0,0.05)', color: '#ff4444', border: '1px solid rgba(255,0,0,0.1)', fontSize: 'xs', cursor: 'pointer', _hover: { bg: 'rgba(255,0,0,0.1)' } })}>
          Sair do Sistema
        </button>
      </div>

      {/* Main Content */}
      <div className={css({ flex: 1, p: 10, overflowY: 'auto' })}>
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className={css({ fontFamily: 'headline', fontSize: '3xl', fontWeight: 'bold', color: 'white', mb: 8 })}>{
             activeTab === 'overview' ? 'Visão Geral' : activeTab === 'messages' ? 'Mensagens' : activeTab === 'chat' ? 'Conversas AI' : activeTab === 'projects' ? 'Projetos' : activeTab === 'skills' ? 'Habilidades' : activeTab === 'about' ? 'Sobre' : activeTab === 'certifications' ? 'Certificações' : 'Trajetória'
          }</h1>

          {loading && <div className={css({ color: 'primary', fontSize: 'sm' })}>Buscando dados no Supabase...</div>}

          {/* Overview — Metrics Dashboard */}
          {activeTab === 'overview' && !loading && (
            <div className={css({ display: 'flex', flexDir: 'column', gap: 8 })}>

              {/* KPI Cards */}
              <div className={css({ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 5 })}>
                {[
                  { label: 'Total de Visitas', value: visitStats.total, color: 'primary' },
                  { label: 'Visitantes Únicos', value: visitStats.uniqueVisitors, color: 'secondary' },
                  { label: 'Mensagens', value: messages.length, color: '#60a5fa' },
                  { label: 'Cidades Distintas', value: visitStats.topCities.length, color: '#a78bfa' },
                ].map((kpi) => (
                  <div key={kpi.label} className={css({ bg: '#141414', p: 6, rounded: '2xl', border: '1px solid rgba(255,255,255,0.04)', position: 'relative', overflow: 'hidden' })}>
                    <div className={css({ position: 'absolute', top: 0, left: 0, w: 'full', h: '2px', bg: kpi.color as any })} />
                    <span className={css({ fontSize: 'xs', color: 'gray.500', textTransform: 'uppercase', letterSpacing: 'wider' })}>{kpi.label}</span>
                    <p className={css({ fontSize: '4xl', fontWeight: 'bold', color: 'white', mt: 2 })}>{kpi.value}</p>
                  </div>
                ))}
              </div>

              {/* Top Cities + Recent Visits */}
              <div className={css({ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 6 })}>
                
                {/* Top Cidades */}
                <div className={css({ bg: '#141414', p: 6, rounded: '2xl', border: '1px solid rgba(255,255,255,0.04)' })}>
                  <h3 className={css({ color: 'white', fontWeight: 'bold', mb: 5, fontSize: 'sm', textTransform: 'uppercase', letterSpacing: 'wider' })}>🌎 Top Cidades</h3>
                  <div className={css({ display: 'flex', flexDir: 'column', gap: 3 })}>
                    {visitStats.topCities.length === 0 && (
                      <p className={css({ color: 'gray.600', fontSize: 'xs' })}>Aguardando primeiras visitas...</p>
                    )}
                    {visitStats.topCities.map((c, i) => {
                      const pct = visitStats.total > 0 ? Math.round((c.count / visitStats.total) * 100) : 0;
                      return (
                        <div key={c.city}>
                          <div className={css({ display: 'flex', justifyContent: 'space-between', mb: 1 })}>
                            <span className={css({ fontSize: 'xs', color: 'gray.300' })}>{i + 1}. {c.city}</span>
                            <span className={css({ fontSize: 'xs', color: 'gray.500' })}>{c.count} ({pct}%)</span>
                          </div>
                          <div className={css({ h: '3px', bg: 'rgba(255,255,255,0.05)', rounded: 'full' })}>
                            <div style={{ width: `${pct}%` }} className={css({ h: 'full', bg: 'primary', rounded: 'full', transition: 'width 0.5s' })} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Visitas Recentes */}
                <div className={css({ bg: '#141414', p: 6, rounded: '2xl', border: '1px solid rgba(255,255,255,0.04)', overflow: 'hidden' })}>
                  <div className={css({ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5 })}>
                    <h3 className={css({ color: 'white', fontWeight: 'bold', fontSize: 'sm', textTransform: 'uppercase', letterSpacing: 'wider' })}>📡 Visitas Recentes</h3>
                    <input 
                      type="text" 
                      placeholder="🔎 Filtrar por ID ou Cidade..." 
                      value={filterText}
                      onChange={(e) => setFilterText(e.target.value)}
                      className={css({ bg: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)', rounded: 'lg', px: 3, py: 1.5, fontSize: 'xs', color: 'white', outline: 'none', _focus: { borderColor: 'primary' } })}
                    />
                  </div>
                  <div className={css({ overflowX: 'auto' })}>
                    <table className={css({ w: 'full', borderCollapse: 'collapse', fontSize: 'xs' })}>
                      <thead>
                        <tr>
                          {['Visitor ID', 'Cidade', 'País', 'Página', 'Data/Hora'].map(h => (
                            <th key={h} className={css({ textAlign: 'left', color: 'gray.500', pb: 3, pr: 4, fontWeight: 'normal', textTransform: 'uppercase', letterSpacing: 'wider', fontSize: '10px', borderBottom: '1px solid rgba(255,255,255,0.05)' })}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {recentVisits.length === 0 && (
                          <tr><td colSpan={5} className={css({ color: 'gray.600', pt: 4 })}>Aguardando primeiras visitas...</td></tr>
                        )}
                        {recentVisits
                          .filter(v => 
                            v.visitor_id?.toLowerCase().includes(filterText.toLowerCase()) || 
                            v.city?.toLowerCase().includes(filterText.toLowerCase())
                          )
                          .map((v) => (
                          <tr key={v.id} className={css({ borderBottom: '1px solid rgba(255,255,255,0.02)', _hover: { bg: 'rgba(255,255,255,0.02)' } })}>
                            <td className={css({ py: 3, pr: 4, color: 'gray.400', fontFamily: 'mono' })}>{v.visitor_id?.slice(0, 8)}…</td>
                            <td className={css({ py: 3, pr: 4, color: 'primary' })}>{v.city || '—'}</td>
                            <td className={css({ py: 3, pr: 4, color: 'gray.300' })}>{v.country || '—'}</td>
                            <td className={css({ py: 3, pr: 4, color: 'gray.400' })}>{v.pathname}</td>
                            <td className={css({ py: 3, color: 'gray.500' })}>{new Date(v.visited_at).toLocaleString('pt-BR')}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Mensagens recebidas quick view */}
              {messages.length > 0 && (
                <div className={css({ bg: '#141414', p: 6, rounded: '2xl', border: '1px solid rgba(255,255,255,0.04)' })}>
                  <h3 className={css({ color: 'white', fontWeight: 'bold', mb: 4, fontSize: 'sm', textTransform: 'uppercase', letterSpacing: 'wider' })}>💬 Últimas Mensagens</h3>
                  <div className={css({ display: 'flex', flexDir: 'column', gap: 3 })}>
                    {messages.slice(0, 3).map((m) => (
                      <div key={m.$id} className={css({ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 3, bg: 'rgba(255,255,255,0.02)', rounded: 'lg', borderLeft: '2px solid token(colors.secondary)' })}>
                        <div>
                          <span className={css({ color: 'white', fontSize: 'sm', fontWeight: 'bold' })}>{m.name}</span>
                          <span className={css({ color: 'gray.500', fontSize: 'xs', ml: 2 })}>{m.email}</span>
                        </div>
                        <span className={css({ color: 'gray.600', fontSize: 'xs' })}>{new Date(m.submittedAt).toLocaleDateString('pt-BR')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* Messages List */}
          {activeTab === 'messages' && !loading && (
            <div className={css({ display: 'flex', flexDir: 'column', gap: 4 })}>
              {messages.map((m) => (
                <div key={m.$id} className={css({ bg: '#121212', p: 5, rounded: 'xl', borderLeft: '3px solid token(colors.secondary)' })}>
                  <div className={css({ display: 'flex', justifyContent: 'space-between', mb: 2 })}>
                     <span className={css({ fontWeight: 'bold', color: 'white' })}>{m.name}</span>
                     <span className={css({ fontSize: 'xs', color: 'gray.500' })}>{new Date(m.submittedAt).toLocaleDateString()}</span>
                  </div>
                  <p className={css({ fontSize: 'xs', color: 'secondary', mb: 2 })}>{m.email}</p>
                  <p className={css({ fontSize: 'sm', color: 'gray.300' })}>{m.message}</p>
                </div>
              ))}
            </div>
          )}

          {/* Chat Messages List */}
          {activeTab === 'chat' && !loading && (
            <div className={css({ display: 'flex', flexDir: 'column', gap: 4 })}>
              
              {chatError && (
                <div className={css({ bg: 'rgba(255,152,0,0.1)', p: 5, rounded: 'xl', borderLeft: '3px solid #ff9800', mb: 2 })}>
                  <p className={css({ color: '#ff9800', fontWeight: 'bold', fontSize: 'sm', mb: 1 })}>⚠️ Configuração Pendente no Appwrite</p>
                  <p className={css({ color: 'gray.300', fontSize: 'xs' })}>A coleção <code className={css({ color: 'primary' })}>{'chat_messages'}</code> não foi encontrada no banco <code className={css({ color: 'primary' })}>{'main'}</code>.</p>
                  <p className={css({ color: 'gray.400', fontSize: 'xs', mt: 1 })}>Para ativar os logs, crie a coleção no seu Appwrite Dashboard com os atributos: <code className={css({ color: 'secondary' })}>{'prompt'}</code> (string) e <code className={css({ color: 'secondary' })}>{'response'}</code> (string/textarea).</p>
                </div>
              )}

              {chatMessages.length === 0 && !chatError && <p className={css({ color: 'gray.500', fontSize: 'sm' })}>Nenhum log de chat registrado.</p>}
              {chatMessages.map((m) => (
                <div key={m.$id} className={css({ bg: '#121212', p: 5, rounded: 'xl', borderLeft: '3px solid token(colors.primary)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' })}>
                  <div className={css({ flex: 1, pr: 4 })}>
                    <div className={css({ display: 'flex', justifyContent: 'space-between', mb: 1 })}>
                       <span className={css({ fontSize: 'xs', color: 'gray.500' })}>{new Date(m.submittedAt).toLocaleString('pt-BR')}</span>
                    </div>
                    <p className={css({ fontSize: 'xs', color: 'primary', fontWeight: 'bold', mb: 1 })}>Visitante:</p>
                    <p className={css({ fontSize: 'sm', color: 'white', mb: 3 })}>{m.prompt}</p>
                    
                    <p className={css({ fontSize: 'xs', color: 'secondary', fontWeight: 'bold', mb: 1 })}>IA Response:</p>
                    <p className={css({ fontSize: 'sm', color: 'gray.300' })}>{m.response}</p>
                  </div>
                  <button 
                    onClick={() => handleDelete('chat', m.$id)} 
                    className={css({ p: 2, bg: 'rgba(255,0,0,0.1)', color: '#ff4444', rounded: 'md', cursor: 'pointer', fontSize: 'xs', ml: 4, height: 'fit-content' })}
                  >
                    Excluir
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Projects Management */}
          {activeTab === 'projects' && !loading && (
            <div className={css({ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 8 })}>
              <form onSubmit={handleSaveProject} className={css({ bg: '#141414', p: 6, rounded: 'xl', display: 'flex', flexDir: 'column', gap: 4, height: 'fit-content' })}>
                <h3 className={css({ fontWeight: 'bold', color: 'white' })}>{editId ? 'Editar Projeto' : 'Adicionar Projeto'}</h3>
                <input required value={newProject.title} onChange={e=>setNewProject({...newProject, title:e.target.value})} placeholder="Título" className={css({ bg: '#1a1a1a', p: 3, rounded: 'md', border: 'none', color: 'white' })}/>
                <select value={newProject.category} onChange={e=>setNewProject({...newProject, category:e.target.value})} className={css({ bg: '#1a1a1a', p: 3, rounded: 'md', border: 'none', color: 'white' })}>
                   <option value="Sistemas">Sistemas</option>
                   <option value="IA">IA & Automação</option>
                </select>
                <input required value={newProject.node} onChange={e=>setNewProject({...newProject, node:e.target.value})} placeholder="Subtítulo / Nó (Ex: Automação, Finanças)" className={css({ bg: '#1a1a1a', p: 3, rounded: 'md', border: 'none', color: 'white' })}/>
                <textarea required value={newProject.description} onChange={e=>setNewProject({...newProject, description:e.target.value})} placeholder="Descrição" className={css({ bg: '#1a1a1a', p: 3, rounded: 'md', border: 'none', color: 'white', h: 32 })}/>
                <input value={newProject.link} onChange={e=>setNewProject({...newProject, link:e.target.value})} placeholder="Link do Projeto" className={css({ bg: '#1a1a1a', p: 3, rounded: 'md', border: 'none', color: 'white' })}/>
                <input value={newProject.github} onChange={e=>setNewProject({...newProject, github:e.target.value})} placeholder="Link GitHub" className={css({ bg: '#1a1a1a', p: 3, rounded: 'md', border: 'none', color: 'white' })}/>
                
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
                      } catch { toast.error('Erro no upload'); }
                      finally { setUploading(false); }
                    }} 
                  />
                  {uploading && <span className={css({ fontSize: 'xs', color: 'primary', mt: 1, display: 'block' })}>Enviando...</span>}
                  {newProject.image && <p className={css({ fontSize: '10px', color: 'gray.500', mt: 1, textOverflow: 'ellipsis', overflow: 'hidden' })}>{newProject.image}</p>}
                </div>

                <button type="submit" className={css({ bg: 'primary', p: 3, rounded: 'md', fontWeight: 'bold', color: 'black', cursor: 'pointer' })} disabled={uploading}>{editId ? 'Salvar Alterações' : 'Salvar'}</button>
                {editId && <button type="button" onClick={() => { setEditId(null); setNewProject({ title: '', description: '', link: '', github: '', category: 'Sistemas', node: '', image: '' }) }} className={css({ bg: 'rgba(255,255,255,0.05)', p: 2, rounded: 'md', fontSize: 'xs', cursor: 'pointer' })}>Cancelar</button>}
              </form>
              <div className={css({ display: 'flex', flexDir: 'column', gap: 4 })}>
                  {projects.map(p => (
                    <div key={p.$id} className={css({ bg: '#141414', p: 5, rounded: 'xl', display: 'flex', justifyContent: 'space-between', alignItems: 'center' })}>
                      <div><p className={css({ fontWeight: 'bold', color: 'white' })}>{p.title}</p></div>
                      <div className={css({ display: 'flex', gap: 2 })}>
                        <button onClick={() => { setEditId(p.$id); setNewProject({ title: p.title, description: p.description, link: p.link || '', github: p.github || '', category: p.category || 'Sistemas', node: p.node || '', image: p.image || '' }) }} className={css({ p: 2, bg: 'rgba(0,230,118,0.1)', color: 'primary', rounded: 'md', cursor: 'pointer', fontSize: 'xs' })}>Editar</button>
                        <button onClick={()=>handleDelete('project', p.$id)} className={css({ p: 2, bg: 'rgba(255,0,0,0.1)', color: '#ff4444', rounded: 'md', cursor: 'pointer', fontSize: 'xs' })}>Excluir</button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Skills Management */}
          {activeTab === 'skills' && !loading && (
            <div className={css({ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 8 })}>
              <form onSubmit={handleSaveSkill} className={css({ bg: '#141414', p: 6, rounded: 'xl', display: 'flex', flexDir: 'column', gap: 4, height: 'fit-content' })}>
                <h3 className={css({ fontWeight: 'bold', color: 'white' })}>{editId ? 'Editar Habilidade' : 'Adicionar Habilidade'}</h3>
                <input required value={newSkill.name} onChange={e=>setNewSkill({...newSkill, name:e.target.value})} placeholder="Nome (Ex: Node.js)" className={css({ bg: '#1a1a1a', p: 3, rounded: 'md', border: 'none', color: 'white' })}/>
                <select value={newSkill.category} onChange={e=>setNewSkill({...newSkill, category:e.target.value})} className={css({ bg: '#1a1a1a', p: 3, rounded: 'md', border: 'none', color: 'white' })}>
                   <option value="Backend & APIs">Backend & APIs</option>
                   <option value="Frontend & UX">Frontend & UX</option>
                   <option value="IA & Automação">IA & Automação</option>
                   <option value="Mobile & Cloud">Mobile & Cloud</option>
                </select>
                <input required value={newSkill.value} onChange={e=>setNewSkill({...newSkill, value:e.target.value})} placeholder="Porcentagem (Ex: 95%)" className={css({ bg: '#1a1a1a', p: 3, rounded: 'md', border: 'none', color: 'white' })}/>
                <button type="submit" className={css({ bg: 'secondary', p: 3, rounded: 'md', fontWeight: 'bold', color: 'white', cursor: 'pointer' })}>{editId ? 'Salvar Alterações' : 'Salvar'}</button>
                {editId && <button type="button" onClick={() => { setEditId(null); setNewSkill({ name: '', category: 'Backend & APIs', value: '90%' }) }} className={css({ bg: 'rgba(255,255,255,0.05)', p: 2, rounded: 'md', fontSize: 'xs', cursor: 'pointer' })}>Cancelar</button>}
              </form>
              <div className={css({ display: 'flex', flexDir: 'column', gap: 3 })}>
                 {skills.map(s => (
                   <div key={s.$id} className={css({ bg: '#141414', p: 4, rounded: 'xl', display: 'flex', justifyContent: 'space-between', alignItems: 'center' })}>
                     <div><p className={css({ color: 'white', fontSize: 'sm' })}>{s.name} <span className={css({ color: 'secondary', fontSize: '10px', ml: 2 })}>{s.category}</span></p></div>
                     <div className={css({ display: 'flex', gap: 2 })}>
                        <button onClick={() => { setEditId(s.$id); setNewSkill({ name: s.name, category: s.category, value: s.value }) }} className={css({ p: 2, bg: 'rgba(0,230,118,0.1)', color: 'primary', rounded: 'md', cursor: 'pointer', fontSize: 'xs' })}>Editar</button>
                        <button onClick={()=>handleDelete('skill', s.$id)} className={css({ p: 2, bg: 'rgba(255,0,0,0.1)', color: '#ff4444', rounded: 'md', cursor: 'pointer', fontSize: 'xs' })}>Excluir</button>
                     </div>
                   </div>
                 ))}
              </div>
            </div>
          )}

          {/* About Management */}
          {activeTab === 'about' && !loading && (
            <form onSubmit={handleSaveAbout} className={css({ bg: '#141414', p: 6, rounded: 'xl', display: 'flex', flexDir: 'column', gap: 4, maxW: '3xl' })}>
              <h3 className={css({ fontWeight: 'bold', color: 'white' })}>Informações do Sobre</h3>
              
              <div>
                <label className={css({ color: 'gray.400', fontSize: 'xs' })}>Nome de Exibição</label>
                <input required value={(about as any).name || ''} onChange={e=>setAbout({ ...about, name: e.target.value } as any)} className={css({ w: 'full', bg: '#1a1a1a', p: 3, rounded: 'md', border: 'none', color: 'white', mt: 1 })}/>
              </div>

              <div>
                <label className={css({ color: 'gray.400', fontSize: 'xs' })}>Cargo / Especialidade</label>
                <input required value={(about as any).role || ''} onChange={e=>setAbout({ ...about, role: e.target.value } as any)} className={css({ w: 'full', bg: '#1a1a1a', p: 3, rounded: 'md', border: 'none', color: 'white', mt: 1 })} placeholder="Ex: Sênior Full Stack & IA"/>
              </div>

              <div>
                <label className={css({ color: 'gray.400', fontSize: 'xs' })}>Título Principal</label>
                <input required value={about.title} onChange={e=>setAbout({...about, title:e.target.value})} className={css({ w: 'full', bg: '#1a1a1a', p: 3, rounded: 'md', border: 'none', color: 'white', mt: 1 })}/>
              </div>
              <div>
                <label className={css({ color: 'gray.400', fontSize: 'xs' })}>Subtítulo</label>
                <input required value={about.subtitle} onChange={e=>setAbout({...about, subtitle:e.target.value})} className={css({ w: 'full', bg: '#1a1a1a', p: 3, rounded: 'md', border: 'none', color: 'white', mt: 1 })}/>
              </div>
              <div>
                <label className={css({ color: 'gray.400', fontSize: 'xs' })}>Biografia (Bio)</label>
                <textarea rows={6} required value={about.bio} onChange={e=>setAbout({...about, bio:e.target.value})} className={css({ w: 'full', bg: '#1a1a1a', p: 3, rounded: 'md', border: 'none', color: 'white', mt: 1, resize: 'none' })}/>
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
                {(about as any).imageUrl && <p className={css({ fontSize: '10px', color: 'gray.500', mt: 1 })}>{(about as any).imageUrl}</p>}
              </div>

              <button type="submit" className={css({ bg: 'primary', p: 3, rounded: 'md', fontWeight: 'bold', color: 'black', cursor: 'pointer', mt: 2 })} disabled={uploading}>Salvar Alterações</button>
            </form>
          )}

          {/* Certifications Management */}
          {activeTab === 'certifications' && !loading && (
            <div className={css({ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 8 })}>
              <form onSubmit={handleSaveCert} className={css({ bg: '#141414', p: 6, rounded: 'xl', display: 'flex', flexDir: 'column', gap: 4, height: 'fit-content' })}>
                 <div className={css({ display: 'flex', justifyContent: 'space-between', alignItems: 'center' })}>
                   <h3 className={css({ fontWeight: 'bold', color: 'white' })}>{editId ? 'Editar Certificado' : 'Adicionar Certificado'}</h3>
                   <button type="button" onClick={handleSeedCerts} className={css({ bg: 'rgba(0,230,118,0.1)', color: 'primary', px: 3, py: 1, rounded: 'md', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer', border: '1px solid rgba(0,230,118,0.3)', _hover: { bg: 'rgba(0,230,118,0.2)' } })}>Importar Mocks</button>
                 </div>
                <input required value={newCert.title} onChange={e=>setNewCert({...newCert, title:e.target.value})} placeholder="Título da Certificação" className={css({ bg: '#1a1a1a', p: 3, rounded: 'md', border: 'none', color: 'white' })}/>
                <input required value={newCert.issuer} onChange={e=>setNewCert({...newCert, issuer:e.target.value})} placeholder="Emissor (Ex: AWS, Google)" className={css({ bg: '#1a1a1a', p: 3, rounded: 'md', border: 'none', color: 'white' })}/>
                <select value={newCert.category} onChange={e=>setNewCert({...newCert, category:e.target.value})} className={css({ bg: '#1a1a1a', p: 3, rounded: 'md', border: 'none', color: 'white' })}>
                    <option value="DevSecOps & Cloud">DevSecOps & Cloud</option>
                    <option value="Dados & IA">Dados & IA</option>
                    <option value="Segurança da Informação">Segurança da Informação</option>
                    <option value="Geral">Geral</option>
                </select>
                <input required value={newCert.date} onChange={e=>setNewCert({...newCert, date:e.target.value})} placeholder="Data (Ex: Jan 2025)" className={css({ bg: '#1a1a1a', p: 3, rounded: 'md', border: 'none', color: 'white' })}/>
                <input value={newCert.link || ''} onChange={e=>setNewCert({...newCert, link:e.target.value})} placeholder="Link do Certificado (Opcional)" className={css({ bg: '#1a1a1a', p: 3, rounded: 'md', border: 'none', color: 'white' })}/>
                <button type="submit" className={css({ bg: 'secondary', p: 3, rounded: 'md', fontWeight: 'bold', color: 'white', cursor: 'pointer' })}>{editId ? 'Salvar Alterações' : 'Salvar'}</button>
                {editId && <button type="button" onClick={() => { setEditId(null); setNewCert({ title: '', issuer: '', date: '', link: '', category: 'Geral' }) }} className={css({ bg: 'rgba(255,255,255,0.05)', p: 2, rounded: 'md', fontSize: 'xs', cursor: 'pointer' })}>Cancelar</button>}
              </form>
              <div className={css({ display: 'flex', flexDir: 'column', gap: 3 })}>
                 {certifications.map(c => (
                   <div key={c.$id} className={css({ bg: '#141414', p: 4, rounded: 'xl', display: 'flex', justifyContent: 'space-between', alignItems: 'center' })}>
                     <div>
                       <p className={css({ color: 'white', fontSize: 'sm', fontWeight: 'bold' })}>{c.title}</p>
                       <p className={css({ color: 'gray.400', fontSize: 'xs' })}>{c.issuer} • {c.date} <span className={css({ color: 'secondary', ml: 1 })}>({c.category || 'Geral'})</span></p>
                     </div>
                     <div className={css({ display: 'flex', gap: 2 })}>
                        <button onClick={() => { setEditId(c.$id); setNewCert({ title: c.title, issuer: c.issuer, date: c.date, link: c.link || '', category: c.category || 'Geral' }) }} className={css({ p: 2, bg: 'rgba(0,230,118,0.1)', color: 'primary', rounded: 'md', cursor: 'pointer', fontSize: 'xs' })}>Editar</button>
                        <button onClick={()=>handleDelete('cert', c.$id)} className={css({ p: 2, bg: 'rgba(255,0,0,0.1)', color: '#ff4444', rounded: 'md', cursor: 'pointer', fontSize: 'xs' })}>Excluir</button>
                     </div>
                   </div>
                 ))}
                  {certifications.length === 0 && (
                     <p className={css({ color: 'gray.500', fontSize: 'sm', fontStyle: 'italic', mt: 4 })}>Nenhuma certificação cadastrada.</p>
                  )}
              </div>
            </div>
          )}
          {/* Experiences Management */}
          {activeTab === 'experiences' && !loading && (
            <div className={css({ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 8 })}>
              <form onSubmit={handleSaveExperience} className={css({ bg: '#141414', p: 6, rounded: 'xl', display: 'flex', flexDir: 'column', gap: 4, height: 'fit-content' })}>
                <h3 className={css({ fontWeight: 'bold', color: 'white' })}>{editId ? 'Editar Trajetória' : 'Adicionar Trajetória'}</h3>
                <select value={newExperience.type} onChange={e=>setNewExperience({...newExperience, type:e.target.value})} className={css({ bg: '#1a1a1a', p: 3, rounded: 'md', border: 'none', color: 'white' })}>
                    <option value="Trabalho">Experiência Profissional</option>
                    <option value="Acadêmico">Formação Acadêmica</option>
                </select>
                <input required value={newExperience.title} onChange={e=>setNewExperience({...newExperience, title:e.target.value})} placeholder="Título / Cargo (Ex: Software Engineer)" className={css({ bg: '#1a1a1a', p: 3, rounded: 'md', border: 'none', color: 'white' })}/>
                <input required value={newExperience.institution} onChange={e=>setNewExperience({...newExperience, institution:e.target.value})} placeholder="Instituição / Empresa" className={css({ bg: '#1a1a1a', p: 3, rounded: 'md', border: 'none', color: 'white' })}/>
                <input required value={newExperience.period} onChange={e=>setNewExperience({...newExperience, period:e.target.value})} placeholder="Período (Ex: 2022 - Presente)" className={css({ bg: '#1a1a1a', p: 3, rounded: 'md', border: 'none', color: 'white' })}/>
                <textarea required value={newExperience.description} onChange={e=>setNewExperience({...newExperience, description:e.target.value})} placeholder="Descrição geral" className={css({ bg: '#1a1a1a', p: 3, rounded: 'md', border: 'none', color: 'white', h: 24, resize: 'none' })}/>
                <textarea value={newExperience.activities} onChange={e=>setNewExperience({...newExperience, activities:e.target.value})} placeholder="Atividades (Uma por linha)" className={css({ bg: '#1a1a1a', p: 3, rounded: 'md', border: 'none', color: 'white', h: 32, resize: 'none' })}/>
                <button type="submit" className={css({ bg: 'primary', p: 3, rounded: 'md', fontWeight: 'bold', color: 'black', cursor: 'pointer' })}>Salvar</button>
                {editId && <button type="button" onClick={() => { setEditId(null); setNewExperience({ type: 'Trabalho', title: '', institution: '', period: '', description: '', activities: '' }) }} className={css({ bg: 'rgba(255,255,255,0.05)', p: 2, rounded: 'md', fontSize: 'xs', cursor: 'pointer' })}>Cancelar</button>}
              </form>

              <div className={css({ display: 'flex', flexDir: 'column', gap: 3 })}>
                 {experiences.map(e => (
                   <div key={e.$id} className={css({ bg: '#141414', p: 4, rounded: 'xl', display: 'flex', justifyContent: 'space-between', alignItems: 'center' })}>
                     <div>
                       <p className={css({ color: 'white', fontSize: 'sm', fontWeight: 'bold' })}>{e.title}</p>
                       <p className={css({ color: 'gray.400', fontSize: 'xs' })}>{e.institution} • {e.period} <span className={css({ color: 'primary', ml: 1 })}>({e.type})</span></p>
                     </div>
                     <div className={css({ display: 'flex', gap: 2 })}>
                        <button onClick={() => { setEditId(e.$id); setNewExperience({ type: e.type, title: e.title, institution: e.institution, period: e.period, description: e.description, activities: e.activities || '' }) }} className={css({ p: 2, bg: 'rgba(0,230,118,0.1)', color: 'primary', rounded: 'md', cursor: 'pointer', fontSize: 'xs' })}>Editar</button>
                        <button onClick={()=>handleDelete('experience', e.$id)} className={css({ p: 2, bg: 'rgba(255,0,0,0.1)', color: '#ff4444', rounded: 'md', cursor: 'pointer', fontSize: 'xs' })}>Excluir</button>
                     </div>
                   </div>
                 ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
