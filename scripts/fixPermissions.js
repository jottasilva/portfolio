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

async function updatePermissions() {
    console.log('--- 🛡️  Iniciando Ajuste de Permissões ---');

    try {
        // 1. Coleção 'projects'
        // Público: Ler | Admin/Users: Tudo
        console.log('Ajustando permissões de "projects"...');
        await databases.updateCollection(
            DATABASE_ID, 
            'projects', 
            'Projetos de Portfólio', 
            [
                Permission.read(Role.any()),
                Permission.create(Role.users()),
                Permission.update(Role.users()),
                Permission.delete(Role.users()),
            ]
        );
        console.log('✅ Permissões de "projects" atualizadas!');

        // 2. Coleção 'skills'
        // Público: Ler | Admin/Users: Tudo
        console.log('Ajustando permissões de "skills"...');
        await databases.updateCollection(
            DATABASE_ID, 
            'skills', 
            'Habilidades', 
            [
                Permission.read(Role.any()),
                Permission.create(Role.users()),
                Permission.update(Role.users()),
                Permission.delete(Role.users()),
            ]
        );
        console.log('✅ Permissões de "skills" atualizadas!');

        // 3. Coleção 'contacts'
        // Público: CRIAR (enviar formulário) | Admin/Users: Ler/Deletar
        console.log('Ajustando permissões de "contacts"...');
        await databases.updateCollection(
            DATABASE_ID, 
            'contacts', 
            'Mensagens de Contato', 
            [
                Permission.create(Role.any()), // Permitir qualquer visitante enviar contato
                Permission.read(Role.users()), // Apenas admins podem ler as mensagens
                Permission.update(Role.users()),
                Permission.delete(Role.users()),
            ]
        );
        console.log('✅ Permissões de "contacts" atualizadas!');

        console.log('\n--- 🎉 Ajuste de Permissões finalizado com sucesso! ---');

    } catch (error) {
        console.error('❌ Erro ao atualizar permissões:', error);
    }
}

updatePermissions();
