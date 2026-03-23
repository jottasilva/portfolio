-- ==========================================
-- SUPABASE SCHEMA - MIGRAÇÃO PORTFÓLIO
-- Cole e execute este script no SQL Editor do Supabase Studio
-- ==========================================

-- 1. Tabela About
CREATE TABLE IF NOT EXISTS about (
    id TEXT PRIMARY KEY DEFAULT 'current',
    title TEXT,
    subtitle TEXT,
    bio TEXT,
    resume_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tabela Projects
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    link TEXT,
    github TEXT,
    category TEXT,
    node TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Tabela Skills
CREATE TABLE IF NOT EXISTS skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    value INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Tabela Experiences
CREATE TABLE IF NOT EXISTS experiences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type TEXT NOT NULL, -- 'Profissional' ou 'Acadêmico'
    title TEXT NOT NULL,
    institution TEXT NOT NULL,
    period TEXT NOT NULL,
    description TEXT,
    activities TEXT, -- guardado como string separada por \n
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Tabela Certifications
CREATE TABLE IF NOT EXISTS certifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    issuer TEXT NOT NULL,
    date TEXT NOT NULL,
    link TEXT,
    category TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Tabela Contacts
CREATE TABLE IF NOT EXISTS contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    project_type TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Tabela Chat Messages
CREATE TABLE IF NOT EXISTS chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    prompt TEXT NOT NULL,
    response TEXT NOT NULL,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Tabela Visits
CREATE TABLE IF NOT EXISTS visits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    visitor_id TEXT NOT NULL,
    city TEXT,
    visited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- POLÍTICAS DE SEGURANÇA (OPCIONAL/SUGESTÃO)
-- ==========================================
-- Você pode habilitar RLS e dar permissão de Leitura Pública
-- ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Leitura Pública de Projetos" ON projects FOR SELECT USING (true);
