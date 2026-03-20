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

async function fixDocumentPermissions() {
    console.log('--- 🛡️  Iniciando Ajuste de Permissões de Documentos ---');

    const collections = ['projects', 'skills', 'about'];

    for (const col of collections) {
        try {
            console.log(`Buscando documentos da coleção "${col}"...`);
            const response = await databases.listDocuments(DATABASE_ID, col);
            console.log(`Encontrados ${response.documents.length} documentos.`);

            for (const doc of response.documents) {
                console.log(`Atualizando permissões do documento: ${doc.title || doc.name || doc.$id}`);
                await databases.updateDocument(
                    DATABASE_ID,
                    col,
                    doc.$id,
                    undefined, // Não alterar dados
                    [
                        Permission.read(Role.any()), // Permitir leitura pública
                        Permission.update(Role.users()),
                        Permission.delete(Role.users())
                    ]
                );
            }
            console.log(`✅ Coleção "${col}" atualizada!`);
        } catch (error) {
            console.error(`❌ Erro ao atualizar documentos de "${col}":`, error.message);
        }
    }
    console.log('\n--- 🎉 Ajuste de Permissões de Documentos finalizado! ---');
}

fixDocumentPermissions();
