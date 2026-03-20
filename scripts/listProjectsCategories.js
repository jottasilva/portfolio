const { Client, Databases } = require('node-appwrite');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);

async function check() {
    try {
        const response = await databases.listDocuments('main', 'projects');
        console.log(`--- 🗂️ Primeiro Projeto Completo ---`);
        if (response.documents.length > 0) {
            console.log(JSON.stringify(response.documents[0], null, 2));
        } else {
            console.log('Nenhum projeto encontrado.');
        }
    } catch (e) {
        console.log('Erro:', e.message);
    }
}

check();
