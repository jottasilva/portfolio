-- ==========================================
-- SUPABASE DATA RECOVERY
-- Cole e execute este script no SQL Editor do Supabase Studio
-- ==========================================

-- --- Dados de contacts ---
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS message TEXT;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS project_type TEXT;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS submitted_at TEXT;

INSERT INTO contacts (name, email, message, project_type, submitted_at) VALUES ('dwqdqdq', 'jefferson_jsp@hotmail.com', 'dwqdq', 'Geral', '2026-03-20T18:17:33.576Z');
INSERT INTO contacts (name, email, message, project_type, submitted_at) VALUES ('dwqdq', 'jefferson_jsp@hotmail.com', 'wqdq', 'Geral', '2026-03-20T18:17:40.098Z');

-- --- Dados de projects ---
ALTER TABLE projects ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS link TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS github TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS node TEXT;

INSERT INTO projects (title, description, image_url, link, github, category, node) VALUES ('Gerenc-AI (ZapPDV)', 'Automação inteligente para WhatsApp que funciona como um PDV completo. Gerenciamento de pedidos, estoque e relatórios direto no chat.', NULL, 'https://gerencia.ogerente.site/', '', 'IA', 'Automação');
INSERT INTO projects (title, description, image_url, link, github, category, node) VALUES ('Finzap', 'Plataforma de gestão financeira minimalista para controle de receitas e despesas, ideal para substituir planilhas com eficiência.', NULL, 'https://finzap-one.vercel.app/', '', 'Sistemas', 'Finanças');
INSERT INTO projects (title, description, image_url, link, github, category, node) VALUES ('CaseLab', 'Plataforma SaaS dedicada à personalização de capinhas de celular, oferecendo editor intuitivo para B2B e B2C.', NULL, 'https://caselabb.vercel.app/', '', 'Sistemas', 'Finanças');
INSERT INTO projects (title, description, image_url, link, github, category, node) VALUES ('E-COMMERCE MAÇONARIA', 'Venda de artigos especializados com painel admin e integração com pagamentos.', NULL, 'https://ecomerce-rho-lyart.vercel.app/', '', 'Sistemas', 'SaaS');
INSERT INTO projects (title, description, image_url, link, github, category, node) VALUES ('INFOZAP MICRO-SAAS', 'Informações locais via Whatsapp com dados urbanos automatizados.', NULL, 'https://infozap.vercel.app/', '', 'IA', 'Automação');
INSERT INTO projects (title, description, image_url, link, github, category, node) VALUES ('EASY CONTRATO', 'Gerador de documentos pré-definidos com customização e exportação PDF.', NULL, 'https://easycontrato.vercel.app/', '', 'Sistemas', 'SaaS');

-- --- Dados de skills ---
ALTER TABLE skills ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE skills ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE skills ADD COLUMN IF NOT EXISTS value TEXT;

INSERT INTO skills (name, category, value) VALUES ('Node.js / Go', 'Backend & APIs', 98);
INSERT INTO skills (name, category, value) VALUES ('Python / Laravel', 'Backend & APIs', 90);
INSERT INTO skills (name, category, value) VALUES ('JWT / OAuth2', 'Backend & APIs', 95);
INSERT INTO skills (name, category, value) VALUES ('Next.js / React', 'Frontend & UX', 98);
INSERT INTO skills (name, category, value) VALUES ('Vue.js / TypeScript', 'Frontend & UX', 94);
INSERT INTO skills (name, category, value) VALUES ('GraphQL / WebSockets', 'Frontend & UX', 90);
INSERT INTO skills (name, category, value) VALUES ('n8n Workflow', 'IA & Automação', 98);
INSERT INTO skills (name, category, value) VALUES ('OpenAI API / Agentic', 'IA & Automação', 95);
INSERT INTO skills (name, category, value) VALUES ('Prompt Engineering', 'IA & Automação', 92);
INSERT INTO skills (name, category, value) VALUES ('Flutter / React Native', 'Mobile & Cloud', 90);
INSERT INTO skills (name, category, value) VALUES ('Docker / CI/CD', 'Mobile & Cloud', 92);
INSERT INTO skills (name, category, value) VALUES ('PostgreSQL / NoSQL', 'Mobile & Cloud', 94);

