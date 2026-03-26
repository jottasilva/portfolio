import re

filepath_page = r"d:\Projetos\portfolio2026\Portfolio 2026\neon-portfolio\src\app\painel\page.tsx"

with open(filepath_page, 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Remove handleSeedCerts logic
seed_regex = r"const handleSeedCerts = async \(\) => \{.+?loadData\(\);\n    \} catch \{ toast\.error\('Erro ao importar'\); \}\n  \};\n"
code = re.sub(seed_regex, "", code, flags=re.DOTALL)

# 2. Remove "Importar Mocks" button
button_regex = r"<button onClick=\{handleSeedCerts\}.+?Importar Mocks\n\s*</button>"
code = re.sub(button_regex, "", code, flags=re.DOTALL)

# 3. Add handleImageUpload
image_upload_fn = """  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      toast.loading('Fazendo upload da imagem...', { id: 'upload' });
      const url = await supabaseService.uploadImage(file);
      if (url) {
        setNewProject({ ...newProject, image_url: url });
        toast.success('Upload concluído!', { id: 'upload' });
      } else {
        toast.error('Erro no upload. Verifique as políticas do Storage no Supabase.', { id: 'upload' });
      }
    } catch {
      toast.error('Erro inesperado no upload', { id: 'upload' });
    }
  };
"""

code = code.replace(
    "const handleSaveProject = async (e: React.FormEvent) => {",
    image_upload_fn + "\n  const handleSaveProject = async (e: React.FormEvent) => {"
)

# 4. Add file upload UI to Projects form
old_image_input = """<input value={newProject.image_url} onChange={e => setNewProject({...newProject, image_url: e.target.value})} placeholder="URL da Imagem de Capa" className={css({ bg: '#0e0e0e', p: 3, rounded: '8px', border: '1px solid rgba(255,255,255,0.05)', color: 'white' })} />"""

new_image_input = """<div className={css({ display: 'flex', gap: 2, alignItems: 'center' })}>
              <input value={newProject.image_url} onChange={e => setNewProject({...newProject, image_url: e.target.value})} placeholder="URL da Imagem de Capa" className={css({ flex: 1, bg: '#0e0e0e', p: 3, rounded: '8px', border: '1px solid rgba(255,255,255,0.05)', color: 'white', outline: 'none', _focus: { border: '1px solid token(colors.primary)' } })} />
              <label title="Fazer Upload de Imagem" className={css({ bg: '#161616', p: 3, rounded: '8px', border: '1px solid rgba(255,255,255,0.05)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', _hover: { borderColor: 'primary', color: 'primary' } })}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleImageUpload} className={css({ display: 'none' })} />
              </label>
            </div>
            {newProject.image_url && <img src={newProject.image_url} alt="Preview" className={css({ w: 'full', h: 32, objectFit: 'cover', rounded: '8px', border: '1px solid rgba(255,255,255,0.05)' })} />}"""

code = code.replace(old_image_input, new_image_input)

with open(filepath_page, 'w', encoding='utf-8') as f:
    f.write(code)


# 5. Add uploadImage method to supabaseService.ts
filepath_service = r"d:\Projetos\portfolio2026\Portfolio 2026\neon-portfolio\src\domain\services\supabaseService.ts"

with open(filepath_service, 'r', encoding='utf-8') as f:
    scode = f.read()

upload_fn = """  /**
   * Armazenamento (Storage)
   */
  async uploadImage(file: File): Promise<string | null> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { data, error } = await supabase.storage
        .from('images')
        .upload(filePath, file, { cacheControl: '3600', upsert: false });

      if (error) {
        console.error('Erro detalhado do upload:', error);
        throw error;
      }

      const { data: publicUrlData } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      return publicUrlData.publicUrl;
    } catch (error) {
      console.error('Erro ao fazer upload para o Supabase Storage:', error);
      return null;
    }
  },

  /**
   * 1. CRUD Contatos (Contacts)
   */"""

scode = scode.replace("  /**\n   * 1. CRUD Contatos (Contacts)", upload_fn)

with open(filepath_service, 'w', encoding='utf-8') as f:
    f.write(scode)

# Update SQL policy doc to include storage policy
sql_path = r"d:\Projetos\portfolio2026\Portfolio 2026\neon-portfolio\security_rls_policies.sql"
with open(sql_path, 'a', encoding='utf-8') as f:
    f.write("\n\n-- ==========================================\n")
    f.write("-- 6. POLÍTICA DE STORAGE (UPLOAD DE IMAGENS)\n")
    f.write("-- ==========================================\n")
    f.write("-- Permite upload de arquivos no bucket 'images' apenas para usuários autenticados\n")
    f.write("CREATE POLICY \"Enable insert for authenticated users only on images bucket\"\n")
    f.write("ON storage.objects FOR INSERT\n")
    f.write("TO authenticated\n")
    f.write("WITH CHECK (bucket_id = 'images');\n")

print("Rewrites done")
