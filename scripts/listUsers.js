const { Client, Users } = require('node-appwrite');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const users = new Users(client);

async function listUsers() {
    console.log('--- 👥 Listando Usuários no Appwrite ---');
    try {
        const response = await users.list();
        if (response.users.length === 0) {
            console.log('Nenhum usuário encontrado.');
        } else {
            response.users.forEach(u => {
                console.log(`- Nome: ${u.name || 'Sem Nome'}`);
                console.log(`  E-mail: ${u.email}`);
                console.log(`  ID: ${u.$id}`);
                console.log(`  Status: ${u.status ? 'Ativo' : 'Inativo'}`);
                console.log('-------------------');
            });
        }
    } catch (e) {
        console.log('❌ Erro ao listar usuários:', e.message);
    }
}

listUsers();
