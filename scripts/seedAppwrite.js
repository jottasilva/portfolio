const { Client, Databases, Users, ID } = require('node-appwrite');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);
const users = new Users(client);

const DATABASE_ID = 'main';

async function seed() {
    console.log('--- 🚀 Iniciando Injeção de Dados (Seed) ---');

    // 1. Criar Usuário Administrador "Jefferson"
    try {
        console.log('Criando usuário Jefferson...');
        await users.create(
            ID.unique(),
            'jefferson@admin.com',
            undefined, // phone
            'jefferson123', // password
            'Jefferson S. Paulino'
        );
        console.log('✅ Usuário "jefferson@admin.com" criado com sucesso!');
        console.log('🔑 Senha Padrão: jefferson123');
    } catch (error) {
        if (error.code === 409) {
            console.log('ℹ️ Usuário já cadastrado ou e-mail já existe.');
        } else {
            console.error('❌ Erro ao criar usuário:', error);
        }
    }

    // 2. Injetar Projetos
    const projects = [
        {
            title: 'Gerenc-AI (ZapPDV)',
            description: 'Automação inteligente para WhatsApp que funciona como um PDV completo. Gerenciamento de pedidos, estoque e relatórios direto no chat.',
            image: '/projects/gerencia.png',
            link: 'https://gerencia.ogerente.site/',
            github: ''
        },
        {
            title: 'Finzap',
            description: 'Plataforma de gestão financeira minimalista para controle de receitas e despesas, ideal para substituir planilhas com eficiência.',
            image: '/projects/finzap.png',
            link: 'https://finzap-one.vercel.app/',
            github: ''
        },
        {
            title: 'CaseLab',
            description: 'Plataforma SaaS dedicada à personalização de capinhas de celular, oferecendo editor intuitivo para B2B e B2C.',
            image: '/projects/caselab.png',
            link: 'https://caselabb.vercel.app/',
            github: ''
        },
        {
            title: 'E-COMMERCE MAÇONARIA',
            description: 'Venda de artigos especializados com painel admin e integração com pagamentos.',
            image: 'https://i.imgur.com/PSdflS7.png',
            link: 'https://ecomerce-rho-lyart.vercel.app/',
            github: ''
        },
        {
            title: 'INFOZAP MICRO-SAAS',
            description: 'Informações locais via Whatsapp com dados urbanos automatizados.',
            image: 'https://i.imgur.com/Nda9Gyk.png',
            link: 'https://infozap.vercel.app/',
            github: ''
        },
        {
            title: 'EASY CONTRATO',
            description: 'Gerador de documentos pré-definidos com customização e exportação PDF.',
            image: 'https://i.imgur.com/i2piaWe.png',
            link: 'https://easycontrato.vercel.app/',
            github: ''
        }
    ];

    try {
        console.log('\nAlimentando Coleção "projects"...');
        for (const proj of projects) {
            await databases.createDocument(DATABASE_ID, 'projects', ID.unique(), proj);
            console.log(`✅ Projeto Injetado: ${proj.title}`);
        }
    } catch (error) {
        console.error('❌ Erro ao popular projects:', error);
    }

    // 3. Injetar Skills
    const skills = [
        { name: 'Node.js / Go', category: 'Backend & APIs', value: '95%' },
        { name: 'Python / Laravel', category: 'Backend & APIs', value: '90%' },
        { name: 'JWT / OAuth2', category: 'Backend & APIs', value: '95%' },
        
        { name: 'Next.js / React', category: 'Frontend & UX', value: '98%' },
        { name: 'Vue.js / TypeScript', category: 'Frontend & UX', value: '94%' },
        { name: 'GraphQL / WebSockets', category: 'Frontend & UX', value: '90%' },

        { name: 'n8n Workflow', category: 'IA & Automação', value: '98%' },
        { name: 'OpenAI API / Agentic', category: 'IA & Automação', value: '95%' },
        { name: 'Prompt Engineering', category: 'IA & Automação', value: '92%' },

        { name: 'Flutter / React Native', category: 'Mobile & Cloud', value: '90%' },
        { name: 'Docker / CI/CD', category: 'Mobile & Cloud', value: '92%' },
        { name: 'PostgreSQL / NoSQL', category: 'Mobile & Cloud', value: '94%' }
    ];

    try {
        console.log('\nAlimentando Coleção "skills"...');
        for (const sk of skills) {
            await databases.createDocument(DATABASE_ID, 'skills', ID.unique(), sk);
            console.log(`✅ Skill Injetada: ${sk.name}`);
        }
    } catch (error) {
        console.error('❌ Erro ao popular skills:', error);
    }

    console.log('\n--- 🎉 População de dados finalizada! ---');
}

seed();
