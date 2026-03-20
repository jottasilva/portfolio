const { Client, Databases, Permission, Role } = require('node-appwrite');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);
const DATABASE_ID = 'main';

async function fix() {
    console.log('--- 🛡️  Ajustando Permissões de Visitas Existentes ---');
    try {
        const response = await databases.listDocuments(DATABASE_ID, 'visits');
        console.log(`Encontradas ${response.documents.length} visitas.`);

        for (const doc of response.documents) {
            console.log(`Atualizando permissões de: ${doc.$id}`);
            await databases.updateDocument(
                DATABASE_ID,
                'visits',
                doc.$id,
                undefined, // Não alterar dados
                [
                    Permission.read(Role.users()), // Permitir leitura para usuários logados
                    Permission.delete(Role.users())
                ]
            );
        }
        console.log('\n✅ Permissões de visitas atualizadas!');
    } catch (error) {
        console.error('❌ Erro:', error.message);
    }
}

fix();
