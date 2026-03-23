-- ==========================================
-- CORREÇÃO DE POLÍTICAS DE ACESSO (RLS - SUPABASE)
-- Se os seus dados sumiram da tela, o Supabase bloqueou as consultas por falta de políticas públicas!
-- Execute este script no SQL Editor do Supabase Studio para liberar a LEITURA.
-- ==========================================

-- OPÇÃO 1: CRIAR POLÍTICAS DE LEITURA PÚBLICA (RECOMENDADO)
-- Isenta o bloqueio apenas para visualização de dados

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


-- OPÇÃO 2: DESABILITAR RLS COMPLETAMENTE (SE PREFERIR DESATIVAR)
-- ALTER TABLE about DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE projects DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE skills DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE experiences DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE certifications DISABLE ROW LEVEL SECURITY;