-- --- Dados de certifications ---
ALTER TABLE certifications ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE certifications ADD COLUMN IF NOT EXISTS issuer TEXT;
ALTER TABLE certifications ADD COLUMN IF NOT EXISTS date TEXT;
ALTER TABLE certifications ADD COLUMN IF NOT EXISTS link TEXT;
ALTER TABLE certifications ADD COLUMN IF NOT EXISTS category TEXT;

INSERT INTO certifications (title, issuer, date, link, category) VALUES ('React Native (NLW Expert - Trilha)', 'Fábrica / Mock', '2024', NULL, 'Desenvolvimento & Engenharia de Soft.');
INSERT INTO certifications (title, issuer, date, link, category) VALUES ('Go (Golang) Udemy', 'Fábrica / Mock', '2024', NULL, 'Desenvolvimento & Engenharia de Soft.');
INSERT INTO certifications (title, issuer, date, link, category) VALUES ('PHP (Rocketseat)', 'Fábrica / Mock', '2024', NULL, 'Desenvolvimento & Engenharia de Soft.');
INSERT INTO certifications (title, issuer, date, link, category) VALUES ('Angular (Udemy)', 'Fábrica / Mock', '2024', NULL, 'Desenvolvimento & Engenharia de Soft.');
INSERT INTO certifications (title, issuer, date, link, category) VALUES ('TypeScript, Git & GitHub (Refatorando)', 'Fábrica / Mock', '2024', NULL, 'Desenvolvimento & Engenharia de Soft.');
INSERT INTO certifications (title, issuer, date, link, category) VALUES ('HTML5, CSS & JS', 'Fábrica / Mock', '2024', NULL, 'Desenvolvimento & Engenharia de Soft.');
INSERT INTO certifications (title, issuer, date, link, category) VALUES ('Node.js & React', 'Fábrica / Mock', '2024', NULL, 'Desenvolvimento & Engenharia de Soft.');
INSERT INTO certifications (title, issuer, date, link, category) VALUES ('Desenvolvimento Web Completo', 'Fábrica / Mock', '2024', NULL, 'Desenvolvimento & Engenharia de Soft.');
INSERT INTO certifications (title, issuer, date, link, category) VALUES ('Cronapp Responsivo', 'Fábrica / Mock', '2024', NULL, 'Desenvolvimento & Engenharia de Soft.');
INSERT INTO certifications (title, issuer, date, link, category) VALUES ('HTML & CSS Básico', 'Fábrica / Mock', '2024', NULL, 'Desenvolvimento & Engenharia de Soft.');
INSERT INTO certifications (title, issuer, date, link, category) VALUES ('SQL (Motion Academy)', 'Fábrica / Mock', '2024', NULL, 'Dados & Inteligência Artificial');
INSERT INTO certifications (title, issuer, date, link, category) VALUES ('Ciência de Dados', 'Fábrica / Mock', '2024', NULL, 'Dados & Inteligência Artificial');
INSERT INTO certifications (title, issuer, date, link, category) VALUES ('Python Avançado', 'Fábrica / Mock', '2024', NULL, 'Dados & Inteligência Artificial');
INSERT INTO certifications (title, issuer, date, link, category) VALUES ('Trading com Dados Python', 'Fábrica / Mock', '2024', NULL, 'Dados & Inteligência Artificial');
INSERT INTO certifications (title, issuer, date, link, category) VALUES ('Python Enpowerdata', 'Fábrica / Mock', '2024', NULL, 'Dados & Inteligência Artificial');
INSERT INTO certifications (title, issuer, date, link, category) VALUES ('Python Masterclass', 'Fábrica / Mock', '2024', NULL, 'Dados & Inteligência Artificial');
INSERT INTO certifications (title, issuer, date, link, category) VALUES ('Hacker Ético (Udemy)', 'Fábrica / Mock', '2024', NULL, 'Segurança da Informação');
INSERT INTO certifications (title, issuer, date, link, category) VALUES ('Pentest (Solyd / DESEC)', 'Fábrica / Mock', '2024', NULL, 'Segurança da Informação');
INSERT INTO certifications (title, issuer, date, link, category) VALUES ('Ameaça Hacker Cybersec', 'Fábrica / Mock', '2024', NULL, 'Segurança da Informação');
INSERT INTO certifications (title, issuer, date, link, category) VALUES ('LGPD (Sebrae)', 'Fábrica / Mock', '2024', NULL, 'Segurança da Informação');
INSERT INTO certifications (title, issuer, date, link, category) VALUES ('Analista de Redes', 'Fábrica / Mock', '2024', NULL, 'Segurança da Informação');
INSERT INTO certifications (title, issuer, date, link, category) VALUES ('Intelbras CFTV', 'Fábrica / Mock', '2024', NULL, 'Segurança da Informação');
INSERT INTO certifications (title, issuer, date, link, category) VALUES ('Design Gráfico', 'Fábrica / Mock', '2024', NULL, 'Design, Marketing & Outros');
INSERT INTO certifications (title, issuer, date, link, category) VALUES ('Identidade Visual', 'Fábrica / Mock', '2024', NULL, 'Design, Marketing & Outros');
INSERT INTO certifications (title, issuer, date, link, category) VALUES ('Flyer Creator', 'Fábrica / Mock', '2024', NULL, 'Design, Marketing & Outros');

