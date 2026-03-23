-- ==========================================
-- CORREÇÃO DA TABELA VISITS (SUPABASE)
-- Execute este script no SQL Editor do Supabase Studio para liberar todos os campos de rastreio!
-- ==========================================

ALTER TABLE visits ADD COLUMN IF NOT EXISTS ip TEXT;
ALTER TABLE visits ADD COLUMN IF NOT EXISTS region TEXT;
ALTER TABLE visits ADD COLUMN IF NOT EXISTS country TEXT;
ALTER TABLE visits ADD COLUMN IF NOT EXISTS org TEXT;
ALTER TABLE visits ADD COLUMN IF NOT EXISTS pathname TEXT;
ALTER TABLE visits ADD COLUMN IF NOT EXISTS referer TEXT;
ALTER TABLE visits ADD COLUMN IF NOT EXISTS user_agent TEXT;

-- Garantir políticas de leitura pública para o Dashboard (Opcional)
-- ALTER TABLE visits ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Acesso público de leitura" ON visits FOR SELECT USING (true);
