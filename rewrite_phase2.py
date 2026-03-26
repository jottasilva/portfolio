import re

filepath = r"d:\Projetos\portfolio2026\Portfolio 2026\neon-portfolio\src\app\painel\page.tsx"

with open(filepath, 'r', encoding='utf-8') as f:
    code = f.read()

# Replace Theme Colors globally
code = code.replace("bg: '#0F172A'", "bg: '#0e0e0e'")
code = code.replace("bg: '#1E293B'", "bg: '#161616'")

# Improve input borders everywhere
code = code.replace("border: 'none'", "border: '1px solid rgba(255,255,255,0.05)'")

# Add newContact state
code = code.replace(
    "const [newExperience, setNewExperience] = useState({ type: 'Trabalho', title: '', institution: '', period: '', description: '', activities: '' });",
    "const [newExperience, setNewExperience] = useState({ type: 'Trabalho', title: '', institution: '', period: '', description: '', activities: '' });\n  const [newContact, setNewContact] = useState({ name: '', email: '', message: '' });"
)

# Update deleteItem types
code = code.replace(
    "const [deleteItem, setDeleteItem] = useState<{ type: 'project' | 'skill' | 'cert' | 'experience' | 'chat'; id: string } | null>(null);",
    "const [deleteItem, setDeleteItem] = useState<{ type: 'project' | 'skill' | 'cert' | 'experience' | 'chat' | 'contact'; id: string } | null>(null);"
)

code = code.replace(
    "const triggerDelete = (type: 'project' | 'skill' | 'cert' | 'experience' | 'chat', id: string) => {",
    "const triggerDelete = (type: 'project' | 'skill' | 'cert' | 'experience' | 'chat' | 'contact', id: string) => {"
)

# Update confirmDelete
old_confirm = """      if (type === 'project') await supabaseService.deleteProject(id);
      else if (type === 'skill') await supabaseService.deleteSkill(id);
      else if (type === 'cert') await supabaseService.deleteCertification(id);
      else if (type === 'chat') await supabaseService.deleteChatMessage(id);
      else await supabaseService.deleteExperience(id);"""

new_confirm = """      if (type === 'project') await supabaseService.deleteProject(id);
      else if (type === 'skill') await supabaseService.deleteSkill(id);
      else if (type === 'cert') await supabaseService.deleteCertification(id);
      else if (type === 'chat') await supabaseService.deleteChatMessage(id);
      else if (type === 'contact') await supabaseService.deleteContactMessage(id);
      else await supabaseService.deleteExperience(id);"""

code = code.replace(old_confirm, new_confirm)

# Add handleSaveContact
save_contact_fn = """  const handleSaveContact = async (e: React.FormEvent) => {
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
"""

code = code.replace(
    "const handleSaveSkill = async (e: React.FormEvent) => {",
    save_contact_fn + "\n  const handleSaveSkill = async (e: React.FormEvent) => {"
)

# Replace Messages Tab Content
messages_old = """          {/* Messages List */}
          {activeTab === 'messages' && !loading && (
            <div className={css({ display: 'flex', flexDir: 'column', gap: 4 })}>
              {messages.map((m) => (
                <div key={m.id} className={css({ bg: '#161616', p: 5, rounded: '8px', borderLeft: '3px solid token(colors.secondary)' })}>
                  <div className={css({ display: 'flex', justifyContent: 'space-between', mb: 2 })}>
                     <span className={css({ fontWeight: 'bold', color: 'white' })}>{m.name}</span>
                     <span className={css({ fontSize: 'xs', color: 'gray.500' })}>{new Date(m.submitted_at).toLocaleDateString()}</span>
                  </div>
                  <p className={css({ fontSize: 'xs', color: 'secondary', mb: 2 })}>{m.email}</p>
                  <p className={css({ fontSize: 'sm', color: 'gray.300' })}>{m.message}</p>
                </div>
              ))}
            </div>
          )}"""

messages_new = """          {/* Messages List */}
          {activeTab === 'messages' && !loading && (
            <div className={css({ display: 'flex', flexDir: 'column', gap: 6 })}>
              <div className={css({ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 })}>
                <p className={css({ color: 'gray.400', fontSize: 'sm' })}>{messages.length} mensagens de contato</p>
              </div>

              <div className={css({ display: 'flex', flexDir: 'column', gap: 4 })}>
                {messages.length === 0 && <p className={css({ color: 'gray.500', fontSize: 'sm', fontStyle: 'italic' })}>Nenhuma mensagem recebida.</p>}
                
                {messages.map((m) => (
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
          )}"""

code = code.replace(messages_old, messages_new)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(code)

# We also need to change Modal.tsx background to matching #111111
modal_path = r"d:\Projetos\portfolio2026\Portfolio 2026\neon-portfolio\src\presentation\components\Modal.tsx"
with open(modal_path, 'r', encoding='utf-8') as mf:
    mcode = mf.read()
    
mcode = mcode.replace("bg: '#141414'", "bg: '#111111'")

with open(modal_path, 'w', encoding='utf-8') as mf:
    mf.write(mcode)

print("Done phase 2 rewrites.")
