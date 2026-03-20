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

async function addAttributes() {
    console.log('--- 🛠️  Adicionando Atributos em "projects" ---');

    try {
        console.log('Adicionando atributo "category"...');
        await databases.createStringAttribute(DATABASE_ID, 'projects', 'category', 255, false);
        console.log('✅Atributo "category" adicionado!');
    } catch (e) {
        console.log('ℹ️ Erro ao criar "category":', e.message);
    }

    try {
        console.log('Adicionando atributo "node"...');
        await databases.createStringAttribute(DATABASE_ID, 'projects', 'node', 255, false);
        console.log('✅ Atributo "node" adicionado!');
    } catch (e) {
        console.log('ℹ️ Erro ao criar "node":', e.message);
    }

    console.log('\n--- 🎉 Atributos adicionados! ---');
}

addAttributes();
