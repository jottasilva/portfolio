const { Client, Databases } = require('node-appwrite');
const dotenv = require('dotenv');
const path = require('path');

// Carregar variáveis de ambiente
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);
const DATABASE_ID = 'main';

async function setup() {
    console.log('--- 🚀 Iniciando Setup Appwrite ---');
    console.log(`Endpoint: ${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}`);
    console.log(`Projeto: ${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`);

    // 1. Criar Banco de dados 'main'
    try {
        await databases.create(DATABASE_ID, 'Main Database');
        console.log('✅ Banco de dados "main" criado!');
    } catch (error) {
        if (error.code === 409) {
            console.log('ℹ️ Banco de dados "main" já existe. Continuando...');
        } else {
            console.error('❌ Erro ao criar banco de dados:', error);
            process.exit(1);
        }
    }

    // 2. Criar Coleção 'contacts'
    const COLLECTION_CONTACTS = 'contacts';
    try {
        await databases.createCollection(DATABASE_ID, COLLECTION_CONTACTS, 'Mensagens de Contato');
        console.log('✅ Coleção "contacts" criada!');

        // Atributos para Contacts
        console.log('Criando atributos para contacts...');
        await databases.createStringAttribute(DATABASE_ID, COLLECTION_CONTACTS, 'name', 150, true);
        await databases.createStringAttribute(DATABASE_ID, COLLECTION_CONTACTS, 'email', 200, true);
        await databases.createStringAttribute(DATABASE_ID, COLLECTION_CONTACTS, 'message', 1000, true);
        await databases.createStringAttribute(DATABASE_ID, COLLECTION_CONTACTS, 'projectType', 150, false);
        await databases.createStringAttribute(DATABASE_ID, COLLECTION_CONTACTS, 'submittedAt', 100, true);
        console.log('✅ Atributos de "contacts" criados!');
    } catch (error) {
        if (error.code === 409) {
            console.log('ℹ️ Coleção "contacts" já existe.');
        } else {
            console.error('❌ Erro na coleção contacts:', error);
        }
    }

    // 3. Criar Coleção 'projects'
    const COLLECTION_PROJECTS = 'projects';
    try {
        await databases.createCollection(DATABASE_ID, COLLECTION_PROJECTS, 'Projetos de Portfólio');
        console.log('✅ Coleção "projects" criada!');

        console.log('Criando atributos para projects...');
        await databases.createStringAttribute(DATABASE_ID, COLLECTION_PROJECTS, 'title', 200, true);
        await databases.createStringAttribute(DATABASE_ID, COLLECTION_PROJECTS, 'description', 1000, true);
        await databases.createStringAttribute(DATABASE_ID, COLLECTION_PROJECTS, 'image', 500, false);
        await databases.createStringAttribute(DATABASE_ID, COLLECTION_PROJECTS, 'link', 500, false);
        await databases.createStringAttribute(DATABASE_ID, COLLECTION_PROJECTS, 'github', 500, false);
        console.log('✅ Atributos de "projects" criados!');
    } catch (error) {
        if (error.code === 409) {
            console.log('ℹ️ Coleção "projects" já existe.');
        } else {
            console.error('❌ Erro na coleção projects:', error);
        }
    }

    // 4. Criar Coleção 'skills'
    const COLLECTION_SKILLS = 'skills';
    try {
        await databases.createCollection(DATABASE_ID, COLLECTION_SKILLS, 'Habilidades');
        console.log('✅ Coleção "skills" criada!');

        console.log('Criando atributos para skills...');
        await databases.createStringAttribute(DATABASE_ID, COLLECTION_SKILLS, 'name', 150, true);
        await databases.createStringAttribute(DATABASE_ID, COLLECTION_SKILLS, 'category', 100, true);
        await databases.createStringAttribute(DATABASE_ID, COLLECTION_SKILLS, 'value', 10, true);
        console.log('✅ Atributos de "skills" criados!');
    } catch (error) {
        if (error.code === 409) {
            console.log('ℹ️ Coleção "skills" já existe.');
        } else {
            console.error('❌ Erro na coleção skills:', error);
        }
    }

    console.log('\n--- 🎉 Setup Appwrite finalizado com sucesso! ---');
}

setup();
