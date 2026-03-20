const { Client, Databases } = require('node-appwrite');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);
const DATABASE_ID = 'main';

async function initAbout() {
    console.log('--- 📝 Inicializando Documento "current" em "about" ---');

    const defaultData = {
        title: 'Arquitetando Sistemas',
        subtitle: 'Escaláveis e Inteligência com IA.',
        bio: 'Mais de 8 anos de experiência no desenvolvimento de aplicações web, mobile e sistemas de automação escaláveis. Especializado em arquitetura de APIs de alta performance e plataformas SaaS multi-tenant.\nFoco em eliminar processos manuais e automatização inteligente com IA (LLMs, OpenAI, n8n), reduzindo custos operacionais e entregando sistemas robustos para empresas de múltiplos setores.'
    };

    try {
        console.log('Verificando se "current" já existe...');
        await databases.getDocument(DATABASE_ID, 'about', 'current');
        console.log('✅ Documento "current" já existe.');
    } catch (error) {
        if (error.code === 404) {
            console.log('Criando documento "current" com dados padrão...');
            await databases.createDocument(DATABASE_ID, 'about', 'current', defaultData);
            console.log('✅ Documento "current" criado com sucesso!');
        } else {
            console.error('❌ Erro inesperado:', error.message);
        }
    }
}

initAbout();
