const { Client, Databases } = require('node-appwrite');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);

async function patch() {
    console.log('--- 🛠️  Corrigindo Categorias de Projetos ---');
    try {
        const response = await databases.listDocuments('main', 'projects');
        
        for (const doc of response.documents) {
            let cat = 'Sistemas';
            let node = 'SaaS';

            if (doc.title.toLowerCase().includes('gerenc-ai') || doc.title.toLowerCase().includes('infozap') || doc.title.toLowerCase().includes('automação')) {
                cat = 'IA';
                node = 'Automação';
            } else if (doc.title.toLowerCase().includes('finzap') || doc.title.toLowerCase().includes('financeiro') || doc.title.toLowerCase().includes('caselab')) {
                cat = 'Sistemas';
                node = 'Finanças';
            }

            console.log(`Atualizando: ${doc.title} -> ${cat} / ${node}`);
            await databases.updateDocument('main', 'projects', doc.$id, {
                category: cat,
                node: node
            });
        }
        
        console.log('\n✅ Categorias atualizadas!');
    } catch (e) {
        console.error('❌ Erro:', e.message);
    }
}

patch();