-- --- Dados de about ---
ALTER TABLE about ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE about ADD COLUMN IF NOT EXISTS subtitle TEXT;
ALTER TABLE about ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE about ADD COLUMN IF NOT EXISTS resume_url TEXT;
ALTER TABLE about ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE about ADD COLUMN IF NOT EXISTS role TEXT;
ALTER TABLE about ADD COLUMN IF NOT EXISTS image_url TEXT;

INSERT INTO about (title, subtitle, bio, resume_url, name, role, image_url) VALUES ('Arquitetando Sistemas', 'Escaláveis e Inteligência com IA.', 'Mais de 9 anos de experiência no desenvolvimento de aplicações web, mobile e sistemas de automação escaláveis. Especializado em arquitetura de APIs de alta performance e plataformas SaaS multi-tenant.
Foco em eliminar processos manuais e automatização inteligente com IA (LLMs, OpenAI, n8n), reduzindo custos operacionais e entregando sistemas robustos para empresas de múltiplos setores.', '', 'JEFERSON S. PAULINO', 'Sênior Full Stack & IA', NULL);

-- --- Dados de experiences ---
ALTER TABLE experiences ADD COLUMN IF NOT EXISTS type TEXT;
ALTER TABLE experiences ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE experiences ADD COLUMN IF NOT EXISTS institution TEXT;
ALTER TABLE experiences ADD COLUMN IF NOT EXISTS period TEXT;
ALTER TABLE experiences ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE experiences ADD COLUMN IF NOT EXISTS activities TEXT;

INSERT INTO experiences (type, title, institution, period, description, activities) VALUES ('Trabalho', 'JRSN DEV', 'Fundador & Software Engineer', '2006 – Presente', '', 'Entregou aplicações web/mobile para múltiplos setores ao longo de 8+ anos.
Arquitetou APIs REST escaláveis com integrações e webhooks.
Desenvolveu frontends modernos (React, Next) e backends robustos (Node.js, Go).
Modelou infraestrutura completa com Docker, Linux, Nginx e CI/CD.');
INSERT INTO experiences (type, title, institution, period, description, activities) VALUES ('Trabalho', 'Freelancer & Empresas', 'Desenvolvedor FullStack', '01/2012 – Atual', 'Especialização em desenvolvimento completo de soluções digitais.', 'Desenvolvimento de websites, sistemas e aplicativos mobile.
Automação de processos e integração de APIs.
Gerenciamento de projetos e liderança de equipes.
Criação de identidade visual e materiais gráficos.');
INSERT INTO experiences (type, title, institution, period, description, activities) VALUES ('Trabalho', 'Zip Informática', 'Técnico em Manutenção', '11/2015 – 01/2019', 'Especialista em hardware e suporte técnico.', 'Manutenção e reparo de computadores, notebooks e celulares.
Diagnóstico e solução de problemas técnicos.
Atendimento ao cliente e suporte técnico.');
INSERT INTO experiences (type, title, institution, period, description, activities) VALUES ('Trabalho', 'I9 Ingressos', 'Designer Gráfico', '09/2019 – 05/2020', 'Foco na criação visual e desenvolvimento de materiais promocionais.', 'Criação de artes para impressão e itens personalizados.
Desenvolvimento de identidade visual para marcas.
Produção de materiais gráficas diversas.');
INSERT INTO experiences (type, title, institution, period, description, activities) VALUES ('Trabalho', 'Delivery Much', 'Social Media', '10/2020 – 02/2021', 'Responsável pela gestão completa das redes sociais.', 'Criação de materiais gráficos para campanhas promocionais.
Gerenciamento de redes sociais e engajamento do público.
Desenvolvimento de estratégias de marketing digital.');
INSERT INTO experiences (type, title, institution, period, description, activities) VALUES ('Trabalho', 'N9 Agência Digital', 'Fundador & Senior Full Stack Engineer', '2024 – Presente', '', 'Projetou e entregou sistemas de alta performance do backend ao deploy.
Automatizou workflows complexos com n8n e APIs REST/Webhooks.
Desenvolveu agente de IA para atendimento 24/7 via WhatsApp sem intervenção humana.
Reduziu latência de APIs em 94% (800ms para 50ms) com cache Redis.');
INSERT INTO experiences (type, title, institution, period, description, activities) VALUES ('Trabalho', 'Seven Brindes', 'Designer Gráfico & Programador CNC Laser', '01/06/2025 – 01/03/2026', 'Operação de sistemas CNC e corte a laser, design de produtos e brindes corporativos.', 'Desenvolvimento de layouts vetoriais precisos para displays e brindes corporativos.
Operação, configuração e manutenção de maquinário de corte a laser.
Criação de identidades visuais e artes gráficas para materiais promocionais.
Controle de qualidade e acabamento técnico de peças em acrílico, MDF e metais.');
INSERT INTO experiences (type, title, institution, period, description, activities) VALUES ('Acadêmico', 'CENES', 'Especialização em Engenharia de Software', '01/2024 – 01/2025', 'Especialização em Engenharia de Software.', 'Aprofundamento em metodologias de desenvolvimento de software.
Gestão de projetos de software e liderança técnica.
Arquitetura de sistemas distribuídos e boas práticas de engenharia.');
INSERT INTO experiences (type, title, institution, period, description, activities) VALUES ('Acadêmico', 'Centro Universitário ETEP', 'Graduação - Gestão da Tecnologia da Informação', '08/2024 – 12/2024', 'Título de Tecnólogo. Colação de Grau em 06/09/2024. Diploma registrado.', 'Gestão estratégica de TI, análise de riscos e segurança da informação.
Otimização de processos operacionais com tecnologias de ponta.
Governança e auditoria de sistemas de software e infraestrutura.');

-- --- Dados de visits ---
ALTER TABLE visits ALTER COLUMN visitor_id DROP NOT NULL;
ALTER TABLE visits ADD COLUMN IF NOT EXISTS visitor_id TEXT;
ALTER TABLE visits ADD COLUMN IF NOT EXISTS ip TEXT;
ALTER TABLE visits ADD COLUMN IF NOT EXISTS city TEXT;
ALTER TABLE visits ADD COLUMN IF NOT EXISTS country TEXT;
ALTER TABLE visits ADD COLUMN IF NOT EXISTS region TEXT;
ALTER TABLE visits ADD COLUMN IF NOT EXISTS timezone TEXT;
ALTER TABLE visits ADD COLUMN IF NOT EXISTS page TEXT;
ALTER TABLE visits ADD COLUMN IF NOT EXISTS referrer TEXT;
ALTER TABLE visits ADD COLUMN IF NOT EXISTS userAgent TEXT;
ALTER TABLE visits ADD COLUMN IF NOT EXISTS visited_at TEXT;

INSERT INTO visits (visitor_id, ip, city, country, region, timezone, page, referrer, userAgent, visited_at) VALUES ('4353778f-1859-41e0-9e0b-31a0132f1204', '::1', 'Desconhecida', '??', '', '', '/', '', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-20T18:57:02.448Z');
INSERT INTO visits (visitor_id, ip, city, country, region, timezone, page, referrer, userAgent, visited_at) VALUES ('4353778f-1859-41e0-9e0b-31a0132f1204', '::1', 'Desconhecida', '??', '', '', '/painel/login', '', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-20T18:57:13.351Z');
INSERT INTO visits (visitor_id, ip, city, country, region, timezone, page, referrer, userAgent, visited_at) VALUES ('4353778f-1859-41e0-9e0b-31a0132f1204', '::1', 'Desconhecida', '??', '', '', '/painel', '', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-20T19:06:47.097Z');
INSERT INTO visits (visitor_id, ip, city, country, region, timezone, page, referrer, userAgent, visited_at) VALUES ('14deb7a1-149f-4112-a68b-f31cb2083508', '::1', 'Campos Eliseos', 'Brasil', 'São Paulo', 'America/Sao_Paulo', '/', '', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-20T19:44:03.446Z');
INSERT INTO visits (visitor_id, ip, city, country, region, timezone, page, referrer, userAgent, visited_at) VALUES ('14deb7a1-149f-4112-a68b-f31cb2083508', '::1', 'Campos Eliseos', 'Brasil', 'São Paulo', 'America/Sao_Paulo', '/painel', '', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-20T19:52:09.707Z');
INSERT INTO visits (visitor_id, ip, city, country, region, timezone, page, referrer, userAgent, visited_at) VALUES ('14deb7a1-149f-4112-a68b-f31cb2083508', '::1', 'Campos Eliseos', 'Brasil', 'São Paulo', 'America/Sao_Paulo', '/painel/login', '', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-20T19:52:09.866Z');
INSERT INTO visits (visitor_id, ip, city, country, region, timezone, page, referrer, userAgent, visited_at) VALUES ('4353778f-1859-41e0-9e0b-31a0132f1204', '::1', 'Campos Eliseos', 'Brasil', 'São Paulo', 'America/Sao_Paulo', '/', '', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-20T20:36:01.474Z');
INSERT INTO visits (visitor_id, ip, city, country, region, timezone, page, referrer, userAgent, visited_at) VALUES ('4353778f-1859-41e0-9e0b-31a0132f1204', '::1', 'Campos Eliseos', 'Brasil', 'São Paulo', 'America/Sao_Paulo', '/', '', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-20T22:58:23.154Z');
INSERT INTO visits (visitor_id, ip, city, country, region, timezone, page, referrer, userAgent, visited_at) VALUES ('4353778f-1859-41e0-9e0b-31a0132f1204', '::1', 'Campos Eliseos', 'Brasil', 'São Paulo', 'America/Sao_Paulo', '/painel', '', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-20T22:58:27.981Z');
INSERT INTO visits (visitor_id, ip, city, country, region, timezone, page, referrer, userAgent, visited_at) VALUES ('4353778f-1859-41e0-9e0b-31a0132f1204', '::1', 'Campos Eliseos', 'Brasil', 'São Paulo', 'America/Sao_Paulo', '/', '', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-22T22:39:42.854Z');
INSERT INTO visits (visitor_id, ip, city, country, region, timezone, page, referrer, userAgent, visited_at) VALUES ('4353778f-1859-41e0-9e0b-31a0132f1204', '::1', 'Campos Eliseos', 'Brasil', 'São Paulo', 'America/Sao_Paulo', '/painel', '', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-22T22:39:43.129Z');
INSERT INTO visits (visitor_id, ip, city, country, region, timezone, page, referrer, userAgent, visited_at) VALUES ('test-visitor', '127.0.0.1', 'TestCity', 'TestCountry', 'TestRegion', 'TestTimezone', '/test', 'test-referrer', 'test-agent', '2026-03-22T22:52:25.385Z');
INSERT INTO visits (visitor_id, ip, city, country, region, timezone, page, referrer, userAgent, visited_at) VALUES ('4353778f-1859-41e0-9e0b-31a0132f1204', '::1', 'Campos Eliseos', 'Brasil', 'São Paulo', 'America/Sao_Paulo', '/', '', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-23T11:32:35.614Z');
INSERT INTO visits (visitor_id, ip, city, country, region, timezone, page, referrer, userAgent, visited_at) VALUES ('4353778f-1859-41e0-9e0b-31a0132f1204', '::1', 'Campos Eliseos', 'Brasil', 'São Paulo', 'America/Sao_Paulo', '/painel', '', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-23T11:33:05.671Z');
INSERT INTO visits (visitor_id, ip, city, country, region, timezone, page, referrer, userAgent, visited_at) VALUES ('4353778f-1859-41e0-9e0b-31a0132f1204', '::1', 'Campos Eliseos', 'Brasil', 'São Paulo', 'America/Sao_Paulo', '/test', '', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-23T11:33:26.239Z');
INSERT INTO visits (visitor_id, ip, city, country, region, timezone, page, referrer, userAgent, visited_at) VALUES ('4353778f-1859-41e0-9e0b-31a0132f1204', '::1', 'Campos Eliseos', 'Brasil', 'São Paulo', 'America/Sao_Paulo', '/painel/login', '', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-23T11:34:18.250Z');
INSERT INTO visits (visitor_id, ip, city, country, region, timezone, page, referrer, userAgent, visited_at) VALUES ('4353778f-1859-41e0-9e0b-31a0132f1204', '::1', 'Campos Eliseos', 'Brasil', 'São Paulo', 'America/Sao_Paulo', '/', '', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-23T11:38:06.994Z');
INSERT INTO visits (visitor_id, ip, city, country, region, timezone, page, referrer, userAgent, visited_at) VALUES ('test-visitor', '127.0.0.1', 'TestCity', 'TestCountry', 'TestRegion', 'TestTimezone', '/test', 'test-referrer', 'test-agent', '2026-03-23T11:40:43.190Z');
INSERT INTO visits (visitor_id, ip, city, country, region, timezone, page, referrer, userAgent, visited_at) VALUES ('4353778f-1859-41e0-9e0b-31a0132f1204', '::1', 'Campos Eliseos', 'Brasil', 'São Paulo', 'America/Sao_Paulo', '/', '', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-23T11:41:51.563Z');
INSERT INTO visits (visitor_id, ip, city, country, region, timezone, page, referrer, userAgent, visited_at) VALUES ('4353778f-1859-41e0-9e0b-31a0132f1204', '::1', 'Campos Eliseos', 'Brasil', 'São Paulo', 'America/Sao_Paulo', '/painel', '', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-23T11:41:56.179Z');
INSERT INTO visits (visitor_id, ip, city, country, region, timezone, page, referrer, userAgent, visited_at) VALUES ('4353778f-1859-41e0-9e0b-31a0132f1204', '::1', 'Campos Eliseos', 'Brasil', 'São Paulo', 'America/Sao_Paulo', '/painel/login', '', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-23T11:42:00.674Z');
INSERT INTO visits (visitor_id, ip, city, country, region, timezone, page, referrer, userAgent, visited_at) VALUES ('4353778f-1859-41e0-9e0b-31a0132f1204', '::1', 'São Paulo', 'BR', 'SP', 'America/Sao_Paulo', '/painel', '', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-23T12:24:52.442Z');
INSERT INTO visits (visitor_id, ip, city, country, region, timezone, page, referrer, userAgent, visited_at) VALUES ('4353778f-1859-41e0-9e0b-31a0132f1204', '::1', 'São Paulo', 'BR', 'SP', 'America/Sao_Paulo', '/', '', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-23T12:24:59.651Z');
INSERT INTO visits (visitor_id, ip, city, country, region, timezone, page, referrer, userAgent, visited_at) VALUES ('4353778f-1859-41e0-9e0b-31a0132f1204', '::1', 'São Paulo', 'BR', 'SP', 'America/Sao_Paulo', '/', '', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-23T12:36:32.136Z');
INSERT INTO visits (visitor_id, ip, city, country, region, timezone, page, referrer, userAgent, visited_at) VALUES ('4353778f-1859-41e0-9e0b-31a0132f1204', '::1', 'São Paulo', 'BR', 'SP', 'America/Sao_Paulo', '/painel/login', '', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-23T12:36:43.416Z');
