-- ========================================================
-- 🔧 SQL FIX: Habilitar Edições via Painel (Usuários Autenticados)
-- Cole este script no SQL Editor do seu Supabase Studio e Execute.
-- ========================================================

-- 1. Skills (Habilidades)
DROP POLICY IF EXISTS "Escrita Autenticada Skills" ON skills;
CREATE POLICY "Escrita Autenticada Skills" ON skills FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 2. Projects (Projetos)
DROP POLICY IF EXISTS "Escrita Autenticada Projects" ON projects;
CREATE POLICY "Escrita Autenticada Projects" ON projects FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 3. About (Sobre)
DROP POLICY IF EXISTS "Escrita Autenticada About" ON about;
CREATE POLICY "Escrita Autenticada About" ON about FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 4. Experiences (Trajetória)
DROP POLICY IF EXISTS "Escrita Autenticada Experiences" ON experiences;
CREATE POLICY "Escrita Autenticada Experiences" ON experiences FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 5. Certifications (Certificações)
DROP POLICY IF EXISTS "Escrita Autenticada Certifications" ON certifications;
CREATE POLICY "Escrita Autenticada Certifications" ON certifications FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- --- ✅ FEITO! Agora o Painel conseguirá Atualizar, Inserir e Deletar logs.
