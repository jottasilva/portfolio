const { Client, Storage, Permission, Role, ID } = require('node-appwrite');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const storage = new Storage(client);

async function deployBucket() {
    console.log('--- 📷 Criando Bucket de Imagens no Appwrite ---');

    try {
        console.log('Tentando criar bucket "uploads"...');
        await storage.createBucket(
            'uploads', 
            'Uploads de Imagens', 
            [
                Permission.read(Role.any()), // Leitura pública
                Permission.create(Role.users()), // Escrita para autenticados
                Permission.update(Role.users()),
                Permission.delete(Role.users())
            ],
            undefined, // filePermissions
            true, // Enable bucket
            20000000, // Max 20MB
            ['jpg', 'jpeg', 'png', 'gif', 'webp'] // Extensions
        );
        console.log('✅ Bucket "uploads" criado com sucesso!');
    } catch (error) {
        if (error.code === 409) {
            console.log('ℹ️ Bucket "uploads" já existe.');
        } else {
            console.error('❌ Erro inesperado:', error.message);
        }
    }
}

deployBucket();
