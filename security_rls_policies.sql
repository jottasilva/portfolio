-- ==========================================
-- SCRIPT DE SEGURANÇA E CORREÇÃO DE POLÍTICAS (RLS)
-- ==========================================
-- Este script resolve a falha (A01: Broken Access Control) fechando 
-- a habilidade de visitantes não autorizados criar, editar ou apagar dados no banco.
-- IMPORTANTE: Execute este script no SQL Editor do seu Supabase.

-- 1. ATIVAR RLS EM TODAS AS TABELAS SENSÍVEIS (Proteção Default)
ALTER TABLE about ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- 2. POLÍTICAS DE SELECT (LEITURA PÚBLICA PARA O SITE FUNCIONAR)
DROP POLICY IF EXISTS "Leitura Pública About" ON about;
CREATE POLICY "Leitura Pública About" ON about FOR SELECT USING (true);

DROP POLICY IF EXISTS "Leitura Pública Projects" ON projects;
CREATE POLICY "Leitura Pública Projects" ON projects FOR SELECT USING (true);

DROP POLICY IF EXISTS "Leitura Pública Skills" ON skills;
CREATE POLICY "Leitura Pública Skills" ON skills FOR SELECT USING (true);

DROP POLICY IF EXISTS "Leitura Pública Experiences" ON experiences;
CREATE POLICY "Leitura Pública Experiences" ON experiences FOR SELECT USING (true);

DROP POLICY IF EXISTS "Leitura Pública Certifications" ON certifications;
CREATE POLICY "Leitura Pública Certifications" ON certifications FOR SELECT USING (true);

-- 3. POLÍTICAS DE MUTAÇÃO RESTRICTA (APENAS ADMINISTRADOR LOGADO NO SUPABASE AUTH)
-- Só permite edição se o usuário tiver sessão ativa (auth.role() = 'authenticated')

-- Projects
DROP POLICY IF EXISTS "Admin Modifica Projects" ON projects;
CREATE POLICY "Admin Modifica Projects" ON projects FOR ALL USING (auth.role() = 'authenticated');

-- Skills
DROP POLICY IF EXISTS "Admin Modifica Skills" ON skills;
CREATE POLICY "Admin Modifica Skills" ON skills FOR ALL USING (auth.role() = 'authenticated');

-- Experiences
DROP POLICY IF EXISTS "Admin Modifica Experiences" ON experiences;
CREATE POLICY "Admin Modifica Experiences" ON experiences FOR ALL USING (auth.role() = 'authenticated');

-- Certifications
DROP POLICY IF EXISTS "Admin Modifica Certifications" ON certifications;
CREATE POLICY "Admin Modifica Certifications" ON certifications FOR ALL USING (auth.role() = 'authenticated');

-- About
DROP POLICY IF EXISTS "Admin Modifica About" ON about;
CREATE POLICY "Admin Modifica About" ON about FOR ALL USING (auth.role() = 'authenticated');

-- Contacts (Visitantes inserem, Admin exclui/visualiza)
DROP POLICY IF EXISTS "Visitante Insere Contato" ON contacts;
CREATE POLICY "Visitante Insere Contato" ON contacts FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Admin Visualiza e Modifica Contato" ON contacts;
CREATE POLICY "Admin Visualiza e Modifica Contato" ON contacts FOR SELECT USING (auth.role() = 'authenticated');

-- Chat Messages (Visitantes inserem/lêem os últimos, Admin apaga)
DROP POLICY IF EXISTS "Visitante Insere Chat" ON chat_messages;
CREATE POLICY "Visitante Insere Chat" ON chat_messages FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Leitura Chat" ON chat_messages;
CREATE POLICY "Leitura Chat" ON chat_messages FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin Modifica Chat" ON chat_messages;
CREATE POLICY "Admin Modifica Chat" ON chat_messages FOR UPDATE USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Admin Apaga Chat" ON chat_messages;
CREATE POLICY "Admin Apaga Chat" ON chat_messages FOR DELETE USING (auth.role() = 'authenticated');

-- 4. TABELA DE RATE LIMIT (Anti-Flood da API A02)
CREATE TABLE IF NOT EXISTS api_rate_limits (
    ip TEXT PRIMARY KEY,
    last_request_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    request_count INT DEFAULT 1
);
ALTER TABLE api_rate_limits ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "API Anon Limits" ON api_rate_limits;
CREATE POLICY "API Anon Limits" ON api_rate_limits FOR ALL USING (true);


-- ==========================================
-- 6. POLÍTICA DE STORAGE (UPLOAD DE IMAGENS)
-- ==========================================
-- Permite upload de arquivos no bucket 'images' apenas para usuários autenticados
CREATE POLICY "Enable insert for authenticated users only on images bucket"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'images');
