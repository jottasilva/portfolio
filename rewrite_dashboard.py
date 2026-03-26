import os
import re

filepath = r"d:\Projetos\portfolio2026\Portfolio 2026\neon-portfolio\src\app\painel\page.tsx"

with open(filepath, 'r', encoding='utf-8') as f:
    code = f.read()

# I need to add state for mobile menu
code = re.sub(
    r"(const \[activeTab, setActiveTab\] = useState.*?;)",
    r"\1\n  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);\n",
    code
)

# I need to reset mobile menu on tab switch
code = re.sub(
    r"(useEffect\(\(\) => \{\n\s*loadData\(\);\n\s*\}, \[activeTab\]\);)",
    r"useEffect(() => {\n    setIsMobileMenuOpen(false);\n    loadData();\n  }, [activeTab]);",
    code
)

# Now extract everything before `  return (`
idx = code.find("  return (")

before_return = code[:idx]

new_return = """  return (
    <div className={css({ display: 'flex', minH: '100vh', bg: '#0F172A', fontFamily: 'body' })}>
      
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
        w: '260px', bg: '#1E293B',
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
            <button onClick={() => setIsMobileMenuOpen(true)} className={css({ display: { base: 'flex', lg: 'none' }, color: 'white', alignItems: 'center', justifyContent: 'center', p: 2, bg: '#1E293B', rounded: '8px', cursor: 'pointer' })}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
            <h1 className={css({ fontFamily: 'headline', fontSize: { base: '2xl', lg: '3xl' }, fontWeight: 'bold', color: 'white' })}>
              {activeTab === 'overview' ? 'Visão Geral' : activeTab === 'messages' ? 'Mensagens' : activeTab === 'chat' ? 'Conversas AI' : activeTab === 'projects' ? 'Projetos' : activeTab === 'skills' ? 'Habilidades' : activeTab === 'about' ? 'Sobre' : activeTab === 'certifications' ? 'Certificações' : 'Trajetória'}
            </h1>
          </div>

          <div className={css({ display: { base: 'none', md: 'flex' }, alignItems: 'center', gap: 6 })}>
             <div className={css({ position: 'relative' })}>
               <input type="text" placeholder="Searching" className={css({ bg: '#1E293B', color: 'white', rounded: 'full', pl: 4, pr: 10, py: 2, fontSize: 'sm', outline: 'none', w: '250px' })} />
               <svg className={css({ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'gray.500' })} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
             </div>
             <div className={css({ display: 'flex', gap: 4, color: 'gray.400' })}>
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
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
                  <div className={css({ bg: '#1E293B', p: 6, rounded: '16px', border: '1px solid rgba(255,255,255,0.05)' })}>
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
                  <div className={css({ bg: '#1E293B', p: 6, rounded: '16px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' })}>
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
                  <div className={css({ bg: '#1E293B', p: 6, rounded: '16px', border: '1px solid rgba(255,255,255,0.05)' })}>
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
"""

rest_tabs = code[code.find("{/* Messages List */}"):]

# Dark theme overrides for forms/components
rest_tabs = rest_tabs.replace("'#121212'", "'#1E293B'").replace("'#141414'", "'#1E293B'").replace("'#1a1a1a'", "'#0F172A'")
rest_tabs = rest_tabs.replace("rounded: '2px'", "rounded: '8px'")

end_index = rest_tabs.find("        {/* Modais de Confirmação */}")
modals = rest_tabs[end_index:]

final_code = before_return + new_return + "\n            " + rest_tabs[:end_index] + "          </motion.div>\n        </div>\n\n" + modals[:-7] + "        </div>\n      </div>\n    </div>\n  );\n}\n"

with open(filepath, 'w', encoding='utf-8') as fw:
    fw.write(final_code)
