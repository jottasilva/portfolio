-- ==========================================
-- 🚀 SETUP MESTRE DEFINITIVO - SUPABASE
-- Este script faz TUDO: Cria Tabelas, Corrige Colunas, Configura Segurança (RLS) e Insere os Dados.
-- Cole e execute este script no SQL Editor do Supabase Studio.
-- ==========================================

-- ------------------------------------------
-- 🛠️ 1. CRIAÇÃO DE TABELAS (Caso não existam)
-- ------------------------------------------

CREATE TABLE IF NOT EXISTS about (
    id TEXT PRIMARY KEY DEFAULT 'current',
    title TEXT,
    subtitle TEXT,
    bio TEXT,
    resume_url TEXT,
    role TEXT,
    name TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

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

CREATE TABLE IF NOT EXISTS skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    value INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS experiences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    institution TEXT NOT NULL,
    period TEXT NOT NULL,
    description TEXT,
    activities TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS certifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    issuer TEXT NOT NULL,
    date TEXT NOT NULL,
    link TEXT,
    category TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT,
    email TEXT,
    message TEXT,
    project_type TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS visits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    visitor_id TEXT,
    ip TEXT,
    city TEXT,
    country TEXT,
    region TEXT,
    pathname TEXT,
    referer TEXT,
    user_agent TEXT,
    visited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ------------------------------------------
-- 🔒 2. SEGURANÇA E RLS (Políticas de Acesso)
-- ------------------------------------------

ALTER TABLE about ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE visits ENABLE ROW LEVEL SECURITY;

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

DROP POLICY IF EXISTS "Escrita Pública Visitas" ON visits;
CREATE POLICY "Escrita Pública Visitas" ON visits FOR INSERT WITH CHECK (true);

-- ------------------------------------------
-- 💾 3. CARGA DE DADOS (Garante que não falte nada)
-- ------------------------------------------

-- Limpar dados anteriores para evitar duplicações caso rode mais de uma vez
TRUNCATE TABLE about RESTART IDENTITY;
TRUNCATE TABLE projects RESTART IDENTITY CASCADE;
TRUNCATE TABLE skills RESTART IDENTITY CASCADE;
TRUNCATE TABLE experiences RESTART IDENTITY CASCADE;
TRUNCATE TABLE certifications RESTART IDENTITY CASCADE;

-- --- Dados de about ---
INSERT INTO about (id, title, subtitle, bio, resume_url, name, role, image_url) VALUES 
('current', 'Arquitetando Sistemas', 'Escaláveis e Inteligência com IA.', 'Mais de 8 anos de experiência no desenvolvimento de aplicações web, mobile e sistemas de automação escaláveis. Especializado em arquitetura de APIs de alta performance e plataformas SaaS multi-tenant. Foco em eliminar processos manuais e automatização inteligente com IA (LLMs, OpenAI, n8n), reduzindo custos operacionais.', '', 'JEFERSON S. PAULINO', 'Sênior Full Stack & IA', '/img-profile.png');

-- --- Dados de projects ---
INSERT INTO projects (title, description, image_url, link, github, category, node) VALUES 
('Gerenc-AI (ZapPDV)', 'Automação inteligente para WhatsApp que funciona como um PDV completo. Gerenciamento de pedidos, estoque e relatórios.', NULL, 'https://gerencia.ogerente.site/', '', 'IA', 'Automação'),
('Finzap', 'Plataforma de gestão financeira minimalista para controle de receitas e despesas, ideal para substituir planilhas.', NULL, 'https://finzap-one.vercel.app/', '', 'Sistemas', 'Finanças'),
('CaseLab', 'Plataforma SaaS dedicada à personalização de capinhas de celular para B2B e B2C.', NULL, 'https://caselabb.vercel.app/', '', 'Sistemas', 'Lojas'),
('E-COMMERCE MAÇONARIA', 'Venda de artigos especializados com painel admin e integração com pagamentos.', NULL, 'https://ecomerce-rho-lyart.vercel.app/', '', 'Sistemas', 'SaaS'),
('INFOZAP MICRO-SAAS', 'Informações locais via Whatsapp com dados urbanos automatizados.', NULL, 'https://infozap.vercel.app/', '', 'IA', 'Automação'),
('EASY CONTRATO', 'Gerador de documentos pré-definidos com customização e exportação PDF.', NULL, 'https://easycontrato.vercel.app/', '', 'Sistemas', 'SaaS');

-- --- Dados de skills ---
INSERT INTO skills (name, category, value) VALUES 
('Node.js / Go', 'Backend & APIs', 98),
('Python / Laravel', 'Backend & APIs', 90),
('Next.js / React', 'Frontend & UX', 98),
('Vue.js / TypeScript', 'Frontend & UX', 94),
('n8n Workflow', 'IA & Automação', 98),
('OpenAI API / Agentic', 'IA & Automação', 95),
('Docker / CI/CD', 'Infra & Cloud', 92),
('PostgreSQL / NoSQL', 'Infra & Cloud', 94);

-- --- Dados de certifications ---
INSERT INTO certifications (title, issuer, date, link, category) VALUES 
('React Native (NLW Expert)', 'Rocketseat', '2024', NULL, 'Desenvolvimento'),
('Go (Golang) Expert', 'Udemy', '2024', NULL, 'Desenvolvimento'),
('PHP Advanced', 'Rocketseat', '2024', NULL, 'Desenvolvimento'),
('SQL & Banco de Dados', 'Motion Academy', '2024', NULL, 'Dados & IA'),
('Python Avançado', 'Udemy', '2024', NULL, 'Dados & IA'),
('Hacker Ético', 'Udemy', '2024', NULL, 'Segurança'),
('Pentest Avançado', 'Solyd', '2024', NULL, 'Segurança');

-- --- Dados de experiences ---
INSERT INTO experiences (type, title, institution, period, description, activities) VALUES 
('Trabalho', 'JRSN DEV', 'Fundador & Software Engineer', '2006 – Presente', '', 'Entregou aplicações web/mobile para múltiplos setores ao longo de 8+ anos.\nArquitetou APIs REST escaláveis com integrações e webhooks.\nDesenvolveu frontends modernos (React, Next) e backends robustos.'),
('Trabalho', 'N9 Agência Digital', 'Fundador & Senior Full Stack Engineer', '2024 – Presente', '', 'Projetou e entregou sistemas de alta performance do backend ao deploy.\nAutomatizou workflows complexos com n8n e APIs REST/Webhooks.\nDesenvolveu agente de IA para atendimento 24/7 via WhatsApp.'),
('Acadêmico', 'CENES', 'Especialização em Engenharia de Software', '2024 – 2025', '', 'Aprofundamento em metodologias de desenvolvimento de software.\nArquitetura de sistemas distribuídos e boas práticas.');

-- ==========================================
-- ✅ SETUP CONCLUÍDO!
-- ==========================================
